import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use(
            (res) => res,
            async (error) => { // Make the error handler async
                if (error.response.status === 401 || error.response.status === 403) {

                    await signOutUser(); // Use await for cleaner code
                    navigate('/sign-in');

                }

                return Promise.reject(error); // Very important: re-throw the error
            }
        );

        return () => {
            axiosSecure.interceptors.response.eject(interceptor);
        } // Cleanup on unmount/dependency change


    }, [signOutUser, navigate]);

    

    return axiosSecure;
};

export default useAxiosSecure;