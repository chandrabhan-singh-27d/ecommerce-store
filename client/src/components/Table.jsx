import React from 'react';
import { IconContext } from "react-icons";
import { CiEdit, CiTrash } from "react-icons/ci";



const Table = ({ headers, data }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {headers?.map((column) => (
                            <th key={column.key} scope="col" className="px-6 py-3">{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row) => (
                        <tr key={row.uID} className="bg-white border-b hover:bg-gray-50">
                            {headers?.map((column) => {
                                if (column.key === 'edit') {
                                    return <td className="px-6 py-4 text-right" key={row.uID + column.key}>
                                        <IconContext.Provider value={{ className: "cursor-pointer", size: 26 }}>
                                            <CiEdit className="font-medium text-blue-600 hover:underline" />
                                        </IconContext.Provider>
                                    </td>
                                } else if (column.key === 'delete') {
                                    return <td className="px-6 py-4 text-right" key={row.uID + column.key}>
                                        <IconContext.Provider value={{ className: "cursor-pointer", size: 26 }}>
                                            <CiTrash className="font-medium text-red-600 hover:underline" />
                                        </IconContext.Provider>
                                    </td>
                                } else {
                                    return <td key={row.uID + column.key} scope="col" className="px-6 py-3">{row[column.key]}</td>
                                }
                            })}
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Table