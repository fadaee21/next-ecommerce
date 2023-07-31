import { clearCart } from "@/store/slices/cartSlice";
import { handleError } from "lib/handleError";
import Link from "next/link";
import { useDispatch } from "react-redux";
import apiAxiosDataBase from "service/axios";

const PaymentVerifyPage = ({ payment, error }: any) => {
  const dispatch = useDispatch();

  if (error) {
    return <div>{error}</div>;
  }

  if (payment.status) {
    dispatch(clearCart());
  }

  return (
    <section className="auth_section ">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-5">
                  <i
                    className={
                      payment.status
                        ? "bi bi-check-circle-fill text-success fs-1"
                        : "bi bi-x-circle-fill text-danger fs-1"
                    }
                  ></i>

                  {payment.status ? (
                    <>
                      <h5 className="mt-3 text-success">
                        پرداخت شما با موفقیت انجام شد
                      </h5>
                      <h6 className="mt-3">
                        شماره پیگیری : <span>{payment.transId}</span>
                      </h6>
                    </>
                  ) : (
                    <h5 className="mt-3 text-danger">{payment.error}</h5>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  {payment.status ? (
                    <Link href="/profile/orders" className="btn btn-primary">
                      مشاهده سفارش
                    </Link>
                  ) : (
                    <Link href="/cart" className="btn btn-primary">
                      سبد خرید
                    </Link>
                  )}
                  <Link href="/" className="btn btn-dark">
                    بازگشت به سایت
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentVerifyPage;

export async function getServerSideProps({ query }: any) {
  try {
    const res = await apiAxiosDataBase.post("/payment/verify", {
      token: query.trackId,
      status: query.success,
    });
    return {
      props: {
        payment: res.data.data,
      },
    };
  } catch (err) {
    return {
      props: {
        error: handleError(err as any),
      },
    };
  }
}
