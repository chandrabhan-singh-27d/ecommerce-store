import React from 'react'

const SelectInput = ({ onSelectChange, options, selectedValue, placeholder, required, parentClassNames }) => {

    const handleSelectChange = (e) => {
        const selectedVal = JSON.parse(e.target.value);
        onSelectChange(selectedVal);
    }

    return (
        <select
            value={selectedValue || ""}
            onChange={handleSelectChange}
            required={required}
            className={`bg-gray-50 border border-gray-300 text-primary_color text-sm rounded-lg focus:ring-0 focus:outline-none focus:border-gray-500 block p-2.5 ${parentClassNames}`}
        >
            <option value="" disabled>{placeholder}</option>
            {options?.map((option) => (
                <option value={JSON.stringify(option)} key={option.uID}>{option.name}</option>
            ))}

        </select>
    )
}

export default SelectInput