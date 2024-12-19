import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Fade } from "react-awesome-reveal";


const CustomCarousel = () => {
  return (
    <div className="bg-[#F4F4F4]">
      <div className="container mx-auto ">
        <div className="flex justify-between items-center pt-10 md:pt-20 gap-8 px-3">
          {/* Left static image */}
          <div className="h-[500px] hidden lg:block flex justify-center items-center">
            <img
              src="https://i.ibb.co.com/gZGs1xH/slider1.png"
              alt="Left"
              className="object-cover w-[440px] h-full"
            />
          </div>

          {/* Swiper for Center */}
          <div className="md:w-[380px] w-[280px] h-[400px] md:h-[500px] lg:h-[580px] mx-auto">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={60}
              slidesPerView={1}
              autoplay={{ delay: 6000 }}
              loop={true}
              speed={1000}
              pagination={{ clickable: true }}
              className="lg:h-[570px] h-[400px] md:h-[500px]"
            >
              {/* Center Slide 1 */}
              <SwiperSlide>
                <div className="">
                  <img
                    src="https://i.ibb.co.com/rdr5GJg/frame1.png"
                    alt="Center Image 1"
                    className=" md:w-full h-full object-cover rounded-lg"
                  />
                  <div className="px-10 mt-3">
                    <Fade delay={1000} cascade damping={0.1} direction="left">
                      <p className="text-black-600 font-raj">
                        <span className="md:text-xl text-lg text-[#0eb2e7] font-yan">Frame Type:</span>
                        <span> Metal Frames</span>
                      </p>
                      <p className="text-black-600 mt-2 font-raj">
                        <span className="md:text-xl text-lg text-[#0eb2e7] font-yan">Artist:</span>
                        <span> Barry Allen</span>
                      </p>
                      <p className="text-black-600 mt-2 font-raj">
                        <span className="md:text-xl text-lg text-[#0eb2e7] font-yan">Price:</span>
                        <span> 20$</span>
                      </p>
                    </Fade>
                  </div>

                </div>
              </SwiperSlide>

              {/* Center Slide 2 */}
              <SwiperSlide>
                <div className="">
                  <img
                    src="https://i.ibb.co.com/sVRRScy/frame3.png"
                    alt="Center Image 2"
                    className="md:w-full h-full object-cover rounded-lg"
                  />
                  <div className="px-10 mt-3">
                    <Fade delay={1000} cascade damping={0.1} direction="left">
                      <p className="text-black-600 font-raj"><span className="md:text-xl text-lg text-[#0eb2e7] font-yan">Frame Type: </span> Metal Frames</p>
                      <p className="text-black-600 mt-2 font-raj"> <span className="md:text-xl text-lg text-[#0eb2e7] font-yan">Artist: </span> Barry Allen</p>
                      <p className="text-black-600 mt-2 font-raj"> <span className="md:text-xl text-lg text-[#0eb2e7] font-yan">Price: </span> 20$</p>
                    </Fade>
                  </div>
                </div>
              </SwiperSlide>

              {/* Center Slide 3 */}
              <SwiperSlide>
                <div className="">
                  <img
                    src="https://i.ibb.co.com/rdr5GJg/frame1.png"
                    alt="Center Image 3"
                    className="md:w-full h-full object-cover rounded-lg"
                  />
                  <div className="px-10 mt-3">
                    <Fade delay={1000} cascade damping={0.1} direction="left">
                      <p className="text-black-600 font-raj"><span className="md:text-xl text-lg text-[#0eb2e7] font-yan">Frame Type: </span> Metal Frames</p>
                      <p className="text-black-600 mt-2 font-raj"> <span className="md:text-xl text-lg text-[#0eb2e7] font-yan">Artist: </span> Barry Allen</p>
                      <p className="text-black-600 mt-2 font-raj"> <span className="md:text-xl text-lg text-[#0eb2e7] font-yan">Price: </span> 20$</p>
                    </Fade>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Right static image */}
          <div className="h-[500px] hidden lg:block flex justify-center items-center">
            <img
              src="https://i.ibb.co.com/ZYHZHfG/slider2.png"
              alt="Right"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default CustomCarousel;
