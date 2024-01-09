"use client";

import React, { useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Input from "../Forms/Input";
import TextArea from "../Forms/TextArea";
import { useForm } from "react-hook-form";
import FileUpload from "../Forms/FileUpload";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

type Category = {
	_id: string;
	name: string;
	image: string;
	createdAt: string;
	updatedAt: string;
};

interface ProductProps {
	_id: string;
	name: string;
	price: number;
	category: Category;
	image: string;
	description: string;
	testCount: number;
	manufacturer: string;
	titles: {
		ruTitle: string;
		engTitle: string;
		uzTitle: string;
	};
	categories: any;
}
interface Inputs {
	name: string;
	price: number;
	category: any;
	image: any;
	description: string;
	testCount: number | string;
	manufacturer: string;
	titles: {
		uzTitle: string;
		ruTitle: string;
		engTitle: string;
	};
}

const Product: React.FC<ProductProps> = ({
	name,
	category,
	titles,
	price,
	description,
	image,
	testCount,
	manufacturer,
	categories,
	_id,
}) => {
	const [cookies, setCookie] = useCookies(["token"]);
	const [changing, setChanging] = useState(false);
	const [fileImage, setFileImage] = useState<string | null>(null);
	const { refresh, push } = useRouter();
	const initialValues: any = {
		name,
		category,
		titles,
		price,
		description,
		image,
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			name,
			category: category._id,
			titles,
			price,
			description,
			image,
			testCount,
			manufacturer,
		},
	});

	console.log({
		name,
		category: category._id,
		titles,
		price,
		description,
		image,
		testCount,
		manufacturer,
	});

	const onSubmit = async (data: any) => {
		try {
			// Определите измененные поля
			let changedFields = Object.keys(data).reduce(
				(acc: any, key: any) => {
					if (key === "titles") {
						const changedTitles = Object.keys(data.titles).reduce(
							(titleAcc: any, titleKey) => {
								if (
									data.titles[titleKey] !==
									initialValues.titles[titleKey]
								) {
									titleAcc[titleKey] = data.titles[titleKey];
								}
								return titleAcc;
							},
							{} as Partial<Inputs["titles"]>
						);
						if (Object.keys(changedTitles).length > 0) {
							acc.titles = changedTitles;
						}
					} else if (data[key] !== initialValues[key]) {
						acc[key] = data[key];
					}
					return acc;
				},
				{} as Partial<Inputs>
			);

			if (changedFields?.image) {
				changedFields = {
					...changedFields,
					image: changedFields?.image[0],
				};
			}

			const response = await axios.patch(
				process.env.NEXT_PUBLIC_API + "/products/" + _id,
				changedFields,
				{
					headers: {
						Authorization: cookies?.token?.token,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (response.status === 200 || response.status === 201) {
				refresh();
				setChanging(false);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = () => {
				setFileImage(reader.result as string);
			};

			reader.readAsDataURL(file);
		}
	};

	const handleRemove = async () => {
		const answer = confirm("Are u sure to delete this product?");

		if (answer) {
			try {
				const res = await axios.delete(
					process.env.NEXT_PUBLIC_API + "/products/" + _id,
					{
						headers: {
							Authorization: cookies?.token?.token,
						},
					}
				);

				if (res.status === 201 || res.status === 200) {
					alert("Success!");
					push("/goods");
				}
			} catch (e) {
				alert("Network error try again");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="border-2 rounded-xl p-4 bg-white">
				<div className="flex items-center justify-between w-full mb-5">
					{changing ? (
						<div>
							<Input
								label="Name"
								placeholder="Product name"
								rules={{
									...register("name", { required: true }),
								}}
							/>
						</div>
					) : (
						<div className="flex flex-col">
							<h2 className="text-2xl font-bold">Name</h2>
							<h1>{name}</h1>
						</div>
					)}
					<div className="flex items-center gap-5">
						{changing ? (
							<button
								type="submit"
								className="flex items-center gap-3 bg-green-500 text-white py-3 px-5 rounded-md"
							>
								<FaEdit />
								save
							</button>
						) : (
							<>
								<button
									type="button"
									onClick={() => setChanging(!changing)}
									className="flex items-center gap-3 bg-[#0A60FE] text-white py-3 px-5 rounded-md"
								>
									<FaEdit />
									change
								</button>
								<button
									className="hidden"
									type="submit"
								></button>
							</>
						)}
						{changing ? (
							<button
								type="button"
								onClick={() => setChanging(false)}
								className="flex items-center gap-3 bg-gray-500 text-white py-3 px-5 rounded-md"
							>
								<IoMdArrowBack size="22" />
								cancel
							</button>
						) : (
							<button
								type="button"
								onClick={handleRemove}
								className="flex items-center gap-3 bg-red-500 text-white py-3 px-5 rounded-md"
							>
								<FaRegTrashAlt />
								delete
							</button>
						)}
					</div>
				</div>
				<div className="flex items-start gap-10 ">
					{changing ? (
						<FileUpload
							handleImageChange={handleImageChange}
							rules={{
								...register("image", {
									required: false,
								}),
							}}
							image={fileImage}
							currentImage={image}
						/>
					) : (
						<div
							style={{
								backgroundImage: `url(${fileImage || image})`,
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
							className="w-full bg-gray-400 h-[500px] rounded-xl"
						></div>
					)}

					<div className="flex flex-col items-start gap-2 w-full">
						{changing ? (
							<>
								<span>Category</span>
								<select
									className="w-full font-normal border-2 rounded-md p-3"
									// defaultValue={category.name}
									{...register("category", {
										required: true,
									})}
								>
									{categories.data.map((item: Category) => (
										<option key={item._id} value={item._id}>
											{item.name}
										</option>
									))}
								</select>
							</>
						) : (
							<>
								<h2 className="text-2xl font-bold">Category</h2>
								<span>{category.name}</span>
							</>
						)}
						{!changing && (
							<h2 className="text-2xl font-bold">Titles</h2>
						)}
						<hr className=" border-2 w-full" />
						{changing ? (
							<Input
								label="Uz Title"
								placeholder="UZ title"
								rules={{
									...register("titles.uzTitle", {
										required: true,
									}),
								}}
							/>
						) : (
							<h2 className="text-xl font-bold">
								🇺🇿 {titles.uzTitle}
							</h2>
						)}
						<hr className=" border-2 w-full" />
						{changing ? (
							<Input
								label="Ru Title"
								placeholder="RU title"
								rules={{
									...register("titles.ruTitle", {
										required: true,
									}),
								}}
							/>
						) : (
							<h2 className="text-xl font-bold">
								🇷🇺 {titles.ruTitle}
							</h2>
						)}
						<hr className=" border-2 w-full" />
						{changing ? (
							<Input
								label="En Title"
								placeholder="EN title"
								rules={{
									...register("titles.engTitle", {
										required: true,
									}),
								}}
							/>
						) : (
							<h2 className="text-xl font-bold">
								🇬🇧 {titles.engTitle}
							</h2>
						)}
						<hr className=" border-2 w-full" />

						{!changing && (
							<h2 className="text-2xl font-bold">Price</h2>
						)}
						{changing ? (
							<Input
								label="Price"
								placeholder="price"
								type="number"
								rules={{
									...register("price", {
										required: false,
									}),
								}}
							/>
						) : (
							<span>{price.toLocaleString("us-US")} sum</span>
						)}
					</div>
				</div>
			</div>
			<div className="border-2 rounded-xl p-4 bg-white">
				<div className="w-full flex items-center justify-between gap-4 mb-4">
					<div className="w-full flex flex-col">
						{changing ? (
							<>
								<Input
									label="Tests amount"
									placeholder="Tests amount"
									rules={{
										...register("testCount", {
											required: true,
										}),
									}}
								/>
								{errors.testCount && (
									<span className="text-red-500">
										Tests amount is required
									</span>
								)}
							</>
						) : (
							<h2 className="text-xl font-bold">
								{testCount || "no test count"}
							</h2>
						)}
					</div>
					<div className="w-full flex flex-col">
						{changing ? (
							<>
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
							</>
						) : (
							<h2 className="text-xl font-bold">
								{manufacturer || "no manufacturer"}
							</h2>
						)}
					</div>
				</div>
				<hr className="my-4" />
				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-bold">Description</h2>
					<hr />
					{changing ? (
						<TextArea
							rules={{
								...register("description", { required: true }),
							}}
						/>
					) : (
						<p>{description}</p>
					)}
				</div>
			</div>
		</form>
	);
};

export default Product;
