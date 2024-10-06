import LoadingPage from "@/components/LoadingPage";
import { API_ENDPOINT } from "@/config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const UpdateProduct = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [filteredProduct, setFilteredProduct] = useState(null);

  useEffect(() => {

    (async () => {
      
      try {
        const response = await fetch(`${API_ENDPOINT}/api/v1/product/get-product/${slug}`);
        const resData = await response.json();

        if (resData?.success) {
          setLoading(false);
          console.log("single product details", resData)
        }
      } catch (error) {
        setLoading(false)
        console.log(`Error in getting the details of the requested product`)
      }
    })()

  }, [])

  return (
    <>
      {loading && <LoadingPage />}
    </>
  )
}

export default UpdateProduct