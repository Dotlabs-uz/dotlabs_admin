import React from "react";

interface InputProps {
	placeholder?: string;
	type?: string;
	rules: any
	value?: string | number
	label: string
}

const Input: React.FC<InputProps> = ({
	placeholder,
	type = "text",
	rules,
	value="",
	label
}) => {
	return (
		<>
			<label htmlFor={label}>{label}</label>
			<input {...rules} id={label} defaultValue={value} className="w-full font-normal border-2 rounded-md p-3" type={type} placeholder={placeholder}/>
		</>
	);
};

export default Input;
