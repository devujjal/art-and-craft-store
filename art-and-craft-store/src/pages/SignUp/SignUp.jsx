import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from 'sweetalert2'
import { updateProfile } from "firebase/auth";


const SignUp = () => {

    const { createNewUser } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('') /// password error message
    const [errorConPass, setErrorConPass] = useState('')  // confirm password
    const [errorEmail, setErrorEmail] = useState('') /// error gmail
    const [showPassword, setShowPassword] = useState(false)  // password show and hide

    const handleSignUp = (event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const photoURL = form.get('photoURL');
        const password = form.get('password');
        const confirmPassword = form.get('confirm-password');

        setErrorMessage('');
        setErrorConPass('');
        setErrorEmail('');

        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (password !== confirmPassword) {
            return setErrorConPass('Passwords do not match. Please try again.')
        } else if (!password.length > 6) {
            return setErrorMessage('Password must be at least 7 characters long')
        } else if (!/[A-Z]/.test(password)) {
            return setErrorMessage("Password must include at least one uppercase letter.");
        } else if (!/[a-z]/.test(password)) {
            return setErrorMessage("Password must include at least one lowercase letter.");
        } else if (!gmailRegex.test(email)) {
            return setErrorEmail("Please enter a valid Gmail address.");
        }


        createNewUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                form.reset();
                updateProfile(user, {
                    displayName: name,
                    photoURL: photoURL
                }).then(() => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'User Created Successfully!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })

                }).catch((error) => {
                    if (error) {
                        Swal.fire({
                            title: 'error!',
                            text: 'Something is Wrong!',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    }

                })

            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                if (errorMessage) {
                    Swal.fire({
                        title: 'error!',
                        text: 'You already have an Account!',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
            })

    }
    return (
        <section>
            <div className="container mx-auto">
                <div className="py-10">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full border mx-auto">
                        <h2 className="text-4xl font-yan font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                        <form onSubmit={handleSignUp}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-xl text-gray-700 font-semibold mb-2 font-yan">Your Name</label>
                                <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-raj text-base" placeholder="Enter your name" required />

                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-xl font-yan">Email</label>
                                <input type="email" name="email" id="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-raj text-base" placeholder="Enter your email" required />

                                {
                                    errorEmail && (
                                        <p className="text-red-500 text-sm mt-2 font-raj" id="emailError">{errorEmail}</p>
                                    )
                                }


                            </div>
                            <div className="mb-4">
                                <label htmlFor="phtoURL" className="block text-gray-700 font-semibold mb-2 text-xl font-yan">Photo URL</label>
                                <input type="text" name="photoURL" id="photoURL" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-raj text-base" placeholder="Enter your Photo URL" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-xl font-yan">Password</label>
                                <div className="relative flex justify-center items-center">
                                    <input type={showPassword ? 'text' : 'password'} name="password" id="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-raj text-base" placeholder="Enter your password" required />

                                    {
                                        showPassword ?
                                            <svg
                                                onClick={() => setShowPassword(!showPassword)}

                                                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute  right-4 cursor-pointer"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg> :

                                            <svg
                                                onClick={() => setShowPassword(!showPassword)}
                                                xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                            </svg>
                                    }


                                </div>

                                {
                                    errorMessage && (
                                        <p className="text-red-500 text-sm mt-2 font-raj" id="passwordError">{errorMessage}</p>
                                    )
                                }

                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-2 font-yan text-xl">Confirm Password</label>

                                <div className="relative flex justify-center items-center">
                                    <input type={showPassword ? 'text' : 'password'} name="confirm-password" id="confirm-password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-raj text-base" placeholder="Confirm your password" required />

                                    {
                                        showPassword ?
                                            <svg
                                                onClick={() => setShowPassword(!showPassword)}

                                                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute  right-4 cursor-pointer"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg> :

                                            <svg
                                                onClick={() => setShowPassword(!showPassword)}
                                                xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                            </svg>
                                    }
                                </div>

                                {
                                    errorConPass && (
                                        <p className="text-red-500 text-sm mt-2 font-raj" id="confirmPasswordError">{errorConPass}</p>
                                    )
                                }


                            </div>
                            <button type="submit" className="w-full bg-[#0eb2e7] hover:bg-[#1195bf] text-white py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 text-yan text-lg">Register</button>
                        </form>
                        <p className="text-center text-gray-600 mt-4 font-yan text-lg">Already have an account? <Link to={'/sign-in'} className="text-blue-500 font-semibold">Sign In</Link></p>
                    </div>
                </div>

            </div >
        </section >
    );
};

export default SignUp;


/* 

<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute  right-4 cursor-pointer"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg> 

                                            <svg
                                                onClick={() => setShowPassword(!showPassword)}
                                                xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                            </svg>
*/