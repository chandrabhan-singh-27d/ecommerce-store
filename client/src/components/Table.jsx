import { IconContext } from "react-icons";
import { CiEdit, CiTrash } from "react-icons/ci";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { useState, useRef, useEffect } from 'react';


const Table = ({ headers, data, lengthChange }) => {
    const lengths = [5, 10, 20, 50, 100];
    const [selectedLength, setSelectedLength] = useState(5);
    const [showLength, setShowLength] = useState(false);
    const lengthRefs = useRef([]);
    const lengthBoxRef = useRef(null);


    const toggleLengthChange = () => {
        setShowLength(prevState => !prevState)
    }
    const setLength = (changedLength) => {
        setSelectedLength(changedLength);
        setShowLength(false);
    }
    const handleKeyDown = (e, index) => {
        const itemCount = lengths.length;
        if (e.key === 'ArrowDown') {
            const nextIndex = (index + 1) % itemCount;
            lengthRefs.current[nextIndex].focus();
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            const prevIndex = (index - 1 + itemCount) % itemCount;
            lengthRefs.current[prevIndex].focus();
            e.preventDefault();
        } else if (e.key === 'Enter') {
            setLength(lengths[index]);
        } else if (e.key === 'Escape') {
            setShowLength(false);
            lengthBoxRef.current.focus();
        }
    };

    useEffect(() => {
        if (showLength) {
            lengthRefs.current[0].focus();
        }
    }, [showLength]);

    return (
        <div className='relative'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
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
                <div className='my-2'>
                    {lengthChange && (
                        <div
                            ref={lengthBoxRef}
                            tabIndex={0}
                            className='border border-gray-300 focus:ring-1 focus:ring-primary_color focus:outline-none focus:border-transparent w-14 mx-4 my-2 px-2 py-1 inline-flex gap-1 justify-center items-center rounded-md text-primary_color cursor-pointer'
                            onClick={toggleLengthChange}>
                            <span>{selectedLength}</span>
                            {!showLength && <span>{<MdOutlineKeyboardArrowDown />}</span>}
                            {showLength && <span>{<MdOutlineKeyboardArrowUp />}</span>}
                        </div>
                    )}
                </div>
            </div>
            {showLength && <ul id='length-box' className='absolute -bottom-[7.2rem] left-4 w-14 py-1 bg-white shadow-xl border border-gray-200 rounded-lg'>
                {lengths.map((length, index) => (
                    <li
                        key={index}
                        ref={(el) => lengthRefs.current[index] = el}
                        tabIndex={0}
                        className={`hover:bg-primary_color hover:text-white w-full inline-flex justify-center text-primary_color cursor-pointer focus:outline-none focus:bg-primary_color focus:text-white ${length === selectedLength ? 'bg-red-200' : ''}`}
                        onClick={() => setLength(length)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    >{length}</li>
                ))}
            </ul>}
        </div>
    )
}

export default Table