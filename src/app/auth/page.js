"use client";

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function LoginPage() {
    const router = useRouter();
    const { data, status } = useSession();

    if (status === "loading") {
        <div>Signing you in...</div>
    }
    if (status === "authenticated") {
        router.push("/");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login with Google</h2>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => signIn("google")}>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
