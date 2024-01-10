"use client";
import OrdersItem from "@/components/OrdersItem";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

interface Home_compProps {}

const Home_comp: React.FC<Home_compProps> = () => {
    const [orders, setOrders] = useState([])
	const socket = io("https://dotlabs.onrender.com");

	useEffect(() => {
        if (!socket.connected) {
            socket.on("connect", () => {            
                console.log({ socket });
            });
    
            socket.emit("getApplications")    
        }
        
        socket.on("get", (data: any) => {
			setOrders(data)
		});

	}, []);

    console.log(orders.length);
    
	return (
		<div className="overflow-x-auto shadow-md sm:rounded-lg min-h-[80vh] relative pb-[80px]">
			<div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				{orders.map((item, key) => (
					<OrdersItem key={key} item={item} idx={key} />
				))}
			</div>
		</div>
	);
};

export default Home_comp;
