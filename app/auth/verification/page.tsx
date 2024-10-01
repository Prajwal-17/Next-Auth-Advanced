"use client";

import { verifyEmail } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerificationPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  const handleVerifyEmail = async () => {
    const result = await verifyEmail(token);

    if (result.success) {
      setSuccessMsg(result.message);
      router.push("/dashboard");
    } else {
      setErrMsg(result.message);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-4">Verify Your Email</h1>
        <p className="mb-4">Click the button below to verify your email:</p>
        <p className="mb-4 text-gray-300">{email}</p>
        <button
          onClick={handleVerifyEmail}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Verify Your Email
        </button>
        <p className="mt-4 text-red-400">{errMsg}</p>
        <p className="mt-2 text-green-400">{successMsg}</p>
      </div>
    </main>
  );
}
