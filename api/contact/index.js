const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
    // 1. Debug Log (Visible in Azure Portal "Monitor")
    context.log("Contact Function Triggered!");

    const connectionString = process.env.ACS_CONNECTION_STRING;
    const senderAddress = process.env.SENDER_ADDRESS;

    // 2. Validate Env Vars
    if (!connectionString || !senderAddress) {
        context.log.error("CRITICAL: Missing Environment Variables");
        context.res = { status: 500, body: "Server Misconfiguration: Missing Keys" };
        return;
    }

    // 3. Validate Input
    const { name, email, company, message } = req.body || {};
    if (!name || !email || !message) {
        context.res = { status: 400, body: "Missing required fields (name, email, message)" };
        return;
    }

    try {
        const client = new EmailClient(connectionString);
        const emailMessage = {
            senderAddress: senderAddress,
            content: {
                subject: `New Inquiry: ${company || 'General'} - ${name}`,
                plainText: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`,
            },
            recipients: {
                to: [{ address: "info@wilburnpacific.com" }], // Change this to your email
            },
            replyTo: [{ address: email }]
        };

        const poller = await client.beginSend(emailMessage);
        await poller.pollUntilDone();

        context.res = { status: 200, body: "Email sent successfully" };

    } catch (error) {
        context.log.error("ACS Email Error:", error.message);
        context.res = { status: 500, body: "Email sending failed: " + error.message };
    }
};
