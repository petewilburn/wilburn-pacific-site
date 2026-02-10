const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
    const connectionString = process.env.ACS_CONNECTION_STRING;
    const senderAddress = process.env.SENDER_ADDRESS;
    
    const { name, email, company, message, isEmergency, emergencyNature, emergencyTimeline } = req.body || {};

    if (!name || !email || !message || !connectionString) {
        context.res = { status: 400, body: "Missing required fields." };
        return;
    }

    try {
        const client = new EmailClient(connectionString);

        // --- EMAIL ROUTING LOGIC ---
        // Normal -> info@
        // Emergency -> emergency@
        const targetRecipient = isEmergency 
            ? "emergency@wilburnpacific.com" 
            : "info@wilburnpacific.com";

        const subjectLine = isEmergency 
            ? `🚨 URGENT: ${emergencyTimeline || 'Breakdown'} - ${company || name}`
            : `New Consultation Request: ${company || 'General'} - ${name}`;

        let emailBody = "";

        if (isEmergency) {
            emailBody = `
========================================
🚨 EMERGENCY DISPATCH REQUEST 🚨
========================================
STATUS:   ${emergencyTimeline?.toUpperCase() || 'URGENT'}
ISSUE:    ${emergencyNature || 'Not Specified'}
CONTACT:  ${name}
PHONE:    ${email}
COMPANY:  ${company}
========================================

Description of Problem:
${message}
            `;
        } else {
            emailBody = `
Name:    ${name}
Company: ${company}
Contact: ${email}

Project / Inquiry Details:
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
                to: [{ address: targetRecipient }],
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