import React from "react";
import { ProductsTabs } from "type";
import Product from "./Product";

interface Prop {
  tabs: ProductsTabs | null;
}

const ProductsTab = ({ tabs }: Prop) => {
  const { tabList, tabPanel } = tabs!;
  return (
    <>
      <section className="food_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>منو محصولات</h2>
          </div>

          <ul className="filters_menu">
            {tabList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <div className="filters-content">
            {tabPanel.map((panel, index1) => (
              <div key={index1} className="row grid">
                {panel.map((product, index2) => (
                  <Product key={index2} {...product} />
                ))}
              </div>
            ))}
          </div>
          <div className="btn-box">
            <a href="">مشاهده بیشتر</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsTab;
