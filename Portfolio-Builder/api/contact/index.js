const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
    // 1. Get Connection String from Environment Variables
    const connectionString = process.env.ACS_CONNECTION_STRING;
    
    // 2. Validate Inputs
    const { name, email, company, message } = req.body;
    if (!name || !email || !message || !connectionString) {
        context.res = { status: 400, body: "Missing data or server configuration." };
        return;
    }

    try {
        // 3. Initialize the Client
        const client = new EmailClient(connectionString);

        // 4. Construct the Email
        const emailMessage = {
            senderAddress: process.env.SENDER_ADDRESS, // e.g. DoNotReply@<guid>.azurecomm.net
            content: {
                subject: `New Inquiry: ${company || 'General'} - ${name}`,
                plainText: `
                    Name: ${name}
                    Company: ${company}
                    Email: ${email}
                    
                    Message:
                    ${message}
                `,
            },
            recipients: {
                to: [{ address: "engineering@wilburnpacific.com" }], // Your actual email
            },
            // This allows you to hit "Reply" in Proton and have it go to the client
            replyTo: [{ address: email }] 
        };

        // 5. Send
        const poller = await client.beginSend(emailMessage);
        await poller.pollUntilDone();

        context.res = { status: 200, body: "Email sent successfully" };

    } catch (error) {
        context.log.error("ACS Email Error:", error);
        context.res = { status: 500, body: "Internal Server Error" };
    }
};






// // You will need to install sendgrid: cd api && npm install @sendgrid/mail
// const sgMail = require('@sendgrid/mail');

// module.exports = async function (context, req) {
//     // 1. Validate Input
//     const { name, email, company, message } = req.body;
//     if (!name || !email || !message) {
//         context.res = { status: 400, body: "Missing required fields" };
//         return;
//     }

//     // 2. Setup Secure Email (Key is pulled from Azure Settings)
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//     const msg = {
//         to: 'sales@wilburnpacific.com', // Your Proton/Business email
//         from: 'no-reply@your-azure-domain.com', // Verified sender in SendGrid
//         replyTo: email, // Lets you hit "Reply" in Proton to answer the client
//         subject: `New Inquiry: ${company || 'General'} - ${name}`,
//         text: `
//             Name: ${name}
//             Company: ${company}
//             Email: ${email}
            
//             Message:
//             ${message}
//         `,
//     };

//     // 3. Send and Respond
//     try {
//         await sgMail.send(msg);
//         context.res = { status: 200, body: "Inquiry sent successfully." };
//     } catch (error) {
//         context.log.error("Email Error:", error);
//         context.res = { status: 500, body: "Internal Server Error" };
//     }
// };