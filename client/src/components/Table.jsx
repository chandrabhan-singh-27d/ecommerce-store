import { IconContext } from "react-icons";
import { CiEdit, CiTrash } from "react-icons/ci";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown, MdOutlineSearch } from "react-icons/md";
import { useState, useRef, useEffect } from 'react';


const Table = ({ headers, data, lengthChange }) => {
    const [selectedLength, setSelectedLength] = useState(5);
    const [showLength, setShowLength] = useState(false);
    const lengthRefs = useRef([]);
    const lengthBoxRef = useRef(null);
    const lengthMenu = useRef(null);
    const [slicedData, setSlicedData] = useState([]);
    const [pages, setPages] = useState([])
    const [selectedPage, setSelectedPage] = useState(1);
    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("")
    const lengths = [5, 10, 20, 50, 100];


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

    const toggleSearchBar = () => {
        setShowSearch(prevState => !prevState);
        if(!showSearch) {
            setSearchValue(() => "");
        }
    } 

    const handleSearch = (e) => {
        // console.log(data)
    }
    
    useEffect(() => {
        if (showLength) {
            lengthRefs.current[0].focus();
        }
    }, [showLength]);

    useEffect(() => {
        const numberOfPages = Math.ceil(data.length / selectedLength);
        let temp = [];
        for (let i = 1; i <= numberOfPages; i++) {
            temp.push(i)
        }
        if (!temp.includes(selectedPage)) setSelectedPage(temp[temp.length - 1])
        setPages(temp);
    }, [selectedLength])

    useEffect(() => {
        if (pages.length === 1) {
            setSlicedData(data)
        } else if (selectedPage === 1) {
            setSlicedData(data.slice(0, selectedPage * selectedLength))
        } else if (selectedPage === pages[pages.length - 1]) {
            const prevPage = selectedPage - 1;
            setSlicedData(data.slice(prevPage * selectedLength, data.length))
        } else {
            const prevPage = selectedPage - 1;
            setSlicedData(data.slice(prevPage * selectedLength, selectedPage * selectedLength))
        }
    }, [selectedPage, selectedLength, pages])

    /* Close user control dropdown if clicked outside */
    const handleClickOutside = (e) => {
        const lengthBox = document.querySelector('#length-box')
        if (lengthBox.contains(e.target) || lengthBoxRef.current.contains(e.target)) {
            // ignore event if clicked on/inside length box
            return
        } else if (lengthMenu.current && !lengthMenu.current.contains(e.target)) {
            // fire if not clicked on length box
            setShowLength(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='relative'>
            <div className="flex justify-end items-center gap-1 my-2">
                {showSearch && <input
                    type="search"
                    placeholder="Search table"
                    className="border border-gray-300 rounded focus:ring-1 focus:ring-primary_color focus:outline-none focus:border-transparent px-2 py-0.5" 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => handleSearch(e)}
                    />}
                <div 
                className="text-white bg-primary_color py-[5px] px-3 font-bold text-xl rounded cursor-pointer"
                onClick={toggleSearchBar}
                >
                    <MdOutlineSearch />
                </div>
            </div>
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
                        {slicedData?.map((row) => (
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
                        <div className="flex justify-between">
                            <div
                                ref={lengthBoxRef}
                                tabIndex={0}
                                className='border border-gray-300 focus:ring-1 focus:ring-primary_color focus:outline-none focus:border-transparent w-14 mx-4 my-2 px-2 py-1 inline-flex gap-1 justify-center items-center rounded-md text-primary_color cursor-pointer'
                                onClick={toggleLengthChange}>
                                <span>{selectedLength}</span>
                                {!showLength && <span>{<MdOutlineKeyboardArrowDown />}</span>}
                                {showLength && <span>{<MdOutlineKeyboardArrowUp />}</span>}
                            </div>
                            <ul className="flex justify-end mx-4 gap-1">
                                {
                                    pages.map((page, idx) => (
                                        <li key={idx}>
                                            <button
                                                type="button"
                                                className={`px-3 py-1 rounded-md border border-gray-300 focus:border-transparent cursor-pointer ${page === selectedPage ? 'bg-primary_color text-white' : 'text-primary_color'}`}
                                                onClick={() => setSelectedPage(page)}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {showLength && <ul id='length-box' ref={lengthMenu} className='absolute -bottom-[7.2rem] left-4 w-14 py-1 bg-white shadow-xl border border-gray-200 rounded-lg'>
                {lengths.map((length, index) => (
                    <li
                        key={index}
                        ref={(el) => lengthRefs.current[index] = el}
                        tabIndex={0}
                        className={`hover:bg-primary_color hover:text-white w-full inline-flex justify-center text-primary_color cursor-pointer focus:outline-none ${length === selectedLength ? 'bg-primary_color focus:bg-primary_color text-white focus:text-white' : 'focus:bg-gray-100 focus:text-primary_color'}`}
                        onClick={() => setLength(length)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    >{length}</li>
                ))}
            </ul>}
        </div>
    )
}

export default Table