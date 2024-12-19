
const Footer = () => {
    return (
        <footer className="bg-black text-white py-10 md:pb-10 md:pt-14">
            <div className="container mx-auto flex gap-8 px-10 py-4 flex-col md:flex-row">
                <div className="w-full md:w-1/3">
                    <h2 className="font-normal text-[28px] font-yan">Art & Craft evolved from the primordial...</h2>
                    <p className="text-gray-400 font-raj text-base md:text-lg  mt-4">
                        Arts and crafts evolved from the fixed notions of fundamental ideas to the modern usage of available materials and truthful representation of the existing lifestyles around the place.
                    </p>
                </div>

                <div className="w-full md:w-[16.66666667%]">
                    <h2 className="font-normal text-[28px] font-yan">Elsewhere</h2>
                    <ul className="text-gray-400 mt-4 space-y-2 font-raj text-base md:text-lg">
                        <li><a href="#" className="hover:text-white">Facebook</a></li>
                        <li><a href="#" className="hover:text-white">Pinterest</a></li>
                        <li><a href="#" className="hover:text-white">Twitter</a></li>
                        <li><a href="#" className="hover:text-white">Dribbble</a></li>
                    </ul>
                </div>

                <div className="w-full md:w-1/4">
                    <h2 className="font-normal text-[28px] font-yan">Our Address</h2>
                    <p className="text-gray-400 mt-4 font-raj text-base md:text-lg">
                        625 @ David Blake Road, Adventureland, LA 14536, USA
                    </p>
                    <p className="text-gray-400 mt-4 font-raj text-base md:text-lg">
                        📞 (111) 555-2222
                    </p>
                    <p className="text-gray-400 mt-2 font-raj text-base md:text-lg">
                        ✉️ <a href="mailto:admin@example.com" className="hover:text-white">admin@example.com</a>
                    </p>
                </div>

                <div className="w-full md:w-1/4">
                    <h2 className="font-normal text-[28px] font-yan">Support</h2>
                    <ul className="text-gray-400 mt-4 space-y-2 font-raj text-base md:text-lg">
                        <li><a href="#" className="hover:text-white">Our Proud Career</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Terms of Use</a></li>
                        <li><a href="#" className="hover:text-white">FAQ</a></li>
                    </ul>
                </div>
            </div>
        </footer>

    );
};

export default Footer;