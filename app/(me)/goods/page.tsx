import Pagination from "@/components/Pagination";
import TableItem from "@/components/TableItem";
import axios from "axios";
import Link from "next/link";
import { FiFolderPlus } from "react-icons/fi";

export default async function Page({searchParams}: any) {
	const page = searchParams['page'] ?? '1'

	const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/products?page=${page}`)

	return (
		<div>
			<div className="flex items-center justify-between w-full">
				<h2 className="text-3xl mb-5">Product list</h2>
				<Link href="/goods/create" >
					<button
						className="flex items-center gap-3 bg-[#0A60FE] text-white py-3 px-5 rounded-md mb-5"
					>
						<FiFolderPlus size="22" />
						Create
					</button>
				</Link>
			</div>
			<div className="overflow-x-auto shadow-md sm:rounded-lg min-h-[80vh] relative pb-[80px]">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
					<thead className="text-xs text-[#6A7899] uppercase bg-[#FEFEFE] font-normal">
						<tr>
							<th scope="col" className="p-4">
								<div className="flex items-center">
									No
								</div>
							</th>
							<th scope="col" className="px-6 py-3">
								Product name
							</th>
							<th scope="col" className="px-6 py-3">
								
							</th>
							<th scope="col" className="px-6 py-3">
								Category
							</th>
							<th scope="col" className="px-6 py-3">
								Price
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{res.data.data.map((item:any, idx:number) => (
							<TableItem key={idx} idx={idx} {...item} />
						))}
					</tbody>
				</table>
				<div className="absolute bottom-0 w-full">
					<Pagination data={res.data} />
				</div>
			</div>
		</div>
	);
}