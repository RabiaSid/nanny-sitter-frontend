import React, { useState } from 'react'
import { H1, H6, Font1 } from '@/config/typography'

export default function Alert() {
    const [isShow, setIsShow] = useState(true)

    const handleClick = () => {
        setIsShow(!isShow)
    }

    return (
        <>
            {isShow ?
                <div className="py-[10px]">
                    <div className="container mx-auto ">
                        <div className="flex justify-between items-center bg-[#FF6F61] py-6 px-8 rounded-md">
                            <div className=" ">
                                <Font1 className="font-montserrat text-[#fff] ">How often do you need a nanny?</Font1>
                            </div>
                            <div className='flex items-center'>
                                <button className="px-10 py-2 border border-gray-300 text-gray-100 font-medium rounded-[25px] me-2 hover:text-white hover:bg-red-500 text-[20px]">yes</button>
                                <button className="px-10 py-2 border border-gray-300 text-gray-100 font-medium rounded-[25px] me-4 hover:text-white hover:bg-red-500 text-[20px]">No</button>
                                <button className="py-2 text-gray-100 font-medium rounded-[25px] hover:text-white text-[20px] cursor-pointer" onClick={handleClick}>Skip</button>
                            </div>
                        </div>
                    </div>
                </div>

                : null
            }
        </>
    )
}
