import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function OrdersItem({ item, idx }: any) {
    const [cookies] = useCookies(["token"]);
    const [loading, setLoading] = useState(false);

    function ChangeStatus(stat: string) {
        setLoading(true);

        axios
            .patch(
                `https://dotlabs.onrender.com/applications/${item?._id}`,
                {
                    status: stat,
                },
                {
                    headers: {
                        Authorization: cookies.token.token,
                    },
                }
            )
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setLoading(false);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div
            className={`flex items-center justify-between py-3 pr-5 pl-3 border-b border-b-[#cccccc] ${
                item?.status === "new"
                    ? "bg-[#F7D17C] text-black"
                    : item?.status === "inProgress"
                    ? "bg-[#F98080] text-black"
                    : item?.status === "pending"
                    ? "bg-[#BB79F8] text-black"
                    : "text-black"
            }`}
        >
            <div className="flex items-start gap-3">
                <span>{idx + 1}.</span>
                <div>
                    <p className="font-medium">{item?.name}</p>
                    <a href={`tel:+${item?.phone}`} className="mt-1">
                        +{item?.phone}
                    </a>
                </div>
            </div>

            <p>{item?.status}</p>

            <div className="relative">
                {item?.status === "new" ||
                item?.status === "inProgress" ||
                item?.status === "pending" ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className={"outline-none"}>
                            <BsThreeDots size={25} className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className={"flex flex-col -ml-16 -mt-11 gap-1"}
                        >
                            {item?.status === "new" ? (
                                <Button
                                    onClick={(e:any) => ChangeStatus("inProgress")}
                                    variant={"secondary"}
                                    disabled={loading}
                                >
                                    В процессе
                                </Button>
                            ) : item?.status === "inProgress" ? (
                                <>
                                    <Button
                                        onClick={() => ChangeStatus("pending")}
                                        disabled={loading}
                                    >
                                        Ждём ответа
                                    </Button>
                                    <Button
                                        onClick={() => ChangeStatus("closed")}
                                        disabled={loading}
                                    >
                                        Получили заказ
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            ChangeStatus("noResponse")
                                        }
                                        disabled={loading}
                                    >
                                        Не ответил
                                    </Button>
                                    <Button
                                        onClick={() => ChangeStatus("declined")}
                                        variant={"destructive"}
                                        disabled={loading}
                                    >
                                        Отказ
                                    </Button>
                                </>
                            ) : item?.status === "pending" ? (
                                <>
                                    <Button
                                        onClick={() => ChangeStatus("closed")}
                                        disabled={loading}
                                    >
                                        Получили заказ
                                    </Button>
                                    <Button
                                        disabled={loading}
                                        onClick={() =>
                                            ChangeStatus("noResponse")
                                        }
                                    >
                                        Не ответил
                                    </Button>
                                    <Button
                                        disabled={loading}
                                        onClick={() => ChangeStatus("declined")}
                                        variant={"destructive"}
                                    >
                                        Отказ
                                    </Button>
                                </>
                            ) : null}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : null}
            </div>
        </div>
    );
}

export default OrdersItem;
