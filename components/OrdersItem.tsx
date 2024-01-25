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
                `${process.env.NEXT_PUBLIC_API}/applications/${item?._id}`,
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
            className={`flex items-center justify-between py-3 pr-5 pl-3 border-b border-b-[#cccccc]`}
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
                <DropdownMenu>
                    <DropdownMenuTrigger className={"outline-none"}>
                        <BsThreeDots size={25} className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className={"flex flex-col -ml-16 -mt-11 gap-1"}
                    >
                        <Button
                            onClick={(e: any) => ChangeStatus("inProgress")}
                            disabled={loading}
                            className={"bg-[#2387f2] hover:bg-[#23ABF2]"}
                        >
                            В процессе
                        </Button>
                        <Button
                            onClick={() => ChangeStatus("pending")}
                            disabled={loading}
                            className={"bg-[#2387f2] hover:bg-[#23ABF2]"}
                        >
                            Ждём ответа
                        </Button>
                        <Button
                            onClick={() => ChangeStatus("closed")}
                            disabled={loading}
                            className={"bg-[#2387f2] hover:bg-[#23ABF2]"}
                        >
                            Получили заказ
                        </Button>
                        <Button
                            onClick={() => ChangeStatus("noResponse")}
                            disabled={loading}
                            className={"bg-[#2387f2] hover:bg-[#23ABF2]"}
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
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default OrdersItem;
