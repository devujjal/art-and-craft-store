import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const CarftItemCard = ({ carftItem }) => {
    const {img, description, name, subcategory} = carftItem;

    return (

        <div className="w-full md:max-w-[350px] flex flex-col bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
                <img className="rounded-t-lg h-64 w-full" src={img} alt="" />
            </a>
            <div className="p-5 flex flex-col flex-1">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 flex-grow">{description}</p>
                <Link to={`/${subcategory}`} className="inline-flex items-center px-3 w-28 py-2 text-sm font-medium text-center text-white bg-[#0eb2e7] rounded-lg hover:bg-[#48A2D4] focus:ring-4 focus:outline-none focus:ring-blue-300">
                    View All
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>

    );
};

CarftItemCard.propTypes = {
    carftItem: PropTypes.object
}

export default CarftItemCard;