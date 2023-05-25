import React from "react";
import { ProductsTabs } from "type";
import Product from "./Product";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
interface Prop {
  tabs: ProductsTabs;
}

const ProductsTab = ({ tabs }: Prop) => {
  const { tabList, tabPanel } = tabs;
  return (
    <>
      <section className="food_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>منو محصولات</h2>
          </div>
          <Tabs selectedTabClassName="active">
            {/* active class is what we define in our css */}
            <TabList>
              <ul className="filters_menu">
                {tabList.map((item, i) => (
                  <Tab key={i}>{item}</Tab>
                ))}
              </ul>
            </TabList>
            <div className="filters-content">
              {tabPanel.map((panel, index1) => (
                <TabPanel key={index1}>
                  <div className="row grid">
                    {panel.map((product, index2) => (
                      <Product key={index2} {...product} />
                    ))}
                  </div>
                </TabPanel>
              ))}
            </div>
          </Tabs>
          <div className="btn-box">
            <a href="">مشاهده بیشتر</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsTab;
