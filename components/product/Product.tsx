import { numberFormat } from "lib/numberFormat";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import apiAxiosServer from "service/axios";
import { TabPanelItem } from "type";

const Product = ({
  name,
  description,
  primary_image,
  primary_image_blurDataURL,
  is_sale,
  price,
  sale_price,
  slug,
}: TabPanelItem) => {
  return (
    <div className="box">
      <div className="img-box">
        <Image
          width={340}
          height={226}
          className="img-fluid"
          src={primary_image}
          alt={`image of ${name}`}
          placeholder="blur"
          blurDataURL={primary_image_blurDataURL}
          style={{ objectFit: "cover", width: "100%",height:"12rem" }}
        />
      </div>
      <div className="detail-box">
        <h5>
          <Link href={`product/${slug}`}>{name}</Link>
        </h5>

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
  );
};

export default Product;
