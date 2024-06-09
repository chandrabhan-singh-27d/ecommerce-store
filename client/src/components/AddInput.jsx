
const AddInput = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="py-4 mb-2">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-primary_color cursor-pointer">Add New Category</label>
                <div className="flex items-center gap-3">
                    <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-100 block w-96 p-2.5 " />
                    <button type="submit" class="text-white bg-gradient-to-r from-[#ed0b51] to-[#840260] hover:bg-gradient-to-l focus:ring-1 focus:outline-none focus:ring-[#840260] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default AddInput;