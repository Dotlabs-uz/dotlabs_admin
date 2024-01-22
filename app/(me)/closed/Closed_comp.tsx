"use client";
import OrdersItem from "@/components/OrdersItem";
import Skleton from "@/components/Skeleton";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

interface Closed_compProps {}

const Closed_comp: React.FC<Closed_compProps> = () => {
    const [closedOrders, setClosedOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const socket = io(`${process.env.NEXT_PUBLIC_API}`);


    useEffect(() => {
        if (!socket.connected) {
            socket.on("connect", () => {
                console.log({ socket });
            });

            socket.emit("getApplications");
        }

        socket.on("get", (data: any) => {
            let closedArr: any = [];

            data.filter((item: any) => {
                if (item.status === "closed") {
                    closedArr.push(item);
                }
            });
            setClosedOrders(closedArr);
            setLoading(false)
        });
    }, []);

    return (
        <>
            {!loading ? (
                <div className="overflow-x-auto shadow-md sm:rounded-lg min-h-[80vh] relative pb-[80px]">
                    <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        {closedOrders.map((item: any, key: any) => (
                            <OrdersItem key={key} item={item} idx={key} />
                        ))}

                        {closedOrders.length === 0 && (
                            <div className="w-full h-[10vh] flex items-center justify-center">
                                Ничего не найдено
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Skleton />
            )}
        </>
    );
};

export default Closed_comp;
