import { useEffect, useId, useState } from "react"
import CreateProducts from "./CreateProducts"
import Products from "./Products"


const ProductsPage = () => {
    const [selectedTab, setSelectedTab] = useState(null)
    const tabs = [
        {
            name: "Products",
            id: useId()
        },
        {
            name: "Add New Product",
            id: useId()
        }
    ]

    useEffect(() => {
        setSelectedTab(tabs[0])
    }, [])
    return (
        <>
            <ul className="inline-flex gap-3 border-b cursor-pointer">
                {selectedTab && tabs.map(tab => (
                    <li
                        key={tab.id}
                        onClick={() => setSelectedTab(tab)}
                        className={`text-lg py-2 px-4 ${tab.id === selectedTab.id ? 'text-primary_color bg-gray-100 rounded-t-md' : 'text-gray-600'}`}
                    >{tab.name}</li>
                ))}
            </ul>
            <div className="mt-4">
                {selectedTab?.name === 'Add New Product' && <CreateProducts />}
                {selectedTab?.name === 'Products' && <Products />}
            </div>
        </>
    )
}

export default ProductsPage