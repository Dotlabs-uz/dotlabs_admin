"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";
import Input from "@/components/Forms/Input";
import { FiFolderPlus } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import TextArea from "@/components/Forms/TextArea";
import FileUpload from "@/components/Forms/FileUpload";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Inputs {
	name: string;
	price: string;
	category: string;
	image: File;
	description: string;
	manufacturer: string;
	testsCount: number;
	titles: {
		uzTitle: string;
		ruTitle: string;
		engTitle: string;
	};
}

const Product = () => {
	const [cookies, setCookie] = useCookies(["token"]);
	const [categories, setCategories] = useState([]);
	const [handleModal, setHandleModal] = useState(false);
	const router = useRouter();

	useEffect(() => {
		axios
			.get(process.env.NEXT_PUBLIC_API + "/categories")
			.then((res) => setCategories(res.data.data));
	}, []);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const [image, setImage] = useState<string | null>(null);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			setHandleModal(true);

			const formData = new FormData();
			Object.entries(data).forEach(([key, value]) => {
				if (key === "titles") {
					Object.entries(value).forEach(([subKey, subValue]: any) => {
						formData.append(`titles.${subKey}`, subValue);
					});
				} else if (key === "image") {
					formData.append(key, (value as FileList)[0]);
				} else {
					formData.append(key, value);
				}
			});

			const response = await axios.post(
				process.env.NEXT_PUBLIC_API + "/products",
				formData,
				{
					headers: {
						Authorization: cookies?.token?.token,
					},
				}
			);

			// console.log("Data uploaded successfully:", response.data);
			router.push("/goods");
		} catch (error) {
			console.error("Error uploading data:", error);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = () => {
				setImage(reader.result as string);
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="relative">
			<div className="border-2 rounded-xl p-4 bg-white">
				<div className="flex items-center justify-between w-full mb-5">
					<div>
						<Input
							label="Name"
							placeholder="Product name"
							rules={{
								...register("name", { required: true }),
							}}
						/>
						{errors.name && (
							<span className="text-red-500">
								Title is required
							</span>
						)}
					</div>

					<div className="flex items-center gap-5">
						<button
							type="submit"
							className="flex items-center gap-3 bg-[#0A60FE] text-white py-3 px-5 rounded-md"
						>
							<FiFolderPlus size="22" />
							Create/Save
						</button>
						<Link href="/goods">
							<button
								type="button"
								className="flex items-center gap-3 bg-red-500 text-white py-3 px-5 rounded-md"
							>
								<MdCancel />
								Cancel
							</button>
						</Link>
					</div>
				</div>
				<div className="flex items-start gap-10 ">
					<FileUpload
						handleImageChange={handleImageChange}
						rules={{
							...register("image", {
								required: "Image is required",
							}),
						}}
						image={image}
						currentImage=""
					/>

					<div className="flex flex-col items-start gap-2 w-full">
						<>
							<span>Category</span>
							<select
								className="w-full font-normal border-2 rounded-md p-3"
								{...register("category", {
									required: true,
								})}
							>
								{categories?.map((item: any) => (
									<option key={item._id} value={item._id}>
										{item.name}
									</option>
								))}
							</select>
						</>

						{errors.category && (
							<span className="text-red-500">
								Category is required
							</span>
						)}
						<div className="flex flex-col items-start gap-1 border-2 w-full rounded-md p-2">
							<Input
								label="Uz Title"
								placeholder="Title Uzbek"
								rules={{
									...register("titles.uzTitle", {
										required: true,
									}),
								}}
							/>
							{errors.titles?.uzTitle && (
								<span className="text-red-500">
									Uz Title is required
								</span>
							)}
							<Input
								label="Ru Title"
								placeholder="Title Russian"
								rules={{
									...register("titles.ruTitle", {
										required: true,
									}),
								}}
							/>
							{errors.titles?.ruTitle && (
								<span className="text-red-500">
									Ru Title is required
								</span>
							)}
							<Input
								label="En Title"
								placeholder="Title English"
								rules={{
									...register("titles.engTitle", {
										required: true,
									}),
								}}
							/>
							{errors.titles?.engTitle && (
								<span className="text-red-500">
									En Title is required
								</span>
							)}
						</div>

						<Input
							label="Price"
							rules={{
								...register("price", {
									required: false,
								}),
							}}
							placeholder="price"
							type="number"
						/>
						{errors.price && (
							<span className="text-red-500">
								Price is required
							</span>
						)}
					</div>
				</div>
			</div>
			<div className="border-2 rounded-xl p-4 bg-white">
				<div className="w-full flex items-center justify-between gap-4 mb-4">
					<div className="w-full flex flex-col">
						<Input
							label="Tests amount"
							placeholder="Title English"
							rules={{
								...register("testsCount", {
									required: true,
								}),
							}}
						/>
						{errors.testsCount && (
							<span className="text-red-500">
								Tests amount is required
							</span>
						)}
					</div>
					<div className="w-full flex flex-col">
						<Input
							label="Manufacturer"
							placeholder="Manufacturer"
							rules={{
								...register("manufacturer", {
									required: true,
								}),
							}}
						/>
						{errors.manufacturer && (
							<span className="text-red-500">
								Manufacturer is required
							</span>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<h2>Description</h2>
					<hr />
					<TextArea
						rules={{
							...register("description", {
								required: true,
							}),
						}}
					/>
					{errors.description && (
						<span className="text-red-500">
							Description is required
						</span>
					)}
				</div>
			</div>

			{handleModal ? (
				<div className="bg-[#00000022] backdrop-blur-sm absolute top-0 left-0 w-full h-full rounded-xl flex items-center justify-center">
					<span className="loader"></span>
				</div>
			) : null}
		</form>
	);
};

export default Product;
