"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation";
import UploadIcon from "../components/UploadIcon";
import { useSession, signIn } from 'next-auth/react';
import UserPlus from '../components/UserPlus';

function UploadForm() {
    const { data, status } = useSession();

    const [uploading, setUploading] = useState(false)
    const router = useRouter()

    const upload = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            setUploading(true)
            const res = await axios.postForm("/api/upload", { file })
            setUploading(false)
            console.log(res.data)
            router.push(`/${res.data.newName}`)
        }
    }

    return (
        <>
            {uploading && <div className="bg-black/80 text-white fixed inset-0 flex items-center">
                <div className="w-full">
                    <h2 className="text-4xl mb-4">Uploading</h2>
                    <h4 className="text-sm text-gray-300">Please wait, It may take a while</h4>
                </div>
            </div>}
            {
                status === "authenticated" ? (
                    <label className="inline-flex gap-2 border-2 border-purple-700/50 bg-green-600 rounded-full px-6 py-2 cursor-pointer">
                        <UploadIcon />
                        <span>Get Started</span>

                        <input onChange={upload} type="file" className="hidden" />
                    </label>
                ) : (
                    <button className="inline-flex gap-2 border-2 border-purple-700/50 bg-green-600 rounded-full px-6 py-2 cursor-pointer" onClick={() => signIn("google")}>
                        Sign in
                        <UserPlus />
                    </button>
                )
            }
        </>
    )
}

export default UploadForm