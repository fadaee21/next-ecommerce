import { handleError } from "lib/handleError";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiAxiosApp } from "service/axios";
import { useSWRConfig } from "swr";

import { City, Province } from "type";
interface Prop {
  provinces: Province[];
  cities: City[];
}
interface Inputs {
  title: string;
  cellphone: string;
  postal_code: string;
  province_id: string;
  city_id: string;
  address: string;
}
const Create = ({ provinces, cities }: Prop) => {
  const { mutate } = useSWRConfig()
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res = await apiAxiosApp.post(`/profile/addresses/create`, {
        data,
      });
      toast.success("آدرس جدید با موفقیت ایجاد شد");
      //i have to mutate to get updated data after posting
      mutate(`/profile/addresses`);
    } catch (err) {
      toast.error(handleError(err as any));
    } finally {
      setLoading(false);
    }
  };
  // console.log(watch("province_id"))
  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        ایجاد آدرس جدید
      </button>
      <div className="collapse mt-3" id="collapseExample">
        <form onSubmit={handleSubmit(onSubmit)} className="card card-body">
          <div className="row g-4">
            <div className="col col-md-6">
              <label className="form-label">عنوان</label>
              <input
                {...register("title", { required: "فیلد عنوان الزامی است" })}
                type="text"
                className="form-control"
              />
              <div className="form-text text-danger">
                {errors.title?.message}
              </div>
            </div>
            <div className="col col-md-6">
              <label className="form-label">شماره تماس</label>
              <input
                {...register("cellphone", {
                  required: "فیلد شماره تماس الزامی است",
                  pattern: {
                    value: /^(\+98|0)?9\d{9}$/i,
                    message: "فیلد شماره تماس معتبر نمیباشد",
                  },
                })}
                type="text"
                className="form-control"
              />
              <div className="form-text text-danger">
                {errors.cellphone?.message}
              </div>
            </div>
            <div className="col col-md-6">
              <label className="form-label">کد پستی</label>
              <input
                {...register("postal_code", {
                  required: "فیلد کد پستی الزامی است",
                  pattern: {
                    value: /^\d{5}[ -]?\d{5}$/i,
                    message: "فیلد کد پستی معتبر نمیباشد",
                  },
                })}
                type="text"
                className="form-control"
              />
              <div className="form-text text-danger">
                {errors.postal_code?.message}
              </div>
            </div>
            <div className="col col-md-6">
              <label className="form-label">استان</label>
              <select
                {...register("province_id", {
                  required: "فیلد استان الزامی است",
                })}
                defaultValue=""
                className="form-select"
                aria-label="Default select example"
              >
                <option disabled value="">
                  انتخاب استان
                </option>
                {provinces.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="form-text text-danger">
                {errors.province_id?.message}
              </div>
            </div>
            <div className="col col-md-6">
              <label className="form-label">شهر</label>
              <select
                {...register("city_id", { required: "فیلد شهر الزامی است" })}
                defaultValue=""
                className="form-select"
                aria-label="Default select example"
              >
                <option disabled value="">
                  انتخاب شهر
                </option>
                {cities
                  .filter(
                    (item) =>
                      item.province_id.toString() === watch("province_id")
                  )
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <div className="form-text text-danger">
                {errors.city_id?.message}
              </div>
            </div>
            <div className="col col-md-12">
              <label className="form-label">آدرس</label>
              <textarea
                {...register("address", { required: "فیلد آدرس الزامی است" })}
                rows={5}
                className="form-control"
              ></textarea>
              <div className="form-text text-danger">
                {errors.address?.message}
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary mt-4"
            >
              ایجاد
              {loading && (
                <div className="spinner-border spinner-border-sm ms-2"></div>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
