import React from 'react'
import { Font2, H5 } from '@/config/typography'

export default function TextArea(props) {
    const { label, value, onChange, type = "text", placeholder } = props
    return (
        // <form>
            <div className='relative'>
                <textarea type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows="10"
                    required
                    className="bg-transparent px-6 py-4 rounded-lg border-gray-300 border
                     text-gray-900 text-sm  block w-full 
                      focus:outline-none"
                     />
                     
                <div className='absolute left-[3%] top-[-15px] bg-white px-1 capitalize text-[#666666]'><Font2>{label}</Font2></div>
            </div>
        // </form>
    )
}

