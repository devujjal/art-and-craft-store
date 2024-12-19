import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";


const CarftAndArtDetails = () => {
    const { user, handleOrder, handleOrderRemove } = useContext(AuthContext);
    const [carftAndArtItem, setCarftAndArtItem] = useState({});
    const { id } = useParams();
    const { email } = user;

    useEffect(() => {
        fetch(`http://localhost:5000/all-art-and-craft-items/${id}`)
            .then(res => res.json())
            .then(data => setCarftAndArtItem(data));

    }, [id]);

    const handleConfirmOrder = (item) => {
        handleOrder(item, email);
        const updatedState = { ...carftAndArtItem, order: true };
        setCarftAndArtItem(updatedState);
    }

    const handleOrderDelete = (item) => {
        handleOrderRemove(item);
        const updatedState = { ...carftAndArtItem, order: false };
        setCarftAndArtItem(updatedState);

    }

    return (
        <section>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-center py-14 min-h-screen">
                    <div className="relative w-full">
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Sale!</span>
                        <img src={carftAndArtItem?.image} alt="Craft and Art" />
                    </div>
                    <div className="p-8 w-full">
                        <h1 className="text-[40px] font-normal text-[#3e454c] font-yan">{carftAndArtItem?.item_name}</h1>
                        <p className="text-sm flex gap-1 items-center text-gray-500">
                            <span className="flex">
                                {/* Stars */}
                            </span>
                            <span className="ml-2 text-gray-600 text-base font-raj font-normal">{carftAndArtItem?.rating} rating</span>
                        </p>
                        <div className="flex items-center mt-2 font-yan">
                            <span className="text-2xl font-bold text-green-600">${carftAndArtItem?.price}</span>
                            <span className="ml-2 text-sm text-gray-400 line-through">$438.75</span>
                        </div>
                        <p className="mt-3 text-base font-normal text-gray-500 font-raj">
                            {carftAndArtItem?.short_description}
                        </p>
                        <div className="mt-4">
                            <span className="block text-center bg-gray-300 text-gray-600 text-xl font-semibold py-2 rounded font-yan">{carftAndArtItem?.stockStatus}</span>
                        </div>
                        <div className="mt-4 text-base text-gray-400 font-normal font-raj">
                            <p><span className="font-bold">Customization: </span>{carftAndArtItem?.customization}</p>
                            <p><span className="font-bold">Processing Time: </span>{carftAndArtItem?.processing_time}</p>
                            <p><span className="font-bold">Subcategory Name: </span>{carftAndArtItem?.subcategory_Name}</p>
                        </div>
                        <div>
                            {
                                carftAndArtItem?.order ? (
                                    <button
                                        onClick={() => handleOrderDelete(carftAndArtItem)}
                                        className="px-4 py-2.5 text-white bg-red-600 mt-4 font-yan text-xl"
                                    >
                                        Cancel Order
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleConfirmOrder(carftAndArtItem)}
                                        className="px-4 py-2.5 text-black bg-green-600 mt-4 font-yan text-xl">
                                        Buy Now
                                    </button>
                                )
                            }


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CarftAndArtDetails;
