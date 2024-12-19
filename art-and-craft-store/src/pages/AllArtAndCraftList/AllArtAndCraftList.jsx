import CarftAndArtCard from "../../componets/CaftAndArtCard/CarftAndArtCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { ToastContainer, toast } from 'react-toastify';


const AllArtAndCraftList = () => {

    const axios = useAxiosCommon();
    // const [artAndCraftItems, setArtAndCraftItems] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const itemsPerPage = 10; if 
    const skeletonItems = new Array(8).fill(null);



    // data fetch

    const { data: artAndCraftItems, error, isError, isLoading } = useQuery({
        queryKey: ['allItems'],
        queryFn: async () => {
            const { data } = await axios.get('/all-art-and-craft-items')
            return data || [];
        }
    })



    console.log(artAndCraftItems)




    if (isError) {
        return toast.error(error.message)
    }



    return (
        <section>
            <div className="container mx-auto">
                <div className="py-14">
                    <ToastContainer />
                    <div className="text-center px-10 md:px-20 lg:px-40">
                        <h1 className="text-[40px] font-yan text-[#3e454c]">Explore the World of Art & Craft</h1>
                        <p className="font-raj text-base font-normal mb-5">Unleash your creativity and discover a curated collection of exquisite art and craft items. From breathtaking paintings to intricate handmade creations, our selection showcases the beauty of artistic expression and craftsmanship. Whether you&apos;re looking for inspiration, decoration, or a unique gift, you&apos;ll find pieces that bring imagination to life and add a touch of elegance to any space.</p>
                    </div>

                    <div>
                        <div className="flex rounded-md border-2 border-[#0eb2e7] overflow-hidden max-w-md mx-auto">
                            <input type="email" placeholder="Search Something..."
                                className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3" />
                            <button type='button' className="flex items-center justify-center bg-[#0eb2e7] px-5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white">
                                    <path
                                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-14 px-4">

                        {
                            isLoading ? (

                                skeletonItems.map((_, index) => (
                                    <div key={index} className="flex flex-col rounded shadow-md w-full animate-pulse h-96">
                                        <div className="h-48 rounded-t dark:bg-gray-300"></div>
                                        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                                            <div className="w-full h-6 rounded dark:bg-gray-300"></div>
                                            <div className="w-full h-6 rounded dark:bg-gray-300"></div>
                                            <div className="w-3/4 h-6 rounded dark:bg-gray-300"></div>
                                        </div>
                                    </div>
                                ))

                            ) :

                                (
                                    artAndCraftItems.map((artAndCraftItem) => <CarftAndArtCard key={artAndCraftItem._id} artAndCraftItem={artAndCraftItem} />)
                                )

                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllArtAndCraftList;


// min-h-[calc(100vh-100px)]