import { useGetHightRaitingQuery } from "../../app/api/dataFromDummy";
import { CircularProgress, Typography, Box, CardMedia } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import "./topProducts.scss";

import { Autoplay, EffectCube, Pagination } from "swiper/modules";

const TopProducts = () => {
  const { data, isError, isLoading } = useGetHightRaitingQuery();

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return (
      <Typography variant="h6" color="error">
        Ошибка загрузки данных
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Autoplay, EffectCube, Pagination]}
        className="mySwiper">
        {data?.products.map((product) => (
          <SwiperSlide key={product.id}>
            <Box sx={{ width: "100%", height: "50vh", boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.5)" }}>
              <CardMedia sx={{ width: "100%", height: "100%", zIndex: 1, position: "relative", backgroundPosition: "center", backgroundSize: "contain" }} image={product.images[1] || product.images[0]} title="Top" />
            </Box>
            <Typography variant="h2" sx={{ fontSize: "clamp(2rem, 10vw, 10rem)", textOverflow: "ellipsis", fontWeight: "900", position: "absolute", color: "white" }}>
              {product.brand || product.title}
            </Typography>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TopProducts;
