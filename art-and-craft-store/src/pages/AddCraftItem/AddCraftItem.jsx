import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const AddCraftItem = ({ update }) => {
    const { user } = useContext(AuthContext)

    const [updateItem, setUpdateItem] = useState({})
    const { id } = useParams();


    useEffect(() => {
        if (update) {
            fetch(`http://localhost:5000/all-art-and-craft-items/${id}`)
                .then(res => res.json())
                .then(data => {
                    setUpdateItem(data)

                })
        }
    }, [id, update])



    const handleSubmitItem = (event) => {
        event.preventDefault()
        const form = event.target;
        const image = form.image.value;
        const item_name = form.item_name.value;
        const subcategory_Name = form.sub_category.value;
        const short_description = form.details.value;
        const price = parseFloat(form.price.value);
        const rating = form.rating.value;
        const customization = form.customization.value;
        const processing_time = form.processing_time.value;
        const stockStatus = form.stockStatus.value;
        const email = user.email;

        const newItems = { image, item_name, subcategory_Name, short_description, price, rating, customization, processing_time, stockStatus, email }

        fetch('http://localhost:5000/all-art-and-craft-items', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItems)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'You item successfully added',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })

                    form.reset()

                }
            })
    }


    const handleUpdateItem = (event) => {
        event.preventDefault()
        const form = event.target;
        const image = form.image.value;
        const item_name = form.item_name.value;
        const subcategory_Name = form.sub_category.value;
        const short_description = form.details.value;
        const price = form.price.value;
        const rating = form.rating.value;
        const customization = form.customization.value;
        const processing_time = form.processing_time.value;
        const stockStatus = form.stockStatus.value;
        const email = user.email;

        const item = { image, item_name, subcategory_Name, short_description, price, rating, customization, processing_time, stockStatus, email }

        fetch(`http://localhost:5000/all-art-and-craft-items/${updateItem._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: 'Success!',
                    text: 'Update Successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }
        })
    }


    return (
        <section>
            <div className="container mx-auto">
                <div className="bg-white border border-4 rounded-lg shadow relative m-10">

                    <div className="flex items-start justify-between p-5 border-b rounded-t">
                        <h3 className="text-[40px] font-normal font-yan text-[#3e454c]">
                            {update ? 'Update Your Item' : 'Add Craft Item'}
                        </h3>

                    </div>

                    <div className="p-6 space-y-6">
                        <form onSubmit={update ? handleUpdateItem : handleSubmitItem}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="product-name" className="block mb-2 text-xl font-normal font-yan text-[#3e454c]">Name</label>
                                    <input type="text" name="item_name" id="product-name" defaultValue={update ? updateItem?.item_name : ''} className="shadow-sm border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 font-raj" placeholder="Enter your item name" required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="image" className="block mb-2 text-xl font-normal font-yan text-[#3e454c]">Image URL</label>
                                    <input type="text" name="image" id="image" defaultValue={update ? updateItem?.image : ''} className="shadow-sm border border-gray-300 text-gray-900 sm:text-base font-raj rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Enter Image URL" required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="category" className="block mb-2 text-xl font-normal font-yan text-[#3e454c]">Category</label>
                                    <input type="text" name="sub_category" id="category" defaultValue={update ? updateItem?.subcategory_Name : ''} className="shadow-sm border border-gray-300 text-gray-900 sm:text-base font-raj rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Enter Category Name" required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="price" className="block mb-2 text-xl font-normal font-yan text-[#3e454c]">Price</label>
                                    <input type="number" name="price" id="price" defaultValue={update ? updateItem?.price : ''} className="shadow-sm border border-gray-300 text-gray-900 sm:text-base font-raj rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="$2300" required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="rating" className="block mb-2 text-xl font-normal font-yan text-[#3e454c]">Rating</label>
                                    <input type="number" name="rating" id="rating" defaultValue={update ? updateItem?.rating : ''} className="shadow-sm border border-gray-300 text-gray-900 sm:text-base font-raj rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Emaple: 4.5 or 5" required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="processing-time" className="block mb-2 text-xl font-normal font-yan text-[#3e454c]">Processing Time</label>
                                    <input type="text" name="processing_time" id="processing-time" defaultValue={update ? updateItem?.processing_time : ''} className="shadow-sm border border-gray-300 text-gray-900 sm:text-base font-raj rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Example: 1-5 days" required="" />
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="product-details" className="block mb-2 text-xl font-normal font-yan text-[#3e454c]">Product Details</label>
                                    <textarea id="product-details" name="details" defaultValue={update ? updateItem?.short_description : ''} rows="6" className="border border-gray-300 text-gray-900 sm:text-base font-raj rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details"></textarea>
                                </div>

                                <div className="space-y-6 mb-9 col-span-full">
                                    <div className="flex items-center space-x-6">
                                        <span className="text-xl font-normal font-yan text-[#3e454c]">Stock Status</span>
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" defaultChecked={update && updateItem.stockStatus === "In stock"} name="stockStatus" value="In stock" className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500" />
                                            <span className="text-[#2A2F43] font-raj sm:text-base">In stock</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" defaultChecked={update && updateItem.stockStatus === "Made to Order"} name="stockStatus" value="Made to Order" className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500" />
                                            <span className="text-[#2A2F43] font-raj sm:text-base">Made to Order</span>
                                        </label>
                                    </div>


                                    <div className="flex items-center space-x-6">
                                        <span className="text-xl font-normal font-yan text-[#3e454c]">Customization</span>
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" defaultChecked={update && updateItem?.customization === "Yes"} name="customization" value="Yes" className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500" />
                                            <span className="text-[#2A2F43] font-raj sm:text-base">Yes</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" defaultChecked={update && updateItem?.customization === "No"} name="customization" value="No" className="w-4 h-4 text-gray-400 border-gray-300 focus:ring-gray-400" />
                                            <span className="text-[#2A2F43] font-raj sm:text-base">No</span>
                                        </label>
                                    </div>
                                </div>


                            </div>

                            <div className="p-6 border-t border-gray-200 rounded-b">
                                <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-lg px-5 py-2.5 text-center font-yan" type="submit">Save all</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};

AddCraftItem.propTypes = {
    update: PropTypes.bool
}

export default AddCraftItem;