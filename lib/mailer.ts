import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.EMAIL_USER || 'jamiltraders1972@gmail.com';
const EMAIL_PASS = (process.env.EMAIL_PASS || 'msjxkgdnilpvhfdd').replace(/\s+/g, '');
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'jamiltraders1972@gmail.com';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

export interface ContactInquiryData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  projectType: string;
  location?: string;
  description?: string;
}

export interface QuoteItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  specs?: {
    wattage?: string;
    colorTemp?: string;
    beamAngle?: string;
    cri?: string;
  };
}

export interface QuoteRequestData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  projectLocation?: string;
  projectNotes?: string;
  items: QuoteItem[];
}

export async function sendContactInquiry(
  data: ContactInquiryData,
  attachment?: { filename: string; content: Buffer; contentType?: string } | null
) {
  const cleanName = (data.name || "Client").replace(/[\r\n"\\]/g, "").trim() || "Client";
  const mailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f9; color: #1e293b; margin: 0; padding: 24px; }
        .container { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #0b0f19; padding: 32px 28px; text-align: center; border-bottom: 3px solid #C8102E; }
        .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
        .header p { margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; letter-spacing: 1px; }
        .badge { display: inline-block; background: #C8102E; color: #ffffff; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-bottom: 12px; }
        .content { padding: 32px 28px; }
        .section-title { font-size: 14px; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
        .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .detail-table td { padding: 10px 12px; font-size: 14px; vertical-align: top; }
        .detail-table tr:nth-child(even) { background-color: #f8fafc; }
        .detail-label { font-weight: 600; color: #475569; width: 35%; }
        .detail-value { color: #0f172a; font-weight: 500; }
        .message-box { background: #f8fafc; border-left: 4px solid #C8102E; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px; font-size: 14px; line-height: 1.6; color: #334155; }
        .footer { background: #f1f5f9; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .btn-reply { display: inline-block; background: #0b0f19; color: #ffffff !important; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; margin-top: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="badge">NEW PROJECT INQUIRY</span>
          <h1>JAMEEL TRADERS</h1>
          <p>Website Contact Form Submission</p>
        </div>
        <div class="content">
          <div class="section-title">Client Information</div>
          <table class="detail-table">
            <tr>
              <td class="detail-label">Client Name:</td>
              <td class="detail-value"><strong>${data.name}</strong></td>
            </tr>
            <tr>
              <td class="detail-label">Email Address:</td>
              <td class="detail-value"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td class="detail-label">Phone / WhatsApp:</td>
              <td class="detail-value"><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
            <tr>
              <td class="detail-label">Company / Practice:</td>
              <td class="detail-value">${data.company || 'Not specified'}</td>
            </tr>
            <tr>
              <td class="detail-label">Project Type:</td>
              <td class="detail-value"><strong>${data.projectType}</strong></td>
            </tr>
            <tr>
              <td class="detail-label">Project Location:</td>
              <td class="detail-value">${data.location || 'Not specified'}</td>
            </tr>
          </table>

          <div class="section-title">Project Details & Vision</div>
          <div class="message-box">
            ${data.description ? data.description.replace(/\n/g, '<br />') : '<em>No additional description provided.</em>'}
          </div>

          ${attachment ? `
            <div class="section-title">Attached File</div>
            <p style="font-size: 14px; color: #059669; font-weight: 600; margin-top: 0;">
              📎 ${attachment.filename} (${(attachment.content.length / 1024 / 1024).toFixed(2)} MB attached)
            </p>
          ` : ''}

          <div style="text-align: center; margin-top: 24px;">
            <a href="mailto:${data.email}?subject=Re:%20Jameel%20Traders%20Project%20Inquiry%20-${encodeURIComponent(data.projectType)}" class="btn-reply">
              ✉️ Click to Reply to ${data.name}
            </a>
          </div>
        </div>
        <div class="footer">
          Jameel Traders • DHA Phase 8 Commercial Broadway, Lahore<br />
          Received automatically from the website inquiry form at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} (PKT)
        </div>
      </div>
    </body>
    </html>
  `;

  return await transporter.sendMail({
    from: `"${cleanName} (via Jameel Traders Website)" <${EMAIL_USER}>`,
    to: NOTIFICATION_EMAIL,
    replyTo: data.email,
    subject: `[Project Inquiry] ${data.name} - ${data.projectType}`,
    html: mailHtml,
    attachments: attachment ? [attachment] : [],
  });
}

export async function sendQuoteRequest(data: QuoteRequestData) {
  const cleanName = (data.name || "Client").replace(/[\r\n"\\]/g, "").trim() || "Client";
  const totalUnits = data.items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const itemsRows = data.items.map((item, idx) => `
    <tr style="border-bottom: 1px solid #e2e8f0; ${idx % 2 === 0 ? 'background-color: #ffffff;' : 'background-color: #f8fafc;'}">
      <td style="padding: 12px 10px; font-size: 13px; font-weight: 600; color: #0f172a;">
        ${item.name}
        <div style="font-size: 11px; color: #64748b; font-weight: normal; margin-top: 2px;">
          Category: ${item.category}
        </div>
      </td>
      <td style="padding: 12px 10px; font-size: 12px; color: #475569;">
        ${item.specs?.wattage ? `Wattage: ${item.specs.wattage}<br />` : ''}
        ${item.specs?.colorTemp ? `CCT: ${item.specs.colorTemp}<br />` : ''}
        ${item.specs?.beamAngle ? `Beam: ${item.specs.beamAngle}` : ''}
      </td>
      <td style="padding: 12px 10px; font-size: 14px; font-weight: 700; color: #C8102E; text-align: center;">
        ${item.quantity}
      </td>
    </tr>
  `).join('');

  const mailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f9; color: #1e293b; margin: 0; padding: 24px; }
        .container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #0b0f19; padding: 32px 28px; text-align: center; border-bottom: 3px solid #C8102E; }
        .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
        .header p { margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; letter-spacing: 1px; }
        .badge { display: inline-block; background: #C8102E; color: #ffffff; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-bottom: 12px; }
        .content { padding: 32px 28px; }
        .section-title { font-size: 14px; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
        .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .detail-table td { padding: 10px 12px; font-size: 14px; vertical-align: top; }
        .detail-table tr:nth-child(even) { background-color: #f8fafc; }
        .detail-label { font-weight: 600; color: #475569; width: 35%; }
        .detail-value { color: #0f172a; font-weight: 500; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
        .items-table th { background: #f1f5f9; padding: 10px 12px; font-size: 12px; font-weight: 700; color: #334155; text-transform: uppercase; text-align: left; }
        .message-box { background: #f8fafc; border-left: 4px solid #C8102E; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px; font-size: 14px; line-height: 1.6; color: #334155; }
        .footer { background: #f1f5f9; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .btn-reply { display: inline-block; background: #0b0f19; color: #ffffff !important; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; margin-top: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="badge">NEW QUOTE REQUEST</span>
          <h1>JAMEEL TRADERS</h1>
          <p>Project Lighting List Specification Request</p>
        </div>
        <div class="content">
          <div class="section-title">Client Details</div>
          <table class="detail-table">
            <tr>
              <td class="detail-label">Client Name:</td>
              <td class="detail-value"><strong>${data.name}</strong></td>
            </tr>
            <tr>
              <td class="detail-label">Email Address:</td>
              <td class="detail-value"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td class="detail-label">Phone / WhatsApp:</td>
              <td class="detail-value"><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
            <tr>
              <td class="detail-label">Company / Firm:</td>
              <td class="detail-value">${data.company || 'Not specified'}</td>
            </tr>
            <tr>
              <td class="detail-label">Project Location:</td>
              <td class="detail-value">${data.projectLocation || 'Not specified'}</td>
            </tr>
          </table>

          <div class="section-title">Selected Lighting Fixtures (${totalUnits} Total Units)</div>
          <table class="items-table">
            <thead>
              <tr>
                <th>Luminaire / Model</th>
                <th>Specifications</th>
                <th style="text-align: center;">Qty</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
          </table>

          ${data.projectNotes ? `
            <div class="section-title">Project Notes & Requirements</div>
            <div class="message-box">
              ${data.projectNotes.replace(/\n/g, '<br />')}
            </div>
          ` : ''}

          <div style="text-align: center; margin-top: 24px;">
            <a href="mailto:${data.email}?subject=Specification%20Quote%20-%20Jameel%20Traders" class="btn-reply">
              ✉️ Click to Reply to ${data.name}
            </a>
          </div>
        </div>
        <div class="footer">
          Jameel Traders • DHA Phase 8 Commercial Broadway, Lahore<br />
          Received automatically from Project List Drawer at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} (PKT)
        </div>
      </div>
    </body>
    </html>
  `;

  return await transporter.sendMail({
    from: `"${cleanName} (via Jameel Traders Website)" <${EMAIL_USER}>`,
    to: NOTIFICATION_EMAIL,
    replyTo: data.email,
    subject: `[Quote Request] ${data.name} - ${data.items.length} Products (${totalUnits} Units)`,
    html: mailHtml,
  });
}
