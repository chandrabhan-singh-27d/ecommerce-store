import LoadingPage from "@/components/LoadingPage";
import Table from "@/components/Table"
import { useEffect, useState } from "react"

const CreateCategory = () => {
    const API_ENDPOINT = import.meta.env.VITE_API;
    const [categoryData, setCategoryData] = useState(null);
    const [isTableLoading, setIsTableLoading] = useState(true);


    const categoryHeaders = [
        {
            key: "name",
            label: "Category"
        },
        {
            key: "slug",
            label: "Slug"
        },
        {
            key: "edit",
            label: ""
        },
        {
            key: "delete",
            label: ""
        },
    ]


    const getAllCategories = async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}/api/v1/category/categories`);
            const resData = await response.json();

            if (resData?.success) {
                setIsTableLoading(false);
                const { categories } = resData;
                setCategoryData([...categories])
            } else throw Error(resData.message)
        } catch (error) {
            setIsTableLoading(false)
            console.log(`Error in getting all categories::${error}`)
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <div className="w-full mr-3">
            <div>CreateCategory</div>
            {isTableLoading ? <LoadingPage /> : <Table headers={categoryHeaders} data={categoryData} />}
            
        </div>


    )
}

export default CreateCategory