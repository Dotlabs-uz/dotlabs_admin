import OrdersItem from "@/components/OrdersItem";
import { FaRegEye } from "react-icons/fa";
import { applications, socketGet } from "@/app/lib/soket";



export default async function Home() {

    // console.log(applications);
    socketGet()   

    return (
        <div>
            <h2 className="text-3xl mb-5">Orders list</h2>
            <div className="overflow-x-auto shadow-md sm:rounded-lg min-h-[80vh] relative pb-[80px]">
                <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    {[0, 1, 2, 3, 4, 5].map((item) => (
                        <OrdersItem key={item} number={item + 1} />
                    ))}
                </div>
            </div>
        </div>
    );
}
