import Layout from "@/components/profile/Layout";
import useSWR from "swr";
import { toast } from "react-toastify";
import Loading from "@/components/profile/Loading";
import { handleError } from "lib/handleError";
import { OrderData } from "type";
import { numberFormat } from "lib/numberFormat";
import Image from "next/image";
import { useState } from "react";

const ProfileOrdersPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, error } = useSWR<OrderData>(
    `/profile/orders?page=${pageIndex}`
  );

  if (error) {
    toast.error(handleError(error));
  }

  if (!data)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>شماره سفارش</th>
              <th>آدرس</th>
              <th>وضعیت</th>
              <th>وضعیت پرداخت</th>
              <th>قیمت کل</th>
              <th>تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {data?.orders.map((order) => {
              const {
                id,
                address_title,
                status,
                payment_status,
                paying_amount,
                created_at,
                order_items,
              } = order;
              return (
                <tr key={id}>
                  <th>{id}</th>
                  <td>{address_title}</td>
                  <td>{status}</td>
                  <td>
                    <span
                      className={
                        payment_status === "موفق"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {payment_status}
                    </span>
                  </td>
                  <td>{numberFormat(paying_amount)} تومان</td>
                  <td> {created_at}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#modal-${id}`}
                    >
                      محصولات
                    </button>
                    <div className="modal fade" id={`modal-${id}`}>
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h6 className="modal-title">
                              محصولات سفارش شماره {id}
                            </h6>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <table className="table align-middle">
                              <thead>
                                <tr>
                                  <th>محصول</th>
                                  <th>نام</th>
                                  <th>قیمت</th>
                                  <th>تعداد</th>
                                  <th>قیمت کل</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order_items.map((order_item) => {
                                  const {
                                    id,
                                    product_primary_image,
                                    price,
                                    quantity,
                                    subtotal,
                                    product_name,
                                  } = order_item;
                                  return (
                                    <tr key={id}>
                                      <th>
                                        <Image
                                          src={product_primary_image}
                                          width={70}
                                          height={53}
                                          alt="primary-image"
                                        />
                                      </th>
                                      <td className="fw-bold">
                                        {product_name}
                                      </td>
                                      <td>{numberFormat(price)} تومان</td>
                                      <td>{quantity}</td>
                                      <td>{numberFormat(subtotal)} تومان</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav className="d-flex justify-content-center mt-5">
        <ul className="pagination">
          {data?.meta.links.slice(1, -1).map((link, index) => {
            return (
              <li
                className={`page-item ${link.active ? "active" : ""}`}
                key={index}
              >
                <button
                  onClick={() => setPageIndex(+link.label)}
                  className="page-link"
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </Layout>
  );
};

export default ProfileOrdersPage;
