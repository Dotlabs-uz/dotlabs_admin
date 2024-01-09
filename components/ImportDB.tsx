"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { TbDatabaseImport } from "react-icons/tb";

interface ImportDBProps {}

const ImportDB: React.FC<ImportDBProps> = () => {
    const {push} = useRouter()

	function handleImportDB() {
		try {
			axios
				.get(process.env.NEXT_PUBLIC_API + "/download-products")
				.then((res) => {

                    if(res.status === 200 || res.status === 201) {
                        push(res.data.url)
                    }
				});
		} catch (e) {
			alert('Network error please reload the page')
		}
	}
	return (
		<>
			<li
				className={`opacity-[0.67] pl-6 py-[10px] cursor-pointer`}
				onClick={handleImportDB}
			>
				<span className="flex items-center gap-3">
					<TbDatabaseImport size="22px" /> Export products
				</span>
			</li>
		</>
	);
};

export default ImportDB;
 