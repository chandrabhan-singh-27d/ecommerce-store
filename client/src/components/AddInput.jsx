const AddInput = ({ inputData, setInputData, placeholderText, labelText, required, parentClassNames, containerClassNames }) => {

    return (
        <div className={`${containerClassNames}`}>
            {labelText && <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-primary_color cursor-pointer">{labelText}</label>}
            <input
                type="text"
                id="default-input"
                placeholder={placeholderText || ""}
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                required={required}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none focus:border-gray-500 p-2.5 block ${parentClassNames}`}
            />
        </div>
    )
}

export default AddInput;