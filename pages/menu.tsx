import Product from "@/components/product/Product";
import { AxiosError } from "axios";
import { handleError } from "lib/handleError";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiAxios from "service/axios";
import {
  ErrorResponse,
  MenuItemsRoot,
  MenuItem,
  ProductRoot,
  ProductData,
  ProductType,
} from "type";

interface PropCategories {
  categories: MenuItem[];
  error: AxiosError<ErrorResponse, any> | undefined;
  menu: ProductData;
}

const Menu = ({ categories, error, menu }: PropCategories) => {
  const router: NextRouter = useRouter();
  const [search, setSearch] = useState<string>(
    router.query.search?.toString() || ""
  );
  const [productList, setProductList] = useState<ProductType[]>(menu?.products);
  const [loadingProductList, setLoadingProductList] = useState(false);
  useEffect(() => {
    error && toast.error(error.message);
  }, [error]);
  console.log(router.query.search);
  const handleFilter = (val: { [key: string]: string }) => async () => {
    console.log(router.query); //it gives you last url params
    console.log(val); //it gives you what you click on
    const myQuery: any = { ...router.query, ...val };
    console.log(myQuery);
    const searchParams = new URLSearchParams(myQuery).toString();

    //if you are in page 2 and then click on pizza sorting, delete page
    //but if you click on page 2, go there and don't delete page from query
    if (!val.hasOwnProperty('page')) {
      delete myQuery.page
    }

    try {
      setLoadingProductList(true);
      const res = await apiAxios.get<ProductRoot>(`menu?${searchParams}`);
      setProductList(res.data.data.products);
      router.push(`menu?${searchParams}`, undefined, { shallow: true });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProductList(false);
    }
  };

  return (
    <section className="food_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <div>
              <label className="form-label">جستجو</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="نام محصول ..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <button
                  disabled={!search}
                  onClick={handleFilter({ search })}
                  className="input-group-text"
                  id="basic-addon2"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
            <hr />
            <div className="filter-list">
              <div className="form-label">دسته بندی</div>
              <ul>
                {categories?.map((category, i) => (
                  <li
                    className={`my-2 cursor-pointer ${
                      router.query.category === category.id.toString()
                        ? "filter-list-active"
                        : ""
                    } `}
                    key={i}
                    onClick={handleFilter({ category: category.id.toString() })}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <label className="form-label">مرتب سازی</label>
              <div className="form-check my-2">
                <input
                  onChange={handleFilter({ sortBy: "max" })}
                  checked={router.query.sortBy === "max"}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="flexRadioDefault1"
                >
                  بیشترین قیمت
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  onChange={handleFilter({ sortBy: "min" })}
                  checked={router.query.sortBy === "min"}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="flexRadioDefault2"
                >
                  کمترین قیمت
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  onChange={handleFilter({ sortBy: "bestseller" })}
                  checked={router.query.sortBy === "bestseller"}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="flexRadioDefault3"
                >
                  پرفروش ترین
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  onChange={handleFilter({ sortBy: "sale" })}
                  checked={router.query.sortBy === "sale"}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault4"
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="flexRadioDefault4"
                >
                  با تخفیف
                </label>
              </div>
            </div>
          </div>

          {loadingProductList ? (
            <div className="col-sm-12 col-lg-9">
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border"></div>
              </div>
            </div>
          ) : productList.length ? (
            <>
              <div className="col-sm-12 col-lg-9">
                <div className="row gx-3">
                  {productList?.map((product, index) => (
                    <React.Fragment key={index}>
                      <Product {...product} />
                    </React.Fragment>
                  ))}
                </div>
                <nav className="d-flex justify-content-center mt-5">
                  <ul className="pagination">
                    {menu?.meta.links.slice(1, -1).map((link, index) => {
                      return (
                        <li
                          className={`page-item ${link.active ? "active" : ""}`}
                          key={index}
                        >
                          <button
                            onClick={handleFilter({ page: link.label })}
                            className="page-link"
                          >
                            {link.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </>
          ) : (
            <div className="col-sm-12 col-lg-9">
              <div className="d-flex justify-content-center align-items-center h-100">
                <h5>محصولی یافت نشد</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;

export const getServerSideProps = async ({
  resolvedUrl,
}: {
  resolvedUrl: string;
}) => {
  try {
    const resCategories = await apiAxios.get("/categories");
    const dataCategories: MenuItemsRoot = await resCategories.data;
    const resProducts = await apiAxios.get(resolvedUrl);
    const dataProducts: ProductRoot = await resProducts.data;
    return {
      props: {
        categories: dataCategories.data,
        menu: dataProducts.data,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        // categories: null,
        // menu: null,
        error: handleError(error as AxiosError<ErrorResponse, any>),
      },
    };
  }
};
