import Button from "./Button";

const AddInput = ({inputData, setInputData, onFormSubmit}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!inputData) {
            alert("Can't create a category with empty value");
            return;
        } else {
            onFormSubmit();
        }
        setInputData("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="py-4 mb-2">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-primary_color cursor-pointer">Add New Category</label>
                <div className="flex items-center gap-3">
                    <input 
                    type="text" 
                    id="default-input"
                    value={inputData}
                    onChange={(e) => setInputData(() => e.target.value)} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none focus:border-gray-500 block w-96 p-2.5 " 
                    />
                    <Button type={'submit'} >Submit</Button>
                </div>
            </div>
        </form>
    )
}

export default AddInput;