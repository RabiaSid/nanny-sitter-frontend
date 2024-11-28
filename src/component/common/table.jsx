import React from "react";

const Table = ({ label, datasource, cols, tableHeaderClass, tableClass }) => {
  return (
    <div
      className={tableClass ? tableClass : "overflow-y-scroll  max-h-[420px]"}
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
        <tbody>
          {datasource.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              {cols.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-4 text-left text-sm ">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
