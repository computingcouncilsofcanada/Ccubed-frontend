import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { firstName, email, department, message } = await req.json();
   const formattedMessage = message.replace(/\n/g, "<br>");

  const departmentEmails: Record<string, string> = {
    "Finance/Sponsorship": "finance@ccubed.dev",
    "Social Media Collabs": "communications@ccubed.dev",
    "General Queries": "executivesccubed@gmail.com",
    "Partnership/Hiring": "outreach@ccubed.dev",
  };

  const toEmail = departmentEmails[department];
  if (!toEmail) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid department" }),
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Sender From Gmail 
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail, 
      subject: `Message from ${firstName} - ${department}`,
      text: message,
      html: `
  <div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
    <h2 style='margin-bottom: 10px;'>New ${department} Message</h2>
    <p><strong>Department:</strong> ${department}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Message:</strong><br>${formattedMessage}</p>
  </div>
`

      
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
    });
  }
}
