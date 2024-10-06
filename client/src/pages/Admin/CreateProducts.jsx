import { useEffect, useId, useState } from "react";
import { useAuth } from "@/context/auth";
import { customFetch } from "@/utils/fetchUtil";
import { API_ENDPOINT } from "@/config";
import ProductForm from "./ProductForm";

const CreateProducts = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [productData, setProductData] = useState({
    image: null,
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    shipping: "",
  });


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

  const saveProduct = async () => {
    if (!productData.image) {
      setError("Product image is required");
      return;
    }

    try {
      const url = `${API_ENDPOINT}/api/v1/product/create-product`;
      const reqData = new FormData();

      Object.entries(productData).forEach(([key, value]) => {
        if (key === 'price' || key === 'quantity') {
          reqData.append(key, Number(value));
        } else if (key === 'category') {
          reqData.append(key, value.uID);
        } else if (key === 'shipping') {
          reqData.append(key, Boolean(value));
        } else if (key === 'image') {
          if (value.file) {
            reqData.append(key, value.file);
          } else {
            reqData.append(key, value);
          }
        } else {
          reqData.append(key, value);
        }
      });

      setLoading(true);
      const response = await customFetch(url, {
        method: 'POST',
        headers: { token: auth?.token },
        body: reqData,
      });

      const resData = await response.json();

      if (resData?.success) {
        resetProductsData();
        alert(resData.message);
      } else throw new Error(resData.message);
    } catch (error) {
      console.error("Error creating product:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetProductsData = () => {
    setProductData({
      image: null,
      name: "",
      category: "",
      description: "",
      price: "",
      quantity: "",
      shipping: "",
    });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return <ProductForm
    categories={categories}
    productData={productData}
    setProductData={setProductData}
    loading={loading}
    error={error}
    shippingOptions={shippingOptions}
    onSaveProduct={saveProduct}
  />

}

export default CreateProducts