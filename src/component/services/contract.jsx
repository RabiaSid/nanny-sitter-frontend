import React, { useState } from 'react'
import { H1, H5, Font1, Font2 } from '@/config/typography'



export default function Contract({ data, list }) {
    const [isShow, setShow] = useState(false)

    return (
        <div className={`pb-[30px] md:pb-[50px] lg:pb-[100px] pt-[30px] md:pt-[50px] lg:pt-[130px] border ${data.bg ? "bg-white" : "bg-[#609FC6]"}`}>
            <div className="container mx-auto ">
                <H1 className={`font-creato mb-8 capitalize text-center ${data.bg ? "text-black" : "text-white"}`}>{data.title}</H1>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 py-[50px]">
                    {list.map((item, index) => (
                        <div key={index} className={`border border-gray-300 flex items-start px-8 py-12 rounded-xl group min-h-[200px] ${data.bg ? "hover:bg-[#F19A7C]" : "hover:bg-[#fff]"}  transition-colors duration-500 ease-in-out`}
                            onMouseEnter={() => {
                                setShow(true)
                            }}
                            onMouseLeave={() => {
                                setShow(false)
                            }}
                        >
                            <div className={`w-[70px] h-[70px]`}>
                                <img src={isShow ? item.img2 : item.img1} alt="Icon" />
                            </div>
                            <div className='ps-3 pt-1'>
                                <Font1 className={`font-montserrat font-semibold text-base ${data.bg ? "group-hover:text-white" : "text-white group-hover:text-black"}`}>{item.title}</Font1>
                                <Font2 className={`font-montserrat text-[#666666] py-2 ${data.bg ? "group-hover:text-white" : "text-white group-hover:text-[#666666]"}`}>{item.description}</Font2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}