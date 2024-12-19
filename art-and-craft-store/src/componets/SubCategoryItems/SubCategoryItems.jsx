import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarftAndArtCard from "../CaftAndArtCard/CarftAndArtCard";

const SubCategoryItems = () => {
    const [subcategoryDatas, setSubcategoryDatas] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { subcategory } = useParams();

    const skeletonItems = new Array(8).fill(null);

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:5000/all-art-and-craft-items?sub_category=${subcategory}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setSubcategoryDatas(data)
                setIsLoading(false)
            })
    }, [subcategory])

    return (
        <section>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-14 px-4">
                    {
                        isLoading ? (
                            skeletonItems.map((unUsed, index) => (
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
                                subcategoryDatas.map((subcategoryData) => <CarftAndArtCard
                                    key={subcategoryData._id}
                                    artAndCraftItem={subcategoryData}
                                />)
                            )
                    }
                </div>
            </div>
        </section>
    );
};

export default SubCategoryItems;