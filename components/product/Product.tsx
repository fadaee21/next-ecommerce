import { numberFormat } from "lib/numberFormat";
import Image from "next/image";
import React from "react";
import { TabPanelItem } from "type";

const Product = ({
  name,
  description,
  primary_image,
  primary_image_blurDataURL,
  is_sale,
  price,
  sale_price,
}: TabPanelItem) => {
  return (
    <div className="col-sm-6 col-lg-4">
      <div className="box">
        <div>
          <div className="img-box">
            <Image
              width={366}
              height={244}
              className="img-fluid"
              src={primary_image}
              alt={`image of ${name}`}
              placeholder="blur"
              blurDataURL={primary_image_blurDataURL}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="detail-box">
            <h5>{name}</h5>
            <p>{description}</p>
            <div className="options">
              <h6>
                {is_sale && sale_price ? (
                  <>
                    <span>{numberFormat(sale_price)}</span>
                    <del className="me-1">{numberFormat(price)}</del>
                  </>
                ) : (
                  <span>{numberFormat(price)}</span>
                )}
                <span> تومان </span>
              </h6>
              <a href="">
                <i className="bi bi-cart-fill text-white fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
