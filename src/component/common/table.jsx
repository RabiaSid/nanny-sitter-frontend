import React from "react";

const Table = ({ label, datasource, cols }) => {
  return (
    <div className="overflow-y-scroll  max-h-[820px]">
      <table className=" bg-white border border-gray-200 shadow-md">
        <thead className="bg-red-500 text-white">
          <tr>
            {cols.map((col, index) => (
              <th key={index} className="px-4 py-4 text-left text-xl">
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
                <td
                  key={colIndex}
                  className="px-4 py-4 text-left text-md font-semibold"
                >
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
