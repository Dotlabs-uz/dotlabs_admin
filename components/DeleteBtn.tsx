"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteBtn = ({ id, token }: { id: string, token: string }) => {
	const {refresh} = useRouter()
	async function removeCategory() {
		const sure = confirm('Are you sure?')

		if(sure) {
			const res = await axios.delete(
				process.env.NEXT_PUBLIC_API + "/categories/" + id,
				{
					headers: {
						Authorization: token,
					},
				}
			);
			
			if(res.status === 200 || res.status === 201) {
				alert('success')
				refresh()
			} else {
				alert('network error')
			}
		}
	}
	return (
		<button
			onClick={removeCategory}
			className="mr-4 p-3 bg-red-600 hover:bg-red-400 text-white rounded-md"
		>
			<FaRegTrashAlt />
		</button>
	);
};

export default DeleteBtn;
