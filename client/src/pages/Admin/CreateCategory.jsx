import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { customFetch } from "@/utils/fetchUtil";
import AddInput from "@/components/AddInput";
import Button from "@/components/Button";
import LoadingPage from "@/components/LoadingPage";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import { MdClose } from "react-icons/md";

const CreateCategory = () => {
    const API_ENDPOINT = import.meta.env.VITE_API;
    const [auth] = useAuth();
    const [categoryData, setCategoryData] = useState(null);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [newCategory, setNewCategory] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newCategory) {
            alert("Please add value to create category");
            return;
        }

        try {
            const data = {
                name: newCategory
            }

            const response = await customFetch(`${API_ENDPOINT}/api/v1/category/create-category`, {
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
                await getAllCategories();
                alert(`${newCategory} created successfully`)
            } else {
                setNewCategory("");
                alert(resData.message);
                throw (resData.message);
            }
        } catch (error) {
            console.log(`Error in adding new category::${error}`)
        }
    }

    const handleCategoryEdit = (row) => {
        setShowModal(() => true);
        setModalData(() => row);
    }

    const saveEditedData = async (e) => {
        e.preventDefault();
        try {
            const url = `${API_ENDPOINT}/api/v1/category/update-category/${modalData.uID}`;

            const data = {
                name: modalData.name
            }
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: auth?.token
                },
                body: JSON.stringify(data)
            })

            const resData = await response.json();

            if(resData?.success) {
                setShowModal(false);
                setModalData(null);
                setIsTableLoading(true);
                await getAllCategories();
                alert(resData.message);
            } else throw Error(resData.message);
        } catch (error) {
            console.log(`Error in updating category::${modalData.name}`)
        }
    }

    const setEditedCategory = (data) => {
        setModalData((prevData) => {
            return {
                ...prevData,
                name: data
            }
        })
    }

    const hideModal = () => {
        setShowModal(() => false);
        setModalData(() => null);
    }

    const handleCategoryDelete = async (row) => {
        const userConfirmation = confirm(`Are you sure to delete ${row.name}`);

        if (userConfirmation) {
            // handle delete request
            try {
                const url = `${API_ENDPOINT}/api/v1/category/delete-category/${row.uID}`;

                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        token: auth?.token
                    }
                })

                const resData = await response.json();
                if (resData.success) {
                    alert(resData.message);
                    setIsTableLoading(true);
                    await getAllCategories();
                } else throw resData.message;
            } catch (error) {
                console.log(`Error in deleting category::${row.name}`)
            }
        } else return;
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <div className="w-full mr-4 px-2 min-h-[70vh] overflow-auto">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <AddInput
                    inputData={newCategory}
                    setInputData={setNewCategory}
                    labelText="Add Category"
                    parentClassNames="w-96"
                />
                <Button type="submit" parentClassNames="mt-7">Submit</Button>
            </form>
            {isTableLoading ? <LoadingPage /> : <Table
                headers={categoryHeaders}
                data={categoryData}
                lengthChange={true}
                searching={{
                    enable: true,
                    searchKeys: ['name', 'slug']
                }}
                onRowEdit={handleCategoryEdit}
                onRowDelete={handleCategoryDelete}
            />}
            {showModal && (<Modal onCloseModal={hideModal}>
                <div className="bg-white shadow-lg rounded-md min-w-96">
                    <div className="flex justify-between items-center">
                        <div className="text-primary_color text-2xl font-bold m-2">
                            Edit Category
                        </div>
                        <button
                            onClick={hideModal}
                            className="shadow-md bg-gray-400 p-1 m-1 mr-2 rounded-md text-white text-xl hover:bg-gray-500">
                            <MdClose />
                        </button>
                    </div>
                    <form
                        onSubmit={saveEditedData}
                        className="px-8 py-4"
                    >
                        <AddInput
                            inputData={modalData.name}
                            setInputData={setEditedCategory}
                            labelText="Edit Category Name"
                            parentClassNames={'w-full'}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" parentClassNames={'mt-3'}>Submit</Button>
                        </div>
                    </form>
                </div>
            </Modal>)}
        </div>
    )
}

export default CreateCategory