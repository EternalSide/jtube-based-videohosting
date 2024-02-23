"use client";
import Image, {ImageProps as NextImageProps} from "next/image";
import React from "react";

type OmitWidthout<T> = Omit<T, "width" | "height" | "fill">;

interface NextImage extends OmitWidthout<NextImageProps> {
	width: string;
	height: string;
	containerClassNames?: string;
}

const NextImage = React.forwardRef<HTMLDivElement, NextImage>(
	({width, height, containerClassNames, ...ImageProps}, ref) => {
		return (
			<div
				ref={ref}
				className={`relative ${width} ${height} ${containerClassNames}`}
			>
				<Image
					{...ImageProps}
					fill
				/>
			</div>
		);
	}
);

NextImage.displayName = "Image";

export default NextImage;
