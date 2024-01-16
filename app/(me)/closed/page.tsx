import React from "react";
import Closed_comp from "./Closed_comp";

function ClosedOrders() {
    return (
        <div>
            <h2 className="text-3xl mb-5">Полученные заказы</h2>
			<Closed_comp />
        </div>
    );
}

export default ClosedOrders;
