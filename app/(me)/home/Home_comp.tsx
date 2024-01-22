"use client";
import OrdersItem from "@/components/OrdersItem";
import Skleton from "@/components/Skeleton";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

interface Home_compProps {}

const Home_comp: React.FC<Home_compProps> = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    const socket = io(`${process.env.NEXT_PUBLIC_API}`);

    useEffect(() => {
        if (!socket.connected) {
            socket.on("connect", () => {
                console.log({ socket });
            });

            socket.emit("getApplications");
        }

        socket.on("get", (data: any) => {
            let orderArr: any = [];

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
                }
            });
            setOrders(orderArr);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {!loading ? (
                <div className="overflow-x-auto shadow-md sm:rounded-lg min-h-[80vh] relative pb-[80px]">
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
                </div>
            ) : (
                <Skleton/>
            )}
        </>
    );
};

export default Home_comp;
