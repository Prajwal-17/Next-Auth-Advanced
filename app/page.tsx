import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h2 className="text-3xl mb-4">Next Auth</h2>
        <div className="space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <Link href="/auth/register">Register</Link>
          </button>
          <button className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
            <Link href="/auth/sign-in">Sign In</Link>
          </button>
          <button className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
          <Link href="/dashboard">Dashboard</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
