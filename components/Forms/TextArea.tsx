import React from "react";

interface TextAreaProps {
    placeholder?: string
	rules: any
	value?: string
}

const TextArea: React.FC<TextAreaProps> = ({placeholder = "", rules, value}) => {
	return (
		<textarea
			className="w-full border-2 rounded-md p-3"
			placeholder={placeholder}
			defaultValue={value}
			{...rules}
		></textarea>
	);
};

export default TextArea;
