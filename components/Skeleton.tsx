import React from "react";
import { Skeleton } from "./ui/skeleton";

function Skleton() {
    return (
        <Skeleton className="h-[80vh] w-full rounded-lg shadow-lg">
            {[1, 2, 3, 4, 5, 7, 8, 9, 10].map((item) => (
                <div
                    key={item}
                    className={
                        "flex items-center justify-between py-3 pr-5 pl-3 border-b border-b-[#cccccc]"
                    }
                >
                    <Skeleton className="flex items-start gap-3">
                        <Skeleton className="bg-[gray] h-[16px] w-[5px]" />
                        <div>
                            <Skeleton className="bg-[gray] w-[100px] p-1 rounded-full" />
                            <Skeleton className="bg-[gray] w-[50px] p-1 rounded-full mt-2" />
                        </div>
                    </Skeleton>

                    <Skeleton className="w-[50px] p-1 rounded-full bg-[gray]" />
                    <div className="flex items-center gap-1">
                        <Skeleton className="p-1 rounded-full bg-[gray]" />
                        <Skeleton className="p-1 rounded-full bg-[gray]" />
                        <Skeleton className="p-1 rounded-full bg-[gray]" />
                    </div>
                </div>
            ))}
        </Skeleton>
    );
}

export default Skleton;
