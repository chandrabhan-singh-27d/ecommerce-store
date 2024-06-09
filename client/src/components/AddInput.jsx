import Button from "./Button";

const AddInput = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted")
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="py-4 mb-2">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-primary_color cursor-pointer">Add New Category</label>
                <div className="flex items-center gap-3">
                    <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none focus:border-gray-500 block w-96 p-2.5 " />
                    <Button type={'submit'} >Submit</Button>
                </div>
            </div>
        </form>
    )
}

export default AddInput;