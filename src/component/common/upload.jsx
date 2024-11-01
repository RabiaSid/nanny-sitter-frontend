import React from 'react'


export default function FileUpload(props) {
    const { onChange, value } = props;

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const file = e.target.files?.[0];
    //   if (file && onChange) {
    //     onChange(file); // Pass the selected file to the parent component
    //   }
    // };
    return (
        <>
            {/* <input
                id="dropzone-file"
                type="file"
                className="bg-transparent px-6 py-4 rounded-lg border-gray-300 border
                     text-gray-900 text-sm  block w-full dark:placeholder-gray-400 dark:text-white
                      focus:outline-none"
                accept=".svg, .png, .jpg, .jpeg, .gif"
                onChange={onChange}
                value={value}
            /> */}
            <label for="uploadFile1"
                className="bg-transparent px-6 py-4 rounded-full border-gray-300 border
                     text-[#666666] text-sm  block w-full dark:placeholder-gray-400 dark:text-white text-center
                      focus:outline-none">
                <strong className='text-[#ff6f61]'>Add file </strong>  <span>or drop files here</span>

                <input type="file" id='uploadFile1' className="hidden" />
            </label>
        </>
    );
}