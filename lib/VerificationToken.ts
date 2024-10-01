import { v4 as uuidv4 } from "uuid"
import crypto from "crypto"
import { getVerificationTokenbyEmail } from "./Ftoken_Femail";
import prisma from "./db";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenbyEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { email }
    })
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken
}