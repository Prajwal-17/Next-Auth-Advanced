"use server"

import prisma from "@/lib/db";
import { generateVerificationToken } from "@/lib/VerificationToken";
import { sendEmail } from "@/mail/Nodemailer";
import bcrypt from "bcryptjs"

export const newUser = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    try {
      const existingEmail = await prisma.user.findUnique({
        where: { email }
      })

      if (existingEmail) {
        return ("Email already exists.Try Logging In")
      }

      const hashedPassword = await bcrypt.hash(password, 10);




      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          emailVerified: null,
          image: "",
        }
      })

      const token = await generateVerificationToken(email);

      await sendEmail(email, token.token)

    } catch (err: any) {
      console.log(err)
    }
  } catch (err: any) {
    console.log(err)
  }


}