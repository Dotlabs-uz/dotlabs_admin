import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

interface FileUploadProps {
	handleImageChange: any;
	image: any;
	rules: any;
	currentImage: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
	handleImageChange,
	image,
	rules,
	currentImage,
}) => {
	return (
		<>
			<div className="flex items-center justify-center w-full relative">
				<label
					htmlFor="dropzone-file"
					style={
						((image || currentImage) && {
							backgroundImage: `url(${image || currentImage}`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							backgroundPosition: "center",
						}) ||
						{}
					}
					className="customAfter flex flex-col items-center justify-center w-full h-[500px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
				>
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<IoCloudUploadOutline size="44" />
						<p className="mb-2 text-sm text-black">
							<span className="font-semibold">
								Click to upload
							</span>{" "}
							or drag and drop
						</p>
						<p className="text-xs text-black">
							SVG, PNG, JPG or GIF (MAX. 800x400px)
						</p>
					</div>
				</label>
				<input
					className="hidden"
					type="file"
					id="dropzone-file"
					onInput={handleImageChange}
					{...rules}
					multiple
				/>
			</div>
		</>
	);
};

export default FileUpload;
