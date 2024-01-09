"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Forms/Input";
import { IoClose } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useCookies } from "react-cookie";

interface Inputs {
	name: string;
	image: any;
}
interface Props {
	category?: any;
	onClose: () => void;
	onOk: () => void;
}

export default function EditCategory({ category, onClose, onOk }: Props) {
	const [image, setImage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [cookies, setCookie] = useCookies(["token"]);
	const router = useRouter();
	const searchParams = useSearchParams();
	const dialogRef = useRef<null | HTMLDialogElement>(null);
	const showDialog = searchParams.get("showEditDialog");
	const name = searchParams.get("name");
	const current_image = searchParams.get("image");
	const id = searchParams.get("id");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue
	} = useForm<Inputs>({
		defaultValues: {
			name: name || "",
			image: current_image || "",
		},
	});

	const onSubmit = async (data: any) => {
		setLoading(true);
		try {
			if (typeof data.image !== "string") {
				data.image = data?.image[0];
			} else {
				data.image = current_image;
			}

			const res = await axios.patch(
				process.env.NEXT_PUBLIC_API + "/categories/" + id,
				data,
				{
					headers: {
						Authorization: cookies?.token?.token,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (res.status === 200 || res.status === 201) {
				reset();
				closeDialog();
				setImage(null);
				setLoading(false);
				return;
			}
		} catch (e) {
			setLoading(false);
			alert("Network error!");
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

	useEffect(() => {
		if (showDialog === "y") {
			dialogRef.current?.showModal();
			setValue("name", searchParams.get("name") || "")
		} else {
			dialogRef.current?.close();
		}
	}, [searchParams]);

	const closeDialog = () => {
		dialogRef.current?.close();
		router.push("?showEditDialog=n", { shalow: false });
		onClose();
	};

	const dialog: JSX.Element | null =
		showDialog === "y" ? (
			<dialog ref={dialogRef}>
				<div className="flex flex-col gap-3 w-[700px] h-[400px] bg-white rounded-md p-4">
					<h1>Edit</h1>
					<button
						onClick={closeDialog}
						className="absolute top-4 right-4"
					>
						<IoClose size="22" />
					</button>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-3"
					>
						<Input
							placeholder="Name"
							label="Name"
							rules={{
								...register("name", { required: true }),
							}}
						/>
						<input
							className="w-full font-normal border-2 rounded-md p-3"
							type="file"
							id="dropzone-file"
							{...register("image", {
								required: false,
							})}
							onChange={handleImageChange}
							multiple
						/>

						<button
							type="submit"
							disabled={loading}
							className="p-4 rounded-md bg-blue-500 hover:bg-blue-300 text-white"
						>
							{loading ? "loading..." : "Edit"}
						</button>
					</form>
					<h3>Category name: </h3>
					<img
						src={image || current_image || ""}
						alt=""
						className="w-full bg-gray-500 h-[200px] object-cover"
					/>
				</div>
			</dialog>
		) : null;

	return dialog;
}
