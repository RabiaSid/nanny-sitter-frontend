import React from 'react'
import { H2, H3, H5, Font2 } from '@/config/typography'
import Bg from "../../assets/services/comparison/comparison-img.png"

const OPTIONS = { align: 'center' }
const SLIDE_COUNT = 6


export default function Comparison() {

    return (
        <div className="py-[30px] md:py-[50px] lg:py-[100px]">
            {/* slider */}
            <div className="container mx-auto group">
                <H2 className="font-creato mb-4 text-center capitalize">Annual cost comparison</H2>
                <Font2 className="text-[#333333]text-opacity-80 text-center">Get the convenience you deserve at the price you can afford</Font2>
               <div className='flex justify-center'>
                <img src={Bg} className='mt-20'/>
               </div>
            </div>

        </div>
    )
}

