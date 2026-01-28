import { Router, type Request, type Response } from "express";

const router = Router();

// Send offer letter email
router.post("/offer-letter", async (req: Request, res: Response) => {
  try {
    const { email, candidateName } = req.body;

    if (!email || !candidateName) {
      return res
        .status(400)
        .json({ error: "Email and candidateName are required" });
    }

    // TODO: Integrate with email service (e.g., Nodemailer, Resend, SendGrid)
    // For now, just log and return success
    console.log(`📧 Sending offer letter to ${email} for ${candidateName}`);

    // Example with Nodemailer (uncomment when configured):
    // await transporter.sendMail({
    //   from: process.env.EMAIL_FROM,
    //   to: email,
    //   subject: `Offer Letter - ${candidateName}`,
    //   html: `<h1>Congratulations ${candidateName}!</h1><p>Your offer letter is attached.</p>`,
    // });

    res.json({ success: true, message: `Offer letter sent to ${email}` });
  } catch (error) {
    console.error("Error sending offer letter:", error);
    res.status(500).json({ error: "Failed to send offer letter" });
  }
});

// Send welcome email
router.post("/welcome", async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: "Email and name are required" });
    }

    console.log(`📧 Sending welcome email to ${email} for ${name}`);

    // TODO: Integrate with email service
    // await transporter.sendMail({
    //   from: process.env.EMAIL_FROM,
    //   to: email,
    //   subject: `Welcome to Dominova, ${name}!`,
    //   html: `<h1>Welcome ${name}!</h1><p>We're excited to have you on board.</p>`,
    // });

    res.json({ success: true, message: `Welcome email sent to ${email}` });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    res.status(500).json({ error: "Failed to send welcome email" });
  }
});

export default router;
