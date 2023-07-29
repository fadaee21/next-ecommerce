import { AxiosError } from "axios";
import { handleError } from "lib/handleError";
import { numberFormat } from "lib/numberFormat";
import { salePercent } from "lib/salePercent";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiAxiosServer from "service/axios";
import { ErrorResponse, ProductsTabsComplete, TabPanelItem } from "type";
import Image from "next/image";
import Product from "@/components/product/Product";
interface Prop {
  product: TabPanelItem | undefined;
  randomProduct: TabPanelItem[] | undefined;
  error: AxiosError<ErrorResponse, any> | null;
}

const ProductPage = ({ product, error, randomProduct }: Prop) => {
  const {
    name,
    is_sale,
    sale_price,
    price,
    description,
    quantity: quantityRes,
    images,
    primary_image,
    primary_image_blurDataURL,
  } = product || {};
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    error && toast.error(error.message);
  }, [error]);
  console.log(randomProduct);
  return (
    <>
      {product && (
        <section className="single_page_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="row gy-5">
                  <div className="col-sm-12 col-lg-6">
                    <h3 className="fw-bold mb-4">{name}</h3>
                    <h5 className="mb-3">
                      {is_sale && sale_price ? (
                        <>
                          <span>{numberFormat(sale_price)}</span>
                          <del className="me-1">{numberFormat(price || 0)}</del>
                        </>
                      ) : (
                        <span>{numberFormat(price || 0)}</span>
                      )}
                      <span> تومان </span>
                      {is_sale && sale_price && (
                        <div className="text-danger fs-6">
                          {salePercent(price || 0, sale_price)}% تخفیف
                        </div>
                      )}
                    </h5>
                    <p>{description}</p>

                    <div className="mt-5 d-flex">
                      <button className="btn-add">افزودن به سبد خرید</button>
                      <div className="input-counter ms-4">
                        <span
                          className="plus-btn"
                          onClick={() =>
                            quantity < (quantityRes || 10) &&
                            setQuantity((val) => val + 1)
                          }
                        >
                          +
                        </span>
                        <div className="input-number">{quantity}</div>
                        <span
                          className="minus-btn"
                          onClick={() =>
                            quantity > 1 && setQuantity((val) => val - 1)
                          }
                        >
                          -
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 col-lg-6">
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-indicators">
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="0"
                          className="active"
                          aria-current="true"
                          aria-label="Slide 1"
                        ></button>
                        {images?.map((_image, index) => (
                          <button
                            key={index + 1}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index + 1}
                            aria-label="Slide 2"
                          />
                        ))}
                      </div>
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <Image
                            src={primary_image || ""}
                            className="d-block w-100"
                            alt="primary-image"
                            placeholder="blur"
                            blurDataURL={primary_image_blurDataURL}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            width={464}
                            height={309}
                            priority
                          />
                        </div>

                        {images?.map((image, index) => (
                          <div className="carousel-item" key={index}>
                            <Image
                              src={image.image}
                              className="d-block w-100"
                              alt="primary-image"
                              placeholder="blur"
                              blurDataURL={primary_image_blurDataURL}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              width={464}
                              height={309}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <hr />
      {randomProduct && (
        <section className="food_section my-5">
          <div className="container">
            <div className="row gx-3">
              {randomProduct.map((product) => (
                <div key={product.id} className="col-sm-6 col-lg-3">
                  <Product {...product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default ProductPage;

type Query = { query: { slug: string } };
export const getServerSideProps = async ({ query }: Query) => {
  try {
    const res = await apiAxiosServer.get(`/products/${encodeURI(query.slug)}`);
    const resRandom = await apiAxiosServer.get(`/random-products?count=4`);
    const data: ProductsTabsComplete = await res.data;
    const randomProduct: ProductsTabsComplete = await resRandom.data;
    console.log(res);
    return {
      props: {
        product: data.data,
        randomProduct: randomProduct.data,
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
