import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const MySwiper = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      scrollbar={{ draggable: true }}
      loop={true}
    >
      <SwiperSlide>
        <div
          style={{
            backgroundImage:
              "url(/images/llorona/nextimage-mejorterrazacdmxcantinalallorona.webp)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            backgroundImage:
              "url(https://imagenesrutalab.s3.amazonaws.com/llorona/cumple/pinatacumpleanera.JPG)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            backgroundImage:
              "url(/images/llorona/nextimage-festejo-cantina-llorona-salsa-baile.webp)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            backgroundImage:
              "url(/images/llorona/nextimage-grupo-salsa-mexico.webp)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            backgroundImage:
              "url(/images/llorona/nextimage-mixologiaincreible.webp)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        ></div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          style={{
            backgroundImage:
              "url(https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/fotosBanner/IMG_3087.jpg)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </SwiperSlide>
      {/* Agrega más SwiperSlide según sea necesario */}
    </Swiper>
  );
};

export default MySwiper;
