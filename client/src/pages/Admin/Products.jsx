import LoadingPage from "@/components/LoadingPage";
import Table from "@/components/Table"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Products = () => {
    const API_ENDPOINT = import.meta.env.VITE_API
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);


    const getAllProducts = async () => {
        try {
            setLoading(true);
            setProducts([])
            const response = await fetch(`${API_ENDPOINT}/api/v1/product/products`)
            const resData = await response.json();

            setLoading(false);
            if (resData?.success) {
                console.log("Listed Products", resData);
                setProducts(resData.products)
            } else throw (resData.message)
        } catch (error) {
            setLoading(false);
            console.log(`Error in getting products::${error}`)
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

    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <>
            {loading && <LoadingPage />}
            {!loading && products?.map(product => (
                <Link to={`/admin/dashboard/product/${product.slug}`} key={product.uID}>
                    <div className="bg-white shadow-lg px-12 py-16 rounded-md">
                        <img src={convertBufferToBase64(product.image.data.data)} alt={product.name} />
                        <div>{product.name}</div>
                        <div>{product.category.name}</div>
                        <div>{product.description}</div>
                        <div>{product.price}</div>
                        <div>{product.quantity}</div>
                    </div>
                </Link>
            ))}
        </>
    )
}

export default Products