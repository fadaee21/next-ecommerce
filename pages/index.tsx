import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import apiAxios from "service/axios";
import { ErrorResponse, ProductsTabs, ProductsTabsComplete } from "type";
import Features from "@/components/features";
import { handleError } from "lib/handleError";
import ProductsTab from "@/components/product/ProductsTab";
interface HomeProps {
  productsTab: ProductsTabs | null;
  error: AxiosError<ErrorResponse, any> | null;
}

const Home = ({ productsTab, error }: HomeProps) => {
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  return (
    <>
      <Features />
      {productsTab && <ProductsTab tabs={productsTab} />}
    </>
  );
};
export default Home;

export const getServerSideProps = async () => {
  try {
    const res = await apiAxios.get("/products/products-tabs");
    const data: ProductsTabsComplete = await res.data;
    return {
      props: {
        productsTab: data.data,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        productsTab: null,
        error: handleError(error as AxiosError<ErrorResponse, any>),
      },
    };
  }
};
