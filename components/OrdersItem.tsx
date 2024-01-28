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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { TableCell, TableRow } from "./ui/table";
import { GoPencil } from "react-icons/go";
import moment from"moment";

function OrdersItem({ item, idx }: any) {
    const [cookies] = useCookies(["token"]);
    const [loading, setLoading] = useState(false);

    const date = moment(item.createdAt).subtract(10, 'days').calendar();
    

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
        <>
            <TableRow>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="text-center">{item?.name}</TableCell>
                <TableCell className="text-center">
                    <a href={`tel:+${item?.phone}`}>+{item?.phone}</a>
                </TableCell>
                <TableCell className="text-center">{item?.status}</TableCell>
                <TableCell className="text-center">
                    {date}
                </TableCell>
                <TableCell className="text-center relative">
                    <DropdownMenu>
                        <DropdownMenuTrigger className={"outline-none"}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <GoPencil
                                            size={19}
                                            className="cursor-pointer"
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Add to library</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className={"-translate-y-1/2 p-3 text-sm"}
                        >
                            <form className="flex flex-col gap-3">
                                <textarea
                                    placeholder="Type your message here."
                                    className="border rounded-sm p-2 h-[100px]"
                                ></textarea>
                                <Button className="bg-[#2387f2] hover:bg-[#23ABF2]">
                                    Submit
                                </Button>
                            </form>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                <TableCell className="relative text-end">
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
                </TableCell>
            </TableRow>
            {/* <div
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
            </div> */}
        </>
    );
}

export default OrdersItem;
