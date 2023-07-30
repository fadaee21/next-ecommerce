import axios from "axios";
import { handleError } from "lib/handleError";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiAxiosApp } from "service/axios";
import { CouponType } from "type";

interface Props {
  coupon: CouponType;
  setCoupon: React.Dispatch<React.SetStateAction<CouponType>>;
}
const Coupon = ({ coupon, setCoupon }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleCheckCoupon = async () => {
    console.log(coupon);
    if (coupon.code === "" || coupon.code === null) {
      toast.error("وارد کردن کد کوپن الزامی است");
      return;
    }

    try {
      setLoading(true);

      const res = await apiAxiosApp.post(`/cart/checkCoupon`, {
        code: coupon.code,
      });
      toast.success("کد تخفیف شما اعمال شد");

      setCoupon({ ...coupon, percent: res.data.percentage });
    } catch (err) {
      toast.error(handleError(err as any));
      setCoupon({ code: null, percent: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        onChange={(e) => setCoupon({ ...coupon, code: e.target.value })}
        type="text"
        className="form-control"
        placeholder="کد تخفیف"
      />
      <button
        onClick={handleCheckCoupon}
        disabled={loading}
        className="input-group-text"
        id="basic-addon2"
      >
        اعمال کد تخفیف
        {loading && (
          <div className="spinner-border spinner-border-sm ms-2"></div>
        )}
      </button>
    </div>
  );
};

export default Coupon;
