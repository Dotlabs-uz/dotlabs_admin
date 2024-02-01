import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiSaveDown2 } from "react-icons/ci";
import { Button } from "../ui/button";

interface ChangeProjectProps {
    setChangeProjectHandler: Dispatch<SetStateAction<boolean>>;
    item: any;
    renderHandelFunk: () => void;
}

interface Inputs {
    title: string;
    url: string;
    image: File;
    description: string;
}

const ChangeProject: React.FunctionComponent<ChangeProjectProps> = ({
    setChangeProjectHandler,
    item,
    renderHandelFunk,
}) => {
    const [cookies] = useCookies(["token"]);
    const [selectedImage, setSelectedImage] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value.length > 0) {
                    if (key === "image") {
                        formData.append(key, value[0]);
                    } else {
                        formData.append(key, value);
                    }
                }
            });

            axios
                .patch(
                    process.env.NEXT_PUBLIC_API +
                        "/portfolios" +
                        `/${item._id}`,
                    formData,
                    {
                        headers: {
                            Authorization: cookies?.token?.token,
                        },
                    }
                )
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        setChangeProjectHandler(false);
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 p-1"
        >
            <div className="flex flex-col gap-1">
                <div className="bg-white h-[220px] rounded-md relative overflow-hidden">
                    {selectedImage ? (
                        <Image
                            src={selectedImage}
                            alt=""
                            width={400}
                            height={400}
                            className="w-full h-full absolute top-0 left-0 z-20"
                        />
                    ) : (
                        <img
                            src={item.image}
                            alt=""
                            width={400}
                            height={400}
                            className="w-full h-full absolute top-0 left-0 z-20"
                        />
                    )}
                    <input
                        {...register("image")}
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
            <div className="flex flex-col gap-2 w-full text-sm">
                <input
                    placeholder="Title"
                    {...register("title")}
                    className="p-1 rounded-md"
                    // defaultValue={item.title}
                />

                <input
                    placeholder="Url to site"
                    {...register("url")}
                    className="p-1 rounded-md"
                    // defaultValue={item.url}
                />

                <textarea
                    {...register("description")}
                    placeholder="Description"
                    className="p-1 rounded-md h-[70px]"
                    // defaultValue={item.description}
                />

                <div className="flex items-center gap-2 w-full">
                    <Button
                        title="send"
                        className="w-full"
                        onClick={() => setChangeProjectHandler(false)}
                    >
                        Назад
                    </Button>
                    <Button
                        title="send"
                        type="submit"
                        className="w-full bg-[#23ABF2] hover:bg-[#5ebef2]"
                    >
                        Изменить
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default ChangeProject;
