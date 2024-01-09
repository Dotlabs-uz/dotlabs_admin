import React from "react";

function OrdersItem({ number }: any) {
    return (
        <div className="flex items-center justify-between py-3 pr-5 pl-3 border-b border-b-[#cccccc]">
            <div className="flex items-start gap-3">
                <span>{number}.</span>
                <div>
                    <p className="font-medium">Сиддиков Мирсаид</p>
                    <p className="text-black mt-1">+998 (90) 222-74-64</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button className="px-3 py-1 border border-black rounded-md text-black font-semibold hover:bg-black hover:text-white transition ease-linear">
                    Посмотренно
                </button>
                <button className="px-3 py-1 border-2 border-blue-700 rounded-md text-blue-700 font-semibold hover:bg-blue-700 hover:text-white transition ease-linear">
                    Позвонил
                </button>
                <button className="px-3 py-1 border-2 border-red-700 rounded-md text-red-700 font-semibold hover:bg-red-700 hover:text-white transition ease-linear">
                    Отчистить
                </button>
            </div>
        </div>
    );
}

export default OrdersItem;
