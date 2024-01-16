"use client";
import OrdersItem from "@/components/OrdersItem";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Skleton from "@/components/Skeleton";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

interface Archive_compProps {}

const Archive_comp: React.FC<Archive_compProps> = () => {
    const [sourceArchiveOrders, setSourceArchiveOrders] = useState([]);
    const [archiveOrders, setArchiveOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [heanleChangeStatus, setHeanleChangeStatus] = useState("all");

    const socket = io("https://dotlabs.onrender.com");

    useEffect(() => {
        if (!socket.connected) {
            socket.on("connect", () => {
                console.log({ socket });
            });

            socket.emit("getApplications");
        }

        socket.on("get", (data: any) => {
            let archiveArr: any = [];

            data.filter((item: any) => {
                if (
                    item.status === "declined" ||
                    item.status === "noResponse"
                ) {
                    archiveArr.unshift(item);
                }
            });

            setSourceArchiveOrders(archiveArr);
            setArchiveOrders(archiveArr);
            setLoading(false);
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
            {!loading ? (
                <div className="overflow-x-auto shadow-md sm:rounded-lg min-h-[80vh] relative pb-[80px]">
                    <div className="ml-5 my-3">
                        <Select
                            onValueChange={(e: any) => setHeanleChangeStatus(e)}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="declined">Отказы</SelectItem>
                                <SelectItem value="noResponse">
                                    Не ответили
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        {archiveOrders.map((item: any, key: any) => (
                            <OrdersItem key={key} item={item} idx={key} />
                        ))}

                        {archiveOrders.length === 0 && (
                            <div className="w-full h-[10vh] flex items-center justify-center">
                                Ничего не найдено
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Skleton/>
            )}
        </>
    );
};

export default Archive_comp;
