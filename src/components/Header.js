"use client";

import SparklesIcon from '../components/SparklesIcon';
import UserPlus from '../components/UserPlus';
import UserMinus from '../components/UserMinus';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Fragment } from 'react';


function Header() {
    const { data, status } = useSession();
    return (
        <>
            <header className='flex justify-between my-8'>
                <Link className="flex gap-1" href='/'><SparklesIcon />
                    <span>CaptionGen</span>
                </Link>
                <nav className="flex gap-6 text-white/80">
                    <Link href='/'>Home</Link>
                    <Link href='/pricing'>Pricing</Link>
                    <Link href='/about'>About</Link>
                    {status === "authenticated" ? (
                        <>
                            <button className="inline-flex gap-2 border-2 border-purple-700/10 cursor-pointer" onClick={() => signOut()}>
                                Sign out
                            </button>
                        </>
                    ) : (
                        <button className="inline-flex gap-2 border-2 border-purple-700/10 cursor-pointer" onClick={() => signIn("google")}>
                            Sign in
                            <UserPlus />
                        </button>
                    )}
                    {data && <img
                        src={data.user.image}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full"
                    />}
                </nav>
            </header>
        </>
    )
}

export default Header