"use client"

import { VscAdd } from "react-icons/vsc";
import AddProjectModal from "@/components/portfolioChild/AddProjectModal";
import { useEffect, useState } from "react";
import axios from "axios";
import PortfolioItem from "@/components/portfolioChild/PortfolioItem";
import { Toaster } from "@/components/ui/toaster";

function Portfolio() {
    const [portfoliosArr, setPortfoliosArr] = useState<any>(null);

    const [modalHandel, setModalHandel] = useState<any>(false);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API}/portfolios`).then((res) => {
            if (res.status === 200 || res.status === 201) {
                setPortfoliosArr(res.data.data);
            }
        });
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-3xl">Portfolio</h2>
                <button className="p-2 rounded-full bg-white drop-shadow-md" onClick={()=>setModalHandel(true)}>
                    <VscAdd size={25} color="#23ABF2" />
                </button>
            </div>
            <section className="grid grid-cols-3 gap-4">
                {portfoliosArr !== null
                    ? portfoliosArr.map((item: any, index: number) => (
                          <PortfolioItem key={index} item={item}/>
                      ))
                    : null}

                {/* <div className="border-2 border-white rounded-md shadow-md">
                    <div className="w-[350px] h-[200px]"></div>
                    <div className="bg-white p-5 flex flex-col gap-3">
                        <h2 className="text-lg font-semibold">
                            Polyglot School
                        </h2>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Perspiciatis praesentium sunt doloribus dicta
                            beatae magni quibusdam vero maiores, fuga reiciendis
                            quod sint tempora assumenda quas consequuntur, et
                            debitis? Aliquam, ab!
                        </p>
                        <button className="bg-[#0000ff10] px-2 py-1 rounded-md text-xs w-fit">
                            Web site
                        </button>
                        <div className="mt-2 w-full flex items-center gap-2">
                            <button className="bg-[#23ABF2] px-5 py-1 rounded-md text-white w-full">
                                Change
                            </button>
                            <button className="bg-[red] px-5 py-1 rounded-md text-white w-full">
                                Delete
                            </button>
                        </div>
                    </div>
                </div> */}
            </section>
            {
                modalHandel && <AddProjectModal setModalHandel={setModalHandel}/>
            }
            <Toaster />
        </div>
    );
}

export default Portfolio;
