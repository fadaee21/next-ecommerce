import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearCart,
  decrement,
  increment,
  removeFromCart,
  selectCart,
} from "@/store/slices/cartSlice";
import { numberFormat } from "lib/numberFormat";
import { salePercent } from "lib/salePercent";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Coupon from "@/components/cart/Coupon";
import { CouponType } from "type";
import Address from "@/components/cart/Address";
const CartPage = () => {
  const state = useAppSelector(selectCart);
  const [cart, setCart] = useState<typeof state>([]);
  const [coupon, setCoupon] = useState<CouponType>({ code: null, percent: 0 });
  const [addressId, setAddressId] = useState<number | null>(null);
  useEffect(() => setCart(state), [state]);

  const dispatch = useAppDispatch();

  if (cart == null) {
    return (
      <div className="cart-loadnig">
        <div className="spinner-border spinner-border-sm ms-2 cart-spiner"></div>
      </div>
    );
  }

  return (
    <>
      {cart.length !== 0 ? (
        <section className="single_page_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="row gy-5">
                  <div className="col-12">
                    <div className="table-responsive">
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
                          {cart.map((item) => (
                            <tr key={item.id}>
                              <th>
                                <Image
                                  src={item.primary_image}
                                  placeholder="blur"
                                  blurDataURL={item.primary_image_blurDataURL}
                                  width={100}
                                  height={66}
                                  alt="primary-image"
                                />
                              </th>
                              <td className="fw-bold">{item.name}</td>
                              <td>
                                <div>
                                  {item.is_sale ? (
                                    <>
                                      <span>
                                        {numberFormat(item.sale_price || 0)}
                                      </span>
                                      <del className="me-1">
                                        {numberFormat(item.price)}
                                      </del>
                                    </>
                                  ) : (
                                    <span>{numberFormat(item.price)}</span>
                                  )}
                                  <span className="ms-1">تومان</span>
                                </div>
                                {item.is_sale && (
                                  <div className="text-danger">
                                    {salePercent(
                                      item.price,
                                      item.sale_price || 0
                                    )}
                                    % تخفیف
                                  </div>
                                )}
                              </td>
                              <td>
                                <div className="input-counter">
                                  <span
                                    onClick={() =>
                                      dispatch(
                                        increment({
                                          id: item.id,
                                          quantity: item.quantity,
                                        })
                                      )
                                    }
                                    className="plus-btn"
                                  >
                                    +
                                  </span>
                                  <div className="input-number">{item.qty}</div>
                                  <span
                                    onClick={() =>
                                      dispatch(decrement({ id: item.id }))
                                    }
                                    className="minus-btn"
                                  >
                                    -
                                  </span>
                                </div>
                              </td>
                              <td>
                                {item.is_sale ? (
                                  <span>
                                    {numberFormat(
                                      (item.sale_price || 0) * item.qty
                                    )}
                                  </span>
                                ) : (
                                  <span>
                                    {numberFormat(item.price * item.qty)}
                                  </span>
                                )}
                                <span className="ms-1">تومان</span>
                              </td>
                              <td>
                                <i
                                  onClick={() =>
                                    dispatch(removeFromCart({ id: item.id }))
                                  }
                                  className="bi bi-x text-danger fw-bold fs-4 cursor-pointer"
                                ></i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      onClick={() => dispatch(clearCart())}
                      className="btn btn-primary mb-4"
                    >
                      پاک کردن سبد خرید
                    </button>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12 col-md-6">
                    <Coupon coupon={coupon} setCoupon={setCoupon} />
                  </div>
                  <div className="col-12 col-md-6 d-flex justify-content-end align-items-baseline">
                    <Address setAddressId={setAddressId} />
                  </div>
                </div>
                <div className="row justify-content-center mt-5">
                  <div className="col-12 col-md-6">
                    <div className="card">
                      <div className="card-body p-4">
                        <h5 className="card-title fw-bold">مجموع سبد خرید</h5>
                        <ul className="list-group mt-4">
                          <li className="list-group-item d-flex justify-content-between">
                            <div>مجموع قیمت :</div>
                            <div>
                              {numberFormat(
                                cart.reduce((total, product) => {
                                  const { is_sale, sale_price, price, qty } =
                                    product;
                                  return is_sale && sale_price
                                    ? total + sale_price * qty
                                    : total + price * qty;
                                }, 0)
                              )}
                              تومان
                            </div>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <div>
                              تخفیف :
                              <span className="text-danger ms-1">
                                {coupon.percent}%
                              </span>
                            </div>
                            <div className="text-danger">
                              {numberFormat(
                                cart.reduce((total, product) => {
                                  const { is_sale, sale_price, price, qty } =
                                    product;
                                  return is_sale && sale_price
                                    ? total + sale_price * qty
                                    : total + price * qty;
                                }, 0) *
                                  (coupon.percent / 100)
                              )}
                              تومان
                            </div>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <div>قیمت پرداختی :</div>
                            <div>
                              {numberFormat(
                                cart.reduce((total, product) => {
                                  const { is_sale, sale_price, price, qty } =
                                    product;
                                  return is_sale && sale_price
                                    ? total + sale_price * qty
                                    : total + price * qty;
                                }, 0) -
                                  cart.reduce((total, product) => {
                                    const { is_sale, sale_price, price, qty } =
                                      product;
                                    return is_sale && sale_price
                                      ? total + sale_price * qty
                                      : total + price * qty;
                                  }, 0) *
                                    (coupon.percent / 100)
                              )}
                              تومان
                            </div>
                          </li>
                        </ul>
                        <button className="user_option btn-auth mt-4">
                          پرداخت
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="cart-empty">
          <div className="text-center">
            <div>
              <i className="bi bi-basket-fill" style={{ fontSize: "80px" }}></i>
            </div>
            <h4 className="text-bold">سبد خرید شما خالی است</h4>
            <Link className="btn btn-outline-dark mt-3" href="/menu">
              مشاهده محصولات
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
