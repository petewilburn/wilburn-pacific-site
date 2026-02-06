const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
    const connectionString = process.env.ACS_CONNECTION_STRING;
    const senderAddress = process.env.SENDER_ADDRESS;
    
    // Deconstruct standard fields + new emergency fields
    const { name, email, company, message, isEmergency, emergencyNature, emergencyTimeline } = req.body || {};

    if (!name || !email || !message || !connectionString) {
        context.res = { status: 400, body: "Missing required fields." };
        return;
    }

    try {
        const client = new EmailClient(connectionString);

        // LOGIC FOR PROTON MAIL FILTERING:
        // 1. If Emergency: Subject starts with "URGENT:" -> Set Proton filter to Star + Alarm
        // 2. If Normal: Subject starts with "New Inquiry:" -> Set Proton filter to Folder "Leads"
        
        const subjectLine = isEmergency 
            ? `URGENT: ${emergencyTimeline || 'Breakdown'} - ${company || name}`
            : `New Inquiry: ${company || 'General'} - ${name}`;

        // Build the email body based on urgency
        let emailBody = "";

        if (isEmergency) {
            emailBody = `
========================================
🚨 EMERGENCY BREAKDOWN ALERT 🚨
========================================
STATUS: ${emergencyTimeline?.toUpperCase() || 'URGENT'}
ISSUE:  ${emergencyNature || 'Not Specified'}
----------------------------------------
CONTACT: ${name}
PHONE:   ${email}  <-- CALL THIS NUMBER
COMPANY: ${company}
----------------------------------------
Additional Notes:
${message}
            `;
        } else {
            emailBody = `
Name:    ${name}
Company: ${company}
Contact: ${email}

Message:
${message}
            `;
        }

        const emailMessage = {
            senderAddress: senderAddress,
            content: {
                subject: subjectLine,
                plainText: emailBody,
            },
            recipients: {
                to: [{ address: "engineering@wilburnpacific.com" }],
            },
            replyTo: [{ address: email }]
        };

        const poller = await client.beginSend(emailMessage);
        await poller.pollUntilDone();

        context.res = { status: 200, body: "Email sent successfully" };

    } catch (error) {
        context.log.error("Email Error:", error);
        context.res = { status: 500, body: "Internal Server Error" };
    }
};