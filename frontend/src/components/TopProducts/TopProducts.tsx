import { useGetHightRaitingQuery } from "../../app/api/dataFromDummy";
import { CircularProgress, Typography, Card, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./topProducts.scss";

import { Pagination } from "swiper/modules";
import ProductBox from "../productBox/ProductBox";

const TopProducts = () => {
  const { data, isError, isLoading } = useGetHightRaitingQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  // Показать сообщение об ошибке, если что-то пошло не так
  if (isError) {
    return (
      <Typography variant="h6" color="error">
        Ошибка загрузки данных
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Топ-продукты
      </Typography>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        {data?.products.map((product) => (
          <SwiperSlide>
            <ProductBox product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopProducts;
