import Layout from "@/components/profile/Layout";
import useSWR from "swr";
import { toast } from "react-toastify";
import Loading from "@/components/profile/Loading";
import { handleError } from "lib/handleError";
import { TransactionData } from "type";
import { numberFormat } from "lib/numberFormat";
import Image from "next/image";
import { useState } from "react";

const ProfileOrdersPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, error } = useSWR<TransactionData>(
    `/profile/transactions?page=${pageIndex}`
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
  const { transactions } = data;
  return (
    <Layout>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>شماره سفارش</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>شماره پیگیری</th>
              <th>تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const { amount, created_at, id, status, trans_id, order_id } =
                transaction;
              return (
                <tr key={id}>
                  <th>{order_id}</th>
                  <td>{numberFormat(amount)} تومان</td>
                  <td>
                    <span
                      className={
                        status === "موفق" ? "text-success" : "text-danger"
                      }
                    >
                      {status}
                    </span>
                  </td>
                  <td>{trans_id}</td>
                  <td>{created_at}</td>
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
