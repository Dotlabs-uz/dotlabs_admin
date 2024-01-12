"use client";
import OrdersItem from "@/components/OrdersItem";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import io from "socket.io-client";

interface Home_compProps {}

const Home_comp: React.FC<Home_compProps> = () => {
    const [orders, setOrders] = useState([]);
    const [archiveOrders, setArchiveOrders] = useState([]);
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
                if (item.status !== "deleted") {
                    orderArr.push(item);
                } else archiveArr.push(item);
            });

            setOrders(orderArr);
            setArchiveOrders(archiveArr);
        });
    }, []);

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg min-h-[80vh] relative pb-[80px]">
                {pathname === "/home" ? (
                    <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        {orders.map((item, key) => (
                            <OrdersItem key={key} item={item} idx={key} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        {archiveOrders.map((item, key) => (
                            <OrdersItem key={key} item={item} idx={key} />
                        ))}
                    </div>
                )}
        </div>
    );
};

export default Home_comp;
