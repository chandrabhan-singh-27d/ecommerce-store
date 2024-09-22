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
            <div className="grid grid-cols-3 gap-4">
                {!loading && products?.map(product => (
                    <div key={product.uID} className="bg-white shadow-lg px-12 py-10 rounded-md flex flex-col items-center max-w-xl h-full">
                        <div className=" overflow-hidden">
                            <img src={convertBufferToBase64(product.image.data.data)} alt={product.name} className="h-48 w-96 object-contain object-center" />
                        </div>
                        <div className="py-2 my-2 flex flex-col gap-2">
                            <Link to={`/admin/dashboard/product/${product.slug}`}>
                                <div title="Update Product" className="text-primary_color">{product.name}</div>
                            </Link>
                            <div><b>Category: </b>{product.category.name}</div>
                            <div className="thin max-h-28 overflow-auto"><b>Product Description: </b>{product.description}</div>
                            <div><b>Price: </b> ₹{product.price} <>{product.shipping ? `(shipping excluded)` : `(shipping included)`}</></div>
                            <div><b>Quantity Available: </b>{product.quantity}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Products