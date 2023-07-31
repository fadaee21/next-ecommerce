import { handleError } from "lib/handleError";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiAxiosApp } from "service/axios";
import { CartState, CouponType } from "type";

interface Props {
  cart: CartState[];
  coupon: CouponType;
  addressId: number | null;
}
const Payment = ({ coupon, addressId, cart }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handlePayment = async () => {
    console.log(addressId);
    if (!addressId) {
      toast.error("انتخاب آدرس الزامی است");
      return;
    }
    try {
      setLoading(true);
      const res = await apiAxiosApp.post(`/cart/paymentSend`, {
        cart,
        coupon: coupon.code,
        address_id: addressId,
      });
      router.push(res.data.url);
    } catch (err) {
      toast.error(handleError(err as any));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="input-group mb-3">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="user_option btn-auth mt-4"
        id="basic-addon2"
      >
        پرداخت
        {loading && (
          <div className="spinner-border spinner-border-sm ms-2"></div>
        )}
      </button>
    </div>
  );
};

export default Payment;
