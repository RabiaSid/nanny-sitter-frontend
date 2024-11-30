import React from "react";

const Table = ({
  label,
  datasource,
  cols,
  tableHeaderClass,
  tableClass,
  loading,
  loaderColor,
}) => {
  return (
    <div
      className={
        tableClass ? tableClass : "overflow-y-scroll  max-h-[420px] relative"
      }
    >
      <table className=" bg-white shadow-md w-full">
        <thead
          className={
            tableHeaderClass
              ? tableHeaderClass
              : "bg-red-600 text-white sticky top-0 right-0 capitalize font-montserrat"
          }
        >
          <tr>
            {cols.map((col, index) => (
              <th
                key={index}
                className="px-4 py-4 text-left text-md font-medium"
              >
                {col.heading}
              </th>
            ))}
          </tr>
        </thead>
        {loading ? (
          <div className="absolute w-[97%] h-[440px] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`animate-spin h-8 w-8 ${loaderColor}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M4 12a8 8 0 018-8 8 8 0 018 8"
                className="opacity-75"
              />
            </svg>
          </div>
        ) : (
          <tbody>
            {datasource.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                {cols.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 h-[60px] text-left text-sm "
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
