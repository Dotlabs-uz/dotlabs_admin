"use client"
import { useRouter } from "next/navigation";

interface PaginationProps {
	data: any;
}

const Pagination: React.FC<PaginationProps> = ({ data }) => {
	const {push} = useRouter()
	
	return (
		<nav
			className="flex items-center flex-column flex-wrap md:flex-row px-3 py-3 justify-between pt-4 text-[#6A7899] bg-[#FEFEFE]"
			aria-label="Table navigation"
		>
			<span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
				Showing{" "}
				<span className="font-semibold text-gray-900 ">
					{data.data.length}
				</span>{" "}
				of{" "}
				<span className="font-semibold text-gray-900">
					{data.count}
				</span>
			</span>
			<ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
				<li>
					<button
						className={`${data.page === 1 && "cursor-not-allowed"} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 `}
						disabled={data.page === 1}
						onClick={() => {
							if(data.page > 0) {
								push(`?page=${data.page - 1}`)
							}
						}}
					>
						Previous
					</button>
				</li>
				{Array.from({ length: data.pageCount }).map((item, idx:number) => (
					<li key={idx} className="cursor-pointer" onClick={() => {
						push(`?page=${idx + 1}`)
					}} >
						<span
							className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${(data.page === idx + 1) ? "bg-[#daebff]" : "bg-white"}`}
						>
							{idx + 1}
						</span>
					</li>
				))}
				<li>
					<button
						className={`${data.page === data.pageCount && "cursor-not-allowed"} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 `}
						disabled={data.page === data.pageCount}
						onClick={() => {
							if(data.page < data.pageCount) {
								push(`?page=${data.page + 1}`)
							}
						}}
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
