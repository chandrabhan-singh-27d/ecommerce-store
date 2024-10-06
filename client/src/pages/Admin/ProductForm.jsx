import SelectInput from "@/components/SelectInput";
import AddInput from "@/components/AddInput";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import LoadingPage from "@/components/LoadingPage";
import { GoTrash } from "react-icons/go";

const ProductForm = ({
    categories,
    productData,
    setProductData,
    loading,
    error,
    shippingOptions,
    onSaveProduct,
    submitBtnName,
    deleteBtn,
    onDeleteProduct
}) => {
    const handleInputChange = (field) => (value) => {
        const inputVal = value

        setProductData((prev) => ({
            ...prev,
            [field]: inputVal
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            handleInputChange('image')({
                file,
                preview: objectUrl
            });
        }
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();
        onSaveProduct();
    }


    return (
        <>
            <form onSubmit={handleSaveProduct} className="w-full mt-4 flex justify-center">
                <div className="bg-white shadow-lg w-1/2 h-fit px-12 py-16 rounded-md flex flex-col items-center">
                    {categories && (
                        <SelectInput
                            onSelectChange={handleInputChange('category')}
                            options={categories}
                            selectedValue={productData.category}
                            placeholder="Select a category"
                            required={true}
                            parentClassNames="w-full"
                        />
                    )}
                    <label className="my-3 w-full text-white bg-gradient-to-r from-[#ed0b51] to-[#840260] hover:bg-gradient-to-l focus:ring-1 focus:outline-none focus:ring-[#840260] font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
                        {productData.image?.name || "Upload Product Image"}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                    {error && <p className="text-red-700 self-start">{error}</p>}
                    {productData.image && (
                        <img
                            src={productData.image.preview || productData.image}
                            alt={productData.image.name + "_image"}
                            width={"200px"}
                        />
                    )}
                    {['name', 'price', 'quantity'].map((field) => (
                        <AddInput
                            key={field}
                            inputData={productData[field]}
                            setInputData={handleInputChange(field)}
                            placeholderText={`Enter product ${field}`}
                            required={true}
                            parentClassNames="w-full my-2"
                            containerClassNames="w-full"
                        />
                    ))}
                    <textarea
                        value={productData.description}
                        onChange={(e) => handleInputChange('description')(e.target.value)}
                        placeholder="Enter product description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none focus:border-gray-500 block p-2.5 w-full my-2"
                    />
                    <SelectInput
                        onSelectChange={handleInputChange('shipping')}
                        options={shippingOptions}
                        selectedValue={productData.shipping}
                        placeholder="Select shipping"
                        required={true}
                        parentClassNames="w-full my-2"
                    />
                    <div className="self-end flex justify-end gap-4">
                        <Button type="submit" parentClassNames="self-end" disabled={loading}>
                            {submitBtnName || 'Submit'}
                        </Button>
                        {deleteBtn && <button type='button' onClick={onDeleteProduct} className={`text-red-700 bg-transparent hover:text-white hover:bg-red-800 border border-red-700 hover:border-red-800 focus:ring-1 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-xl px-6 py-2 text-center`}>
                            <GoTrash />
                        </button>}
                    </div>
                </div>
            </form>
            {loading && (
                <Modal>
                    <LoadingPage />
                </Modal>
            )}
        </>
    );
};

export default ProductForm;