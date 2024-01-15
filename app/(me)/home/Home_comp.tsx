"use client";
import OrdersItem from "@/components/OrdersItem";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import io from "socket.io-client";

interface Home_compProps {}

const Home_comp: React.FC<Home_compProps> = () => {
    const [orders, setOrders] = useState([]);
    const [sourceArchiveOrders, setSourceArchiveOrders] = useState([]);
    const [archiveOrders, setArchiveOrders] = useState([]);
    const [heanleChangeStatus, setHeanleChangeStatus] = useState("all");

    const [cookies, setCookie, removeCookie] = useCookies(['token']);


    const socket = io("https://dotlabs.onrender.com");

    const pathname = usePathname();

    useEffect(() => {
        if (!socket.connected) {
            socket.on("connect", () => {
                console.log({ socket });
            });

            socket.emit("getApplications");
        }

        socket.on("get", (data: any) => {
            let orderArr: any = [];
            let archiveArr: any = [];

            data.filter((item: any) => {
                if (
                    item.status === "inProgress" ||
                    item.status === "new" ||
                    item.status === "pending"
                ) {
                    if (item.status === "new") {
                        orderArr.unshift(item);
                    } else {
                        orderArr.push(item);
                    }
                } else archiveArr.push(item);
            });

            setOrders(orderArr);
            setArchiveOrders(archiveArr);
            setSourceArchiveOrders(archiveArr);
        });
    }, []);

    useEffect(() => {
        if (heanleChangeStatus !== "all") {
            const arr = sourceArchiveOrders.filter((item: any) => {
                if (item.status === heanleChangeStatus) {
                    return item;
                }
            });

            setArchiveOrders(arr);
        } else {
            setArchiveOrders(sourceArchiveOrders);
        }
    }, [heanleChangeStatus]);

    return (
        <>
            {orders[0] || archiveOrders[0] ? (
                <div className="overflow-x-auto shadow-md sm:rounded-lg min-h-[80vh] relative pb-[80px]">
                    {pathname === "/home" ? (
                        <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            {orders.map((item: any, key: any) => (
                                <OrdersItem key={key} item={item} idx={key} />
                            ))}

                            {orders.length === 0 && (
                                <div className="w-full h-[10vh] flex items-center justify-center">
                                    Ничего не найдено
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="ml-5 my-3">
                                <Select
                                    onValueChange={(e: any) =>
                                        setHeanleChangeStatus(e)
                                    }
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="declined">
                                            Отказы
                                        </SelectItem>
                                        <SelectItem value="noResponse">
                                            Не ответили
                                        </SelectItem>
                                        <SelectItem value="closed">
                                            Полученные заказы
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                {archiveOrders.map((item: any, key: any) => (
                                    <OrdersItem
                                        key={key}
                                        item={item}
                                        idx={key}
                                    />
                                ))}

                                {archiveOrders.length === 0 && (
                                    <div className="w-full h-[10vh] flex items-center justify-center">
                                        Ничего не найдено
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <Skeleton className="h-[80vh] w-full rounded-lg shadow-lg">
                    <div
                        className={
                            "flex items-center justify-between py-3 pr-5 pl-3 border-b border-b-[#cccccc]"
                        }
                    >
                        <Skeleton className="flex items-start gap-3">
                            <Skeleton className="bg-[gray] h-[16px] w-[5px]" />
                            <div>
                                <Skeleton className="bg-[gray] w-[100px] p-1 rounded-full" />
                                <Skeleton className="bg-[gray] w-[50px] p-1 rounded-full mt-2" />
                            </div>
                        </Skeleton>

                        <Skeleton className="w-[50px] p-1 rounded-full bg-[gray]" />
                        <div className="flex items-center gap-1">
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                        </div>
                    </div>
                    <div
                        className={
                            "flex items-center justify-between py-3 pr-5 pl-3 border-b border-b-[#cccccc]"
                        }
                    >
                        <Skeleton className="flex items-start gap-3">
                            <Skeleton className="bg-[gray] h-[16px] w-[5px]" />
                            <div>
                                <Skeleton className="bg-[gray] w-[100px] p-1 rounded-full" />
                                <Skeleton className="bg-[gray] w-[50px] p-1 rounded-full mt-2" />
                            </div>
                        </Skeleton>

                        <Skeleton className="w-[50px] p-1 rounded-full bg-[gray]" />
                        <div className="flex items-center gap-1">
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                        </div>
                    </div>
                    <div
                        className={
                            "flex items-center justify-between py-3 pr-5 pl-3 border-b border-b-[#cccccc]"
                        }
                    >
                        <Skeleton className="flex items-start gap-3">
                            <Skeleton className="bg-[gray] h-[16px] w-[5px]" />
                            <div>
                                <Skeleton className="bg-[gray] w-[100px] p-1 rounded-full" />
                                <Skeleton className="bg-[gray] w-[50px] p-1 rounded-full mt-2" />
                            </div>
                        </Skeleton>

                        <Skeleton className="w-[50px] p-1 rounded-full bg-[gray]" />
                        <div className="flex items-center gap-1">
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                        </div>
                    </div>
                    <div
                        className={
                            "flex items-center justify-between py-3 pr-5 pl-3 border-b border-b-[#cccccc]"
                        }
                    >
                        <Skeleton className="flex items-start gap-3">
                            <Skeleton className="bg-[gray] h-[16px] w-[5px]" />
                            <div>
                                <Skeleton className="bg-[gray] w-[100px] p-1 rounded-full" />
                                <Skeleton className="bg-[gray] w-[50px] p-1 rounded-full mt-2" />
                            </div>
                        </Skeleton>

                        <Skeleton className="w-[50px] p-1 rounded-full bg-[gray]" />
                        <div className="flex items-center gap-1">
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                        </div>
                    </div>
                    <div
                        className={
                            "flex items-center justify-between py-3 pr-5 pl-3 border-b border-b-[#cccccc]"
                        }
                    >
                        <Skeleton className="flex items-start gap-3">
                            <Skeleton className="bg-[gray] h-[16px] w-[5px]" />
                            <div>
                                <Skeleton className="bg-[gray] w-[100px] p-1 rounded-full" />
                                <Skeleton className="bg-[gray] w-[50px] p-1 rounded-full mt-2" />
                            </div>
                        </Skeleton>

                        <Skeleton className="w-[50px] p-1 rounded-full bg-[gray]" />
                        <div className="flex items-center gap-1">
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                        </div>
                    </div>
                    <div
                        className={
                            "flex items-center justify-between py-3 pr-5 pl-3 border-b border-b-[#cccccc]"
                        }
                    >
                        <Skeleton className="flex items-start gap-3">
                            <Skeleton className="bg-[gray] h-[16px] w-[5px]" />
                            <div>
                                <Skeleton className="bg-[gray] w-[100px] p-1 rounded-full" />
                                <Skeleton className="bg-[gray] w-[50px] p-1 rounded-full mt-2" />
                            </div>
                        </Skeleton>

                        <Skeleton className="w-[50px] p-1 rounded-full bg-[gray]" />
                        <div className="flex items-center gap-1">
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                        </div>
                    </div>
                    <div
                        className={
                            "flex items-center justify-between py-3 pr-5 pl-3 border-b border-b-[#cccccc]"
                        }
                    >
                        <Skeleton className="flex items-start gap-3">
                            <Skeleton className="bg-[gray] h-[16px] w-[5px]" />
                            <div>
                                <Skeleton className="bg-[gray] w-[100px] p-1 rounded-full" />
                                <Skeleton className="bg-[gray] w-[50px] p-1 rounded-full mt-2" />
                            </div>
                        </Skeleton>

                        <Skeleton className="w-[50px] p-1 rounded-full bg-[gray]" />
                        <div className="flex items-center gap-1">
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                        </div>
                    </div>
                    <div
                        className={
                            "flex items-center justify-between py-3 pr-5 pl-3 border-b border-b-[#cccccc]"
                        }
                    >
                        <Skeleton className="flex items-start gap-3">
                            <Skeleton className="bg-[gray] h-[16px] w-[5px]" />
                            <div>
                                <Skeleton className="bg-[gray] w-[100px] p-1 rounded-full" />
                                <Skeleton className="bg-[gray] w-[50px] p-1 rounded-full mt-2" />
                            </div>
                        </Skeleton>

                        <Skeleton className="w-[50px] p-1 rounded-full bg-[gray]" />
                        <div className="flex items-center gap-1">
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                            <Skeleton className="p-1 rounded-full bg-[gray]" />
                        </div>
                    </div>
                </Skeleton>
            )}
        </>
    );
};

export default Home_comp;
