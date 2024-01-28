"use client";
import OrdersItem from "@/components/OrdersItem";
import Skleton from "@/components/Skeleton";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Application_compProps {}

const Application_comp: React.FC<Application_compProps> = () => {
    const [sourceArchiveOrders, setSourceArchiveOrders] = useState([]);
    const [archiveOrders, setArchiveOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [heanleChangeStatus, setHeanleChangeStatus] = useState("new");

    const socket = io(`${process.env.NEXT_PUBLIC_API}`);

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
                archiveArr.unshift(item);
            });

            setSourceArchiveOrders(archiveArr);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        console.log(sourceArchiveOrders);

        const arr = sourceArchiveOrders.filter((item: any) => {
            if (item.status === heanleChangeStatus) {
                return item;
            }
        });

        setArchiveOrders(arr);
    }, [heanleChangeStatus, sourceArchiveOrders]);

    return (
        <>
            {!loading ? (
                <>
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-fit mb-3 text-sm bg-white">
                        <button
                            onClick={() => setHeanleChangeStatus("new")}
                            className={`${
                                heanleChangeStatus === "new"
                                    ? "bg-[#23ABF2] text-white"
                                    : null
                            } hover:bg-[#23ABF2] hover:text-white transition-all py-[6px] px-6 border-r border-gray-300`}
                        >
                            Новые
                        </button>
                        <button
                            onClick={() => setHeanleChangeStatus("inProgress")}
                            className={`${
                                heanleChangeStatus === "inProgress"
                                    ? "bg-[#23ABF2] text-white"
                                    : null
                            } hover:bg-[#23ABF2] hover:text-white transition-all py-[6px] px-6 border-r border-gray-300`}
                        >
                            В процессе
                        </button>
                        <button
                            onClick={() => setHeanleChangeStatus("pending")}
                            className={`${
                                heanleChangeStatus === "pending"
                                    ? "bg-[#23ABF2] text-white"
                                    : null
                            } hover:bg-[#23ABF2] hover:text-white transition-all py-[6px] px-6 border-r border-gray-300`}
                        >
                            Ожидающие
                        </button>
                        <button
                            onClick={() => setHeanleChangeStatus("noResponse")}
                            className={`${
                                heanleChangeStatus === "noResponse"
                                    ? "bg-[#23ABF2] text-white"
                                    : null
                            } hover:bg-[#23ABF2] hover:text-white transition-all py-[6px] px-6 border-r border-gray-300`}
                        >
                            Не ответили
                        </button>
                        <button
                            onClick={() => setHeanleChangeStatus("closed")}
                            className={`${
                                heanleChangeStatus === "closed"
                                    ? "bg-[#23ABF2] text-white"
                                    : null
                            } hover:bg-[#23ABF2] hover:text-white transition-all py-[6px] px-6 border-r border-gray-300`}
                        >
                            Закрытые
                        </button>
                        <button
                            onClick={() => setHeanleChangeStatus("declined")}
                            className={`${
                                heanleChangeStatus === "declined"
                                    ? "bg-[#23ABF2] text-white"
                                    : null
                            } hover:bg-[#23ABF2] hover:text-white transition-all py-[6px] px-6`}
                        >
                            Отказы
                        </button>
                    </div>
                    <div className="overflow-x-auto shadow-md sm:rounded-lg min-h-[80vh] relative pb-[80px]">
                        {/* <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            {archiveOrders.map((item: any, key: any) => (
                                <OrdersItem key={key} item={item} idx={key} />
                            ))}

                            {archiveOrders.length === 0 && (
                                <div className="w-full h-[10vh] flex items-center justify-center">
                                    Ничего не найдено
                                </div>
                            )}
                        </div> */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        №
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Имя
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Номер
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Статус
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Дата
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Описание
                                    </TableHead>
                                    <TableHead className="text-end">
                                        Изменение
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {archiveOrders.map((item: any, key: any) => (
                                    <OrdersItem
                                        key={key}
                                        item={item}
                                        idx={key}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                        {archiveOrders.length === 0 && (
                            <div className="w-full flex items-center justify-center text-sm mt-5">
                                Ничего не найдено {":("}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <Skleton />
            )}
        </>
    );
};

export default Application_comp;
