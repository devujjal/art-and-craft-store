import CarftItemCard from '../../componets/CarftItemCard/CarftItemCard';
import DescriptionCard from '../../layouts/Home/DescriptionCard/DescriptionCard';
import HeroSection from '../../layouts/Home/HeroSection/HeroSection'
import WorkOfArt from '../../layouts/Home/WorkOfArt/WorkOfArt';
import { useEffect, useState } from 'react';


const HomePage = () => {

    const [carftItems, setCarftItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const skeletonItems = new Array(6).fill(null);


    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:5000/six-craft-items')
            .then(res => res.json())
            .then(data => {
                setCarftItems(data)
                setIsLoading(false)
            })
    }, [])

    return (
        <>
            <section>
                <HeroSection />
            </section>
            <section className='py-16'>
                <WorkOfArt />
            </section>
            <section>
                <DescriptionCard />
            </section>
            <section className='py-16'>
                <div className='container mx-auto'>
                    <div className='text-center px-5 md:px-20 lg:px-60 mb-12'>
                        <h2 className='text-[40px] font-yan text-[#3e454c]'>Art & Craft Categories</h2>
                        <p className="font-raj text-base font-normal">Step into a world of creativity with our six unique art and craft categories. Whether it&apos;s the beauty of landscapes, the charm of portraits, or the vibrance of watercolors, there&apos;s something here to spark your imagination. Dive into bold oil paintings, detailed charcoal sketches, and fun cartoon designs. Each category is a doorway to artistic expression — discover what speaks to you!</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-10 px-4 md:px-4 lg:px-16'>
                        {
                            isLoading ? (
                                skeletonItems.map((ignored, index) => (
                                    <div key={index} className="flex flex-col rounded shadow-md w-full md:max-w-[350px] animate-pulse h-96">
                                        <div className="h-56 rounded-t dark:bg-gray-300"></div>
                                        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                                            <div className="w-full h-6 rounded dark:bg-gray-300"></div>
                                            <div className="w-full h-6 rounded dark:bg-gray-300"></div>
                                            <div className="w-3/4 h-6 rounded dark:bg-gray-300"></div>
                                        </div>
                                    </div>
                                ))

                            ) :

                                (
                                    carftItems.map(carftItem => <CarftItemCard carftItem={carftItem} key={carftItem._id} />)
                                )

                        }
                    </div>
                </div>

            </section>
        </>
    );
};

export default HomePage;