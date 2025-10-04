"use client"

import Link from "next/link"
import { MessageSquare } from "lucide-react"

export function Header() {
    const links = [
        { href: "/", label: "Inbox" },
        { href: "/analytics", label: "Analytics" },
        { href: "/upload", label: "Upload" },
    ]

    return (
        <div className="flex flex-row justify-between px-6 pt-4 pb-6">
            <div className="flex flex-row gap-6">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="relative text-white hover:bg-[#3A3A3A] transition duration-300 group p-2 rounded-sm"
                    >
                        {link.label}
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#3A3A3A] transition-all duration-300 group-hover:w-full" />
                    </Link>
                ))}
            </div>
            <div>
                <Link href="/" className="flex flex-row gap-2 items-center hover:bg-[#3A3A3A] p-2 rounded-sm transitoin duration-300">
                    <MessageSquare />
                    <div>Review Co-Pilot</div>
                </Link>
            </div>
        </div>
    )
}
