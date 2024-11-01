import React from "react";
import { H3 } from "@/config/typography";
import { Font2 } from "@/config/typography";

export default function Cta({ data }) {
  return (
    <div
      className="px-5 md:px-0 py-[30px] md:py-[50px] mt-20"
      style={{
        background: `url(${data.bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 ">
          <div className="col-span-1 ">
            <img src={data.Img} className="max-h-[500px]" />
          </div>
          <div className="col-span-1">
            <H3 className="text-[#fff] capitalize mb-2 ">{data.title}</H3>
            <Font2 className="text-[#fff] text-opacity-80">
              {data.content}
            </Font2>
            <Font2 className="text-[#fff] text-opacity-80 underline decoration-white mt-3">
              {data.linkContent}
            </Font2>
          </div>
        </div>
      </div>
    </div>
  );
}
