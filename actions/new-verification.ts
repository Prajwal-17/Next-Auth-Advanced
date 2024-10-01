// src/actions/verifyEmail.ts
"use server";

import prisma from "@/lib/db";
import { getVerificationTokenbyToken } from "@/lib/Ftoken_Femail";

export const verifyEmail = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenbyToken(token);

    if (!existingToken) {
      return { success: false, message: "Token does not exist!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { success: false, message: "Token has expired." };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: existingToken.email },
    });

    if (!existingUser) {
      return { success: false, message: "Email does not exist." };
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date(), email: existingToken.email },
    });

    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return { success: true, message: "Email verified successfully." };
  } catch (error) {
    console.error("Verification error:", error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
};
