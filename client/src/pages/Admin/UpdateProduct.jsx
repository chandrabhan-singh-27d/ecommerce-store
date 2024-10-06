import { API_ENDPOINT } from "@/config";
import { useEffect, useId, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import ProductForm from "./ProductForm";
import { customFetch } from "@/utils/fetchUtil";
import { useAuth } from "@/context/auth";

const UpdateProduct = () => {
  const { slug } = useParams();
  const navigateTo = useNavigate();
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredProduct, setFilteredProduct] = useState({
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

  useEffect(() => {
    getAllCategories();
    getFilteredProduct();
  }, [])

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

  const getFilteredProduct = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/v1/product/get-product/${slug}`);
      const resData = await response.json();

      if (resData?.success) {
        setLoading(false);

        Object.entries(resData.filteredProduct).forEach(([key, val]) => {
          setFilteredProduct(prev => ({
            ...prev,
            [key]: key === 'image'
              ? convertBufferToBase64(val.data.data)
              : key === 'shipping'
                ? shippingOptions.find(option => option.value === val)
                : val
          }))
        })
      }
    } catch (error) {
      setLoading(false)
      console.log(`Error in getting the details of the requested product`)
    }
  }

  const convertBufferToBase64 = (buffer, mimeType = "image/png") => {
    const binary = new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    );
    const base64String = window.btoa(binary);
    return `data:${mimeType};base64,${base64String}`;
  };

  const updateProduct = async () => {
    if (!filteredProduct.image) {
      setError("Product image is required");
      return;
    }

    try {
      const url = `${API_ENDPOINT}/api/v1/product/update-product/${filteredProduct.uID}`;
      const reqData = new FormData();

      const requestPromises = Object.entries(filteredProduct).map(async ([key, value]) => {
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
            const blob = await fetch(value).then(res => res.blob());
            reqData.append(key, blob);
          }
        } else if (key === 'uID') {
          return;
        } else {
          reqData.append(key, value);
        }
      });

      await Promise.all(requestPromises);

      setLoading(true);
      const response = await customFetch(url, {
        method: 'PUT',
        headers: { token: auth?.token },
        body: reqData,
      });

      const resData = await response.json();

      if (resData?.success) {
        alert(resData.message);
        navigateTo("/admin/dashboard/product")
      } else throw new Error(resData.message);
    } catch (error) {
      console.error("Error creating product:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    try {
      const url = `${API_ENDPOINT}/api/v1/product/delete-product/${filteredProduct.uID}`;

      setLoading(true);
      const response = await customFetch(url, {
        method: 'DELETE',
        headers: { token: auth?.token }
      });

      const resData = await response.json();

      if (resData?.success) {
        alert(resData.message);
        navigateTo("/admin/dashboard/product")
      } else throw new Error(resData.message);
    } catch (error) {
      console.error("Error creating product:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return <ProductForm
    categories={categories}
    productData={filteredProduct}
    setProductData={setFilteredProduct}
    loading={loading}
    error={error}
    shippingOptions={shippingOptions}
    onSaveProduct={updateProduct}
    submitBtnName="Update"
    deleteBtn={true}
    onDeleteProduct={deleteProduct}
  />
}

export default UpdateProduct