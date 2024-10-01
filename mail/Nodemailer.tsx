import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import Email from "./Email";

const email = process.env.EMAIL as string;
const pass = process.env.EMAIL_PASS as string;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: email,
    pass,
  },
});

export const sendEmail = async (recipientEmail: string, token: string) => {
  try {

    const emailHtml = render(<Email url={`http://localhost:3000/auth/verification?token=${token}`} />);

    const options = {
      from: "prajwalkreddy17@gmail.com",
      to: recipientEmail,
      subject: "hello world",
      html: emailHtml,
    };

    await transporter.sendMail(options);

  } catch (err: any) {
    console.log(err)
  }
}
