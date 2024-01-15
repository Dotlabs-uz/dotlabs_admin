"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie';

type Inputs = {
	username: string;
	password: string;
};

const Login = () => {
	const [loading, setLoading] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	useEffect(() => {
		removeCookie('token')
	}, []);

	


	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setLoading(true);
		try {
			const res = await axios.post(
				process.env.NEXT_PUBLIC_API + "/authentication",
				{ strategy: "local", ...data }
			);

			if (res.status === 201 || res.status === 200) {
                const {data} = res
                const token = {
                    token: data.accessToken,
                    exp: data.authentication.payload.exp
                }

				setLoading(false);
                setCookie('token', token)
                router.push('/home')
			}
		} catch (e) {
			console.log({ e });
			setLoading(false);
		}
	};


	return (
		<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor="username" className="text-[9px] uppercase mb-2">
				ЛОГИН
			</label>
			<input
				id="username"
				className="p-3 rounded-md"
				type="text"
				placeholder="Логин"
				{...register("username", { required: true })}
			/>
			<span className="text-red-500">
				{errors.username && "Заполните это поле"}
			</span>
			<br />
			<label htmlFor="password" className="text-[9px] uppercase mb-2">
				ПАРОЛЬ
			</label>
			<input
				id="password"
				className="p-3 rounded-md"
				type="text"
				placeholder="Пароль"
				{...register("password", { required: true })}
			/>
			<span className="text-red-500">
				{errors.password && "Заполните это поле"}
			</span>
			<br />
			<button
				type="submit"
				className="bg-[#007aff] text-white p-3 rounded-md"
			>
				{loading ? "Loading..." : "Войти"}
			</button>
		</form>
	);
};

export default Login;
