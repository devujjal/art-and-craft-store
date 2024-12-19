import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const SignIn = () => {

    const { signInUser } = useContext(AuthContext);
    const [displayPass, setDisplayPass] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSignIn = (event) => {
        event.preventDefault()
        const target = event.currentTarget;
        const form = new FormData(event.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        signInUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userEmail = { email };
                console.log(user)
                if (user) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Successfully Login!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })

                    navigate(location.state === null ? '/' : location.state);
                    target.reset();
                }

                axios.post('http://localhost:5000/jwt', userEmail, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })


            })
            .catch((error) => {
                const errorMessage = error.message;
                if (errorMessage) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something is wrong. Please try again!',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
            })
    }



    return (
        <section>
            <div className="container mx-auto">
                <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md font-yan ">
                        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-xl text-gray-600 max-w">
                            <span>Or </span>
                            <Link to={'/sign-up'} className="font-medium text-blue-600 hover:text-blue-500">
                                create an account
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form
                                onSubmit={handleSignIn}
                                className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-xl font-medium text-gray-700 font-yan">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input id="email" name="email" type="email" autoComplete="email" required
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base font-raj"
                                            placeholder="Enter your email address" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-xl font-medium text-gray-700 font-yan">
                                        Password
                                    </label>
                                    <div className="relative flex justify-center items-center mt-1">
                                        <input id="password" name="password" type={displayPass ? 'text' : 'password'} autoComplete="current-password" required
                                            className="rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base font-raj"
                                            placeholder="Enter your password" />

                                        {
                                            displayPass ?
                                                <svg
                                                    onClick={() => setDisplayPass(!displayPass)}

                                                    xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute  right-4 cursor-pointer"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg> :

                                                <svg
                                                    onClick={() => setDisplayPass(!displayPass)}
                                                    xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                                </svg>
                                        }
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember_me" name="remember_me" type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                        <label htmlFor="remember_me" className="ml-2 block text-base text-gray-900 font-yan">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-base">
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500 font-yan">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <button type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-yan">

                                        Sign in
                                    </button>
                                </div>
                            </form>
                            <div className="mt-6">

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-gray-100 text-gray-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    <div>
                                        <a href="#"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                                                alt="" />
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                                                alt="" />
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                            <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg"
                                                alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;