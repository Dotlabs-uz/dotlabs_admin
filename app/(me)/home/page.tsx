import OrdersItem from "@/components/OrdersItem";
import { FaRegEye } from "react-icons/fa";
import Home_comp from "./Home_comp";


export default async function Home() {

    return (
        <div>
            <h2 className="text-3xl mb-5">Orders list</h2>
            <Home_comp/>
        </div>
    );
}
