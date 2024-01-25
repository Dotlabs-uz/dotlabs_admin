"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FiHome } from "react-icons/fi";

interface NavigationsProps {}

const Navigations: React.FC<NavigationsProps> = () => {
    const pathname = usePathname()

	return (
		<ul className="w-full flex flex-col capitalize">
			<li className={`opacity-[0.67] pl-6 py-[10px] ${pathname === "/home" ? "active-link" : ""}`}>
				<Link className="flex items-center gap-3" href="/home">
					<FiHome size="22px" /> Home
				</Link>
			</li>
		</ul>
	);
};

export default Navigations;
