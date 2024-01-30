import axios from "axios";
import { useCookies } from "react-cookie";

interface PortfolioItemProps {
    item: {
        image: string;
        title: string;
        description: string;
        _id: string;
    };
}

const PortfolioItem: React.FunctionComponent<PortfolioItemProps> = ({
    item,
}) => {
    const [cookies] = useCookies(["token"]);

    const deletePoject = () => {
        try {
            axios.delete(
                process.env.NEXT_PUBLIC_API + `/portfolios/${item._id}`,
                {
                    headers: {
                        Authorization: cookies?.token?.token,
                    },
                }
            );
        } catch (err) {}
    };

    return (
        <div className="border-2 border-white rounded-md shadow-md w-full overflow-hidden">
            <div className="w-full h-[250px]">
                <img src={item.image} alt="" className="w-full h-full" />
            </div>
            <div className="bg-white p-5 flex flex-col gap-3">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm">{item.description}</p>
                <button className="bg-[#0000ff10] px-2 py-1 rounded-md text-xs w-fit">
                    Web site
                </button>
                <div className="mt-2 w-full flex items-center gap-2">
                    <button className="bg-[#23ABF2] px-5 py-1 rounded-md text-white w-full">
                        Change
                    </button>
                    <button
                        onClick={deletePoject}
                        className="bg-[red] px-5 py-1 rounded-md text-white w-full"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioItem;
