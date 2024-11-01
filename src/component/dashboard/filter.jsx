import React from 'react'
import { H1, H6, Font2 } from '@/config/typography'
import IconHeader5 from "@/assets/dashboard/filter/icon-5.png"

export default function Filter() {
    return (
        <div className="py-[10px]">
            <div className="container mx-auto ">
                <div className="flex justify-between items-center py-6 px-8 rounded-md border">
                    <div className=" ">
                        <Font2 className="font-montserrat text-[#000] ">Showing 300+ Profiles: All</Font2>
                    </div>
                    <div className='flex items-center'>
                        <button className=" border-none hover:text-white ">
                        <img src={IconHeader5} width="22px" height="22px" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


