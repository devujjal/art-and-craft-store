import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const CarftAndArtCard = ({ artAndCraftItem, myOwnItem, myItems, setMyItems }) => {

    const {
        _id,
        image,
        stockStatus,
        item_name,
        subcategory_Name,
        price, rating } = artAndCraftItem;

    const handleDeleteItem = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/all-art-and-craft-items/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        const exist = myItems.filter(item => item._id !== _id);
                        setMyItems(exist)
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })


            }
        });
    }


    return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl w-full flex flex-col">

            <img className="h-48 w-full object-cover object-end" src={image} alt="Home in Countryside" />

            <div className="p-6 flex flex-col flex-1 justify-between">
                <div className="flex items-baseline">
                    <span className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">{stockStatus}</span>
                    <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                        {subcategory_Name}
                    </div>
                </div>
                <h4 className="mt-2 font-semibold text-lg leading-tight truncate">{item_name}</h4>

                <div className="mt-1">
                    <span>${price}</span>
                    <span className="text-gray-600 text-sm"></span>
                </div>
                <div className="mt-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-teal-600 font-semibold">
                                <span className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0eb2e7"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0eb2e7"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0eb2e7"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0eb2e7"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0eb2e7"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg>
                                </span>
                            </span>
                            <span className="ml-2 text-gray-600 text-sm">{rating} rating</span>
                        </div>
                        <Link to={`/all-art-and-craft/${_id}`} className="bg-[#0eb2e7] hover:bg-[#1195bf] p-1 rounded-full  transition duration-200"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3e454c"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" /></svg></Link>
                    </div>
                </div>
            </div>




            {
                myOwnItem && (
                    <div className="absolute top-0 flex justify-between w-full ">

                        <Link to={`/all-art-and-craft-items/${_id}/edit`} className="bg-teal-200 p-2 rounded-full hover:scale-110 transition"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg></Link>
                        <button onClick={handleDeleteItem} className="bg-teal-200 p-2 rounded-full hover:scale-110 transition"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg></button>
                    </div>
                )
            }
        </div>
    );
};

CarftAndArtCard.propTypes = {
    artAndCraftItem: PropTypes.object,
    myOwnItem: PropTypes.bool,
    myItems: PropTypes.array,
    setMyItems: PropTypes.func
}

export default CarftAndArtCard;