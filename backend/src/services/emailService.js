const nodemailer = require('nodemailer');

// Create Gmail SMTP transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Send a styled HTML email notification to admin when a proposal is submitted
 */
exports.sendProposalNotification = async (data) => {
    const { name, company, email, budget, project_type, message, nda } = data;

    const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); padding: 32px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                🚀 New Project Proposal
            </h1>
            <p style="color: #a0a0b0; margin: 8px 0 0; font-size: 14px;">QuntamLayerAI</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; width: 140px;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 15px; font-weight: 500;">${name || 'N/A'}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Company</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 15px; font-weight: 500;">${company || 'N/A'}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 15px;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email || 'N/A'}</a></td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Budget</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 15px; font-weight: 600;">${budget || 'Not specified'}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Timeline</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 15px;">${project_type || 'Not specified'}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">NDA Required</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 15px;">${nda ? '✅ Yes' : '❌ No'}</td>
                </tr>
            </table>

            ${message ? `
            <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #0a0a0a;">
                <p style="margin: 0 0 8px; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Project Brief</p>
                <p style="margin: 0; color: #1a1a1a; font-size: 14px; line-height: 1.6;">${message}</p>
            </div>
            ` : ''}
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 32px; text-align: center; border-top: 1px solid #e8e8e8;">
            <p style="color: #999; font-size: 12px; margin: 0;">This is an automated notification from QuntamLayerAI</p>
        </div>
    </div>
    `;

    await transporter.sendMail({
        from: `"QuntamLayerAI" <${process.env.EMAIL_USER}>`,
        to: 'tirthsachani6105@gmail.com',
        subject: `🚀 New Proposal: ${name} — ${company || 'Unknown Company'}`,
        html
    });

    console.log('📧 Email notification sent successfully');
};
