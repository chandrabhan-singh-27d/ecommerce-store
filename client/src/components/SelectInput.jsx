const SelectInput = ({
    onSelectChange,
    options,
    selectedValue,
    placeholder,
    required,
    parentClassNames
}) => {

    const handleSelectChange = (e) => {
        const selectedUID = e.target.value;
        const selectedOption = options.find(option => option.uID === selectedUID);
        onSelectChange(selectedOption);
    }

    return (
        <select
            value={selectedValue.uID || ""}
            onChange={handleSelectChange}
            required={required}
            className={`bg-gray-50 border border-gray-300 text-primary_color text-sm rounded-lg focus:ring-0 focus:outline-none focus:border-gray-500 block p-2.5 ${parentClassNames}`}
        >
            <option value="" disabled>{placeholder}</option>
            {options?.map((option) => (
                <option value={option.uID} key={option.uID}>{option.name}</option>
            ))}

        </select>
    )
}

export default SelectInput