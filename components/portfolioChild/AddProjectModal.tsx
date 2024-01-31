import Image from "next/image";
import React, { Dispatch, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";

interface AddProjectModalProps {
    setModalHandel: Dispatch<boolean>;
    renderHandelFunk: () => void;
}

interface Inputs {
    title: string;
    url: string;
    image: File;
    description: string;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
    setModalHandel,
    renderHandelFunk,
}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [cookies] = useCookies(["token"]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === "image") {
                    formData.append(key, value[0]);
                } else {
                    formData.append(key, value);
                }
            });

            axios
                .post(process.env.NEXT_PUBLIC_API + "/portfolios", formData, {
                    headers: {
                        Authorization: cookies?.token?.token,
                    },
                })
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        setModalHandel(false);
                        renderHandelFunk();
                    }
                });
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="w-full h-screen absolute top-0 left-0 bg-[#00000036] backdrop-blur-md">
            <div className="bg-[#F3F6FD] p-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md">
                <IoMdClose
                    size={25}
                    title="close"
                    className="absolute top-3 right-3 cursor-pointer"
                    onClick={() => setModalHandel(false)}
                />
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-10">
                    <div className="flex flex-col gap-5">
                        <div className="bg-white h-[270px] w-[450px] rounded-md relative overflow-hidden">
                            {selectedImage ? (
                                <Image
                                    src={selectedImage}
                                    alt=""
                                    width={400}
                                    height={400}
                                    className="w-full h-full absolute top-0 left-0 z-20"
                                />
                            ) : null}
                            <input
                                {...register("image", { required: true })}
                                type="file"
                                className="w-full h-full opacity-0 z-20 absolute cursor-pointer"
                                onChange={handleImageChange}
                            />
                            <CiSaveDown2
                                size={50}
                                color="#23ABF2"
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-[500px]">
                        <input
                            placeholder="Title"
                            {...register("title", { required: true })}
                            className="p-2 rounded-md"
                        />

                        <input
                            placeholder="Url to site"
                            {...register("url", { required: true })}
                            className="p-2 rounded-md"
                        />

                        <textarea
                            {...register("description", { required: true })}
                            placeholder="Description"
                            className="p-2 rounded-md h-[150px]"
                        />

                        <Button
                            title="send"
                            type="submit"
                            className="bg-[#23ABF2] hover:bg-[#5ebef2]"
                        >
                            Добавить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectModal;
