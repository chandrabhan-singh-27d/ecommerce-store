import { useEffect, useId, useState } from "react";
import SelectInput from "@/components/SelectInput";
import AddInput from "@/components/AddInput";
import Button from "@/components/Button";
import { useAuth } from "@/context/auth";

const CreateProducts = () => {
  const API_ENDPOINT = import.meta.env.VITE_API;
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [valid, setValid] = useState(true);

  const shippingOptions = [
    {
      name: "Yes",
      uID: useId(),
      value: true
    },
    {
      name: "No",
      uID: useId(),
      value: false
    },
  ]

  const getAllCategories = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/v1/category/categories`);
      const resData = await response.json();

      if (resData?.success) {
        const { categories } = resData;
        setCategories(categories);
      } else throw (resData.message);
    } catch (error) {
      console.log(`Error in fetching categories in products::${error}`);
    }
  }

  const saveProduct = async (e) => {
    e.preventDefault();

    if (!productImage) {
      setValid(false);
      return
    }

    try {
      const url = `${API_ENDPOINT}/api/v1/product/create-product`;

      const reqData = new FormData();

      reqData.append("name", productName);
      reqData.append("description", productDescription);
      reqData.append("price", Number(productPrice));
      reqData.append("category", productCategory.uID);
      reqData.append("quantity", Number(productQuantity));
      reqData.append("image", productImage);
      reqData.append("shipping", Boolean(shipping.value));

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          token: auth?.token,
        },
        body: reqData
      });

      const resData = await response.json();

      if (resData?.success) {
        console.log("response", resData)
      } else throw (resData.message)
    } catch (error) {
      console.log(`Error in creating product::${error}`)
    }
  }


  useEffect(() => {
    getAllCategories();
  }, []);


  return (
    <>
      <form onSubmit={saveProduct} className="w-full mt-4 flex justify-center">
        <div className="bg-white shadow-lg w-1/2 h-fit px-12 py-16 rounded-md flex flex-col items-center">
          {categories &&
            <SelectInput
              onSelectChange={setProductCategory}
              options={categories}
              selectedValue={productCategory}
              placeholder="Select a category"
              required={true}
              parentClassNames="w-full"
            />
          }
          <label className="my-3 w-full text-white bg-gradient-to-r from-[#ed0b51] to-[#840260] hover:bg-gradient-to-l focus:ring-1 focus:outline-none focus:ring-[#840260] font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
            {productImage?.name || "Upload Product Image"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setProductImage(e.target.files[0])} />
          </label>
          {!valid && <p className="text-red-700 self-start">Product image is required</p>}
          {productImage &&
            <img
              src={URL.createObjectURL(productImage)}
              alt={productImage.name + '_image'}
              width={'200px'}
            />
          }
          <AddInput
            inputData={productName}
            setInputData={setProductName}
            placeholderText="Enter product name"
            required={true}
            parentClassNames="w-full my-2"
          />
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none focus:border-gray-500 block p-2.5 w-full my-2"
          />
          <AddInput
            inputData={productPrice}
            setInputData={setProductPrice}
            placeholderText="Enter product price"
            required={true}
            parentClassNames="w-full my-2"
          />
          <AddInput
            inputData={productQuantity}
            setInputData={setProductQuantity}
            placeholderText="Enter product quantity"
            required={true}
            parentClassNames="w-full my-2"
          />
          <SelectInput
            onSelectChange={setShipping}
            options={shippingOptions}
            selectedValue={shipping}
            placeholder="Select shipping"
            required={true}
            parentClassNames="w-full my-2"
          />
          <Button type="submit" parentClassNames="self-end">Submit</Button>
        </div>
      </form>
    </>
  )
}

export default CreateProducts