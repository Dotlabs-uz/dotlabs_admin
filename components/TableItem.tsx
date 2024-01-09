import Link from "next/link";
import React from "react";

interface TableItemProps {
	_id: string
	idx: number
	name: string
	image: string
	description: string
	price: number
	category: {
		_id: string
		name: string
		image: string
		createdAt: string
		updatedAt: string
	}
	titles: {
		ruTitle: string
		engTitle: string
		uzTitle: string
	},
}

const TableItem: React.FC<TableItemProps> = ({_id,idx, name, titles, image, price, description, category}) => {
	console.log({category});
	
	return (
		<tr className="bg-[#EEF1F8] border-b hover:bg-gray-200 even:bg-white text-[#111728]">
			<td className="w-4 p-4">
				<div className="flex items-center">
					{idx + 1}
				</div>
			</td>
			<th
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
			>
				{name}
			</th>
			<td className="px-6 py-4"></td>
			<td className="px-6 py-4">{category?.name}</td>
			<td className="px-6 py-4">${price.toLocaleString('us-US')}</td>
			<td className="px-6 py-4">
				<Link
					href={"/goods/" + _id}
					className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
				>
					Edit
				</Link>
			</td>
		</tr>
	);
};

export default TableItem;
