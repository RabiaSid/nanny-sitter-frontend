import React from "react";

export default function Radiobutton(props) {
  const { btnField, id, name, value, label, image, checked, right, onChange } =
    props;

  return btnField ? (
    <div className="group">
      <div className="m-4 p-4 rounded-full border border-gray-300">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          className="hidden"
          checked={checked}
          onChange={onChange}
          required
        />

        <label
          htmlFor={id}
          className="flex items-center cursor-pointer text-lg font-normal text-gray-600 gap-4"
        >
          {image ? (
            <img
              src={image}
              alt={label}
              width="35px"
              height="35px"
              className=""
            />
          ) : (
            <span
              className={`border rounded-full mr-2 w-6 h-6 flex items-center justify-center 
                transition-colors duration-300 ease-in-out 
                ${checked ? "border-[#FF6F61]" : "border-gray-300"} 
                hover:border-[#FF6F61]`}
            >
              {checked ? (
                <span className="w-4 h-4 bg-[#FF6F61] rounded-full"></span>
              ) : (
                <span className="group-hover:w-4 group-hover:h-4 group-hover:bg-[#FF6F61] group-hover:rounded-full"></span>
              )}
            </span>
          )}

          {label}
          {image && (
            <span
              className={`border rounded-full mr-2 w-6 h-6 flex items-center justify-center 
                            transition-all duration-300 ease-in-out 
                            ${checked ? "border-[#FF6F61]" : "border-gray-300"}
                            group-hover:border-[#FF6F61]`}
            >
              {checked ? (
                <span className="w-4 h-4 bg-[#FF6F61] rounded-full"></span>
              ) : (
                <span className="group-hover:w-4 group-hover:h-4 group-hover:bg-[#FF6F61] group-hover:rounded-full"></span>
              )}
            </span>
          )}
        </label>
      </div>
    </div>
  ) : (
    <div className="group">
      <div
        className={`m-4 p-4 rounded-full transition-all duration-300 ease-in-out 
                    ${checked ? "bg-[#FF6F61]" : "border border-gray-300"} 
                    group-hover:bg-[#FF6F61] group-hover:border-none`}
      >
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          className="hidden"
          checked={checked}
          onChange={onChange}
          required
        />
        <label
          htmlFor={id}
          className={`flex items-center cursor-pointer text-lg font-normal 
                        transition-all duration-300 ease-in-out
                        ${checked ? "text-white" : "text-gray-600"} 
                        group-hover:text-white`}
        >
          <span
            className={`border rounded-full mr-2 w-6 h-6 flex items-center justify-center 
                                transition-all duration-300 ease-in-out 
                                ${checked ? "border-white" : "border-gray-300"} 
                                group-hover:border-white`}
          >
            {checked ? (
              <span className="w-4 h-4 bg-white rounded-full"></span>
            ) : (
              <span className="group-hover:w-4 group-hover:h-4 group-hover:bg-white group-hover:rounded-full"></span>
            )}
          </span>

          {label}
        </label>
      </div>
    </div>
  );
}
