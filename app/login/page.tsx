import Login from "@/components/containers/Login";

export default function LoginPage() {
	return (
		<div className="w-full h-screen flex justify-center items-center bg-[#F3F6FE]">
			<div className="w-[400px]">
				<h1 className="font-normal mb-3 text-2xl">Вход в аккаунт</h1>
				<Login/>
			</div>
		</div>
	);
}