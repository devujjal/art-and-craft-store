
const DescriptionCard = () => {
    return (
        <div className="bg-[#F4F4F4]">
            <div className="container mx-auto">
            <div className="flex flex-col items-center lg:flex-row py-5">
                <div className="bg-[url('https://i.ibb.co.com/J56z2Y2/about-img1.jpg')] bg-cover bg-center h-[400px] w-[300px] sm:h-[500px] lg:w-full md:w-[700px] p-2 mb-4 md:mb-0">
                </div>
                <div className="w-full px-4 md:px-14 py-3">
                    <h2 className="text-[40px] font-normal font-yan text-[#3e454c] leading-10 mb-5">The Artful Journey: Brushstrokes of Imagination</h2>
                    <p className="font-raj text-base font-normal mb-5">Step into a world where creativity meets craftsmanship, where each brushstroke weaves a tale of passion and precision. Painting and drawing are not just forms of art; they are expressions of the soul, a visual dialogue between the creator and the viewer. From serene landscapes that transport you to tranquil realms to portraits that encapsulate the depth of human emotions, every piece is a masterpiece in its own right. The interplay of colors, textures, and techniques brings life to blank canvases, transforming them into windows to another world.<br /> <br />

                    Our craft celebrates the timeless beauty of artistic expression, blending tradition with innovation. Whether it&apos;s the delicate flow of watercolor, the bold strokes of oil paints, or the intricate details of pencil sketches, each creation reflects the magic of imagination. Explore the harmony of space and color, where art isn&apos;t just seen but felt, and let yourself be inspired by the boundless potential of creativity. Join us on this journey to discover the beauty of painting and drawing like never before!</p>
                    <button className="px-8 py-3 bg-[#0eb2e7] hover:bg-[#48A2D4] text-lg text-white font-normal font-yan">More Details</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default DescriptionCard;