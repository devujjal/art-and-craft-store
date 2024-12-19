import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import CarftAndArtCard from "../../componets/CaftAndArtCard/CarftAndArtCard";
import axios from "axios";

const MyArtAndCraft = () => {

    const { user } = useContext(AuthContext)
    const [myItems, setMyItems] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/all-art-and-craft-items?email=${user?.email}`, {
            withCredentials: true
        })
        .then(res => {
            const data = res.data;
            setMyItems(data)
        })
        .catch(error => {
            console.log(error)
        })

        // fetch(``)
        //     .then(res => res.json())
        //     .then(data => {
        //         setMyItems(data)
        //     })
    }, [user?.email])


    return (
        <section>
            <div className="container mx-auto">
                <div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-14 px-4">
                    {
                        myItems.map((myItem) => <CarftAndArtCard
                            key={myItem._id}
                            myOwnItem={true}
                            myItems={myItems}
                            setMyItems={setMyItems}
                            artAndCraftItem={myItem}

                        />)
                    }
                </div>
            </div>
        </section>
    );
};

export default MyArtAndCraft;