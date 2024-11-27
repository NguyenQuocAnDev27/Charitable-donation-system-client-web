// const AutoScrollImages = ({ images }) => {
//   return (
//     <div className="overflow-hidden">
//       <div className="flex items-center animate-scroll">
//         {images.concat(images).map((image, index) => (
//           <div key={index} className="flex-shrink-0 mx-2">
//             <img
//               src={image}
//               alt={`Image ${index}`}
//               className="h-30 w-auto object-contain"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const AutoScrollImages = ({ images }) => {
  return (
    <div className="overflow-hidden">
      <div className="flex items-center animate-scroll">
        {images.concat(images).map((image, index) => (
          <div key={index} className="relative flex-shrink-0 mx-4">
            <img
              src={image}
              alt={`Image ${index}`}
              className="h-30 w-auto object-contain"
            />
            {/* Add a line between images */}
            {index !== images.length * 2 - 1 && (
              <>
                <div className="absolute right-[-18px] top-[10%] h-[40%] w-1 bg-gradient-to-t from-gray-500 to-transparent"></div>
                <div className="absolute right-[-18px] top-[49%] h-[40%] w-1 bg-gradient-to-b from-gray-500 to-transparent"></div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


const ImageCarousel = () => {
  const images = [
    '/images/projects/demo_1.jpg',
    '/images/projects/demo_2.jpg',
    '/images/projects/demo_3.jpg',
  ];

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] 
      md:pt-[150px] 
      xl:pb-[160px] xl:pt-[180px] 
      2xl:pb-[100px] 2xl:pt-[110px] 2xl:mb-16"
    >
      <div className="container mx-auto py-10">
        <AutoScrollImages images={images} />
      </div>
    </section>
  );
}

export default ImageCarousel;
