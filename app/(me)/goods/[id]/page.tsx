import Product from "@/components/containers/Product";
import axios from "axios";

export default async function Home({params}:any) {
	const { id } = params
	const product = await axios.get(process.env.NEXT_PUBLIC_API + "/products/" + id)
	const categories = await axios.get(process.env.NEXT_PUBLIC_API + "/categories")
	
	return (
		<div className="flex flex-col gap-5">
			<Product {...product.data} categories={categories.data}/>
		</div>
	);
}
