"use client";

import { VscAdd } from "react-icons/vsc";
import AddProjectModal from "@/components/portfolioChild/AddProjectModal";
import { useEffect, useState } from "react";
import axios from "axios";
import PortfolioItem from "@/components/portfolioChild/PortfolioItem";
import { Toaster } from "@/components/ui/toaster";
import Skleton from "@/components/Skeleton";
import { Button } from "@/components/ui/button";

function Portfolio() {
    const [portfoliosArr, setPortfoliosArr] = useState<any>(null);
    const [renderHandel, setRenderHandel] = useState<boolean>(false);

    const [modalHandel, setModalHandel] = useState<any>(false);

    function renderHandelFunk() {
        setRenderHandel(!renderHandel);
    }

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API}/portfolios`).then((res) => {
            if (res.status === 200 || res.status === 201) {
                setPortfoliosArr(res.data.data);
            }
        });
    }, [renderHandel]);

    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-3xl">Portfolio</h2>
                <Button
                    className="p-2 rounded-full bg-white hover:bg-white drop-shadow-md"
                    onClick={() => setModalHandel(true)}
                >
                    <VscAdd size={25} color="#23ABF2" />
                </Button>
            </div>

            {portfoliosArr ? (
                <div>
                    <section className="grid grid-cols-3 gap-4">
                        {portfoliosArr !== null
                            ? portfoliosArr.map((item: any, index: number) => (
                                  <PortfolioItem
                                      renderHandelFunk={renderHandelFunk}
                                      key={index}
                                      item={item}
                                  />
                              ))
                            : null}
                    </section>
                    {modalHandel && (
                        <AddProjectModal
                            renderHandelFunk={renderHandelFunk}
                            setModalHandel={setModalHandel}
                        />
                    )}
                    <Toaster />
                </div>
            ) : (
                <Skleton />
            )}
        </>
    );
}

export default Portfolio;
