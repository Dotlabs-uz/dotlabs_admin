import axios from "axios";
import { useCookies } from "react-cookie";
import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import ChangeProject from "./ChangeProject";

interface PortfolioItemProps {
    item: {
        image: string;
        title: string;
        description: string;
        _id: string;
        url: string;
    };
    renderHandelFunk:() => void;
}

const PortfolioItem: React.FunctionComponent<PortfolioItemProps> = ({
    item,renderHandelFunk
}) => {
    const [changeProjectHandler, setChangeProjectHandler] = useState(false);
    const [cookies] = useCookies(["token"]);

    const { toast } = useToast();

    const deletePoject = () => {
        try {
            axios.delete(
                process.env.NEXT_PUBLIC_API + `/portfolios/${item._id}`,
                {
                    headers: {
                        Authorization: cookies?.token?.token,
                    },
                }
            )
            .then((res) => {
                if (res.status === 200 || res.status === 201){
                    renderHandelFunk()
                }
            })
            
        } catch (err) {}
    };

    return (
        <div className="border-2 border-white rounded-md shadow-md w-full overflow-hidden">
            {!changeProjectHandler ? (
                <>
                    <div className="w-full h-[250px]">
                        <img
                            src={item.image}
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    <div className="bg-white p-5 flex flex-col gap-3">
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p className="text-sm">{item.description}</p>
                        <button className="bg-[#0000ff10] px-2 py-1 rounded-md text-xs w-fit">
                            {item.url}
                        </button>
                        <div className="mt-2 w-full flex items-center gap-2">
                            <Button onClick={()=> setChangeProjectHandler(true)} className="px-5 py-1 rounded-md text-white w-full">
                                Change
                            </Button>
                            <Button
                                className="px-5 py-1 w-full"
                                variant="destructive"
                                onClick={() => {
                                    toast({
                                        title: "Потвердите действие!",
                                        description: `Удаление проекта ${item.title}`,
                                        action: (
                                            <ToastAction
                                                altText="Goto schedule to undo"
                                                onClick={deletePoject}
                                                className="bg-[red] text-white hover:bg-[#ff3636]"
                                            >
                                                Delete
                                            </ToastAction>
                                        ),
                                    });
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <ChangeProject renderHandelFunk={renderHandelFunk} setChangeProjectHandler={setChangeProjectHandler} item={item}/>
            )}
        </div>
    );
};

export default PortfolioItem;
