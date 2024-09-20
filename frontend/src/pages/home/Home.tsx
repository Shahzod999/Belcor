import { useGetAllProductsQuery } from "../../app/api/dataFromDummy";
import { selectedUserInfo } from "../../app/features/userInfoSlice";
import { useAppSelector } from "../../app/hooks";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import TopProducts from "../../components/TopProducts/TopProducts";
import ProductBox from "../../components/productBox/ProductBox";
import "./home.scss";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery({ limit: 60, skip: 0 });

  const user = useAppSelector(selectedUserInfo);

  console.log(data, "asd");

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <TopProducts />
      <div className="totalProduct">
        {data?.products.map((product) => (
          <ProductBox product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
