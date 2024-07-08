import AddInput from "@/components/AddInput";
import LoadingPage from "@/components/LoadingPage";
import Table from "@/components/Table"
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react"

const CreateCategory = () => {
    const API_ENDPOINT = import.meta.env.VITE_API;
    const [categoryData, setCategoryData] = useState(null);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [newCategory, setNewCategory] = useState("");
    const [auth] = useAuth();


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
            } else throw (resData.message)
        } catch (error) {
            setIsTableLoading(false)
            console.log(`Error in getting all categories::${error}`)
        }
    }

    const handleSubmit = async () => {
        try {
            const data = {
                name: newCategory
            }
            const response = await fetch(`${API_ENDPOINT}/api/v1/category/create-category`, {
                method: 'POST',
                headers: {
                    token: auth?.token,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });
            const resData = await response.json();

            if (resData?.success) {
                setNewCategory("");
                setIsTableLoading(true);
                getAllCategories();
            } else {
                setNewCategory("");
                alert(resData.message);
                throw (resData.message);
            }
        } catch (error) {
            console.log(`Error in adding new category::${error}`)
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <div className="w-full mr-4 px-2 overflow-y-auto">
            <AddInput inputData={newCategory} setInputData={setNewCategory} onFormSubmit={handleSubmit} />
            {isTableLoading ? <LoadingPage /> : <Table
                headers={categoryHeaders}
                data={categoryData}
                lengthChange={true}
            />}
        </div>


    )
}

export default CreateCategory