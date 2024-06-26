import React, { ReactNode } from "react";
import { StaticImageData } from "next/image";
import Star from "./Star";

interface CardProps {
  title: string;
  image: StaticImageData;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, image, children }) => {
  const imageUrl = image.src;

  return (
    <div className="flex flex-col gap-0 relative cursor-pointer shadow-xl border boder-2 rounded-b-lg">
      <img
        src={imageUrl}
        alt={title}
        className="object-cover z-0 rounded-t-lg"
      />
        <div className="hidden sm:block absolute top-4 right-6">
          <Star />
        </div>
      <div className="flex flex-col justify-start items-left bg-white p-4 rounded-b-lg">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex flex-row gap-2 items-end">
          <div className="font-inter">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
