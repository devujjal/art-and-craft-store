import { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import CarftAndArtCard from "../../componets/CaftAndArtCard/CarftAndArtCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const OrdersPage = () => {
    const { user, setOrders, orders } = useContext(AuthContext)
    const { email } = user;
    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        axiosSecure.get(`/orders?email=${email}`, {
            withCredentials: true
        })
            .then(res => {
                setOrders(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [email, setOrders, axiosSecure])



    return (
        <section>
            <div className="container mx-auto">
                {orders.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-14 px-4">

                        {

                            orders.map(order => <CarftAndArtCard key={order?._id} artAndCraftItem={order} />)

                        }
                    </div> :
                    <div className="font-yan flex justify-center items-center h-screen"><p>No Data Found</p></div>

                }

            </div>
        </section>
    );
};

export default OrdersPage;