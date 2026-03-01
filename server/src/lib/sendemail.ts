import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import dotenv from "dotenv";


dotenv.config();

const mailSender = async (
  email: string,
  title: string,
  body: string
): Promise<nodemailer.SentMessageInfo> => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.Nodemailer_User as string,
        pass: process.env.Nodemailer_Pass as string,
      },
    });

    const mailOptions: SendMailOptions = {
      from: process.env.Nodemailer_User as string,
      to: email,
      subject: title,
      html: body,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while sending email");
  }
};

export default mailSender;