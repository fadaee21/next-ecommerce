import { Address, City, Province } from "type";
import { handleError } from "lib/handleError";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiAxiosApp } from "service/axios";
import { useSWRConfig } from "swr";
import Delete from "./Delete";

interface Inputs {
  title: string;
  cellphone: string;
  postal_code: string;
  province_id: string;
  city_id: string;
  address: string;
}
interface Prop {
  address: Address;
  cities: City[] | undefined;
  provinces: Province[] | undefined;
}

const Edit = ({ address, cities, provinces }: Prop) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { province_id: address.province_id.toString() },
  });
  const { mutate } = useSWRConfig();
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res = await apiAxiosApp.post(`/profile/addresses/edit`, {
        data,
        address_id: address.id,
      });
      toast.success("ویرایش آدرس با موفقیت ایجاد شد");
      console.log(res);
      mutate(`/profile/addresses`);
    } catch (err) {
      toast.error(handleError(err as any));
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="card card-body">
        <div className="row g-4">
          <div className="col col-md-6">
            <label className="form-label">عنوان</label>
            <input
              {...register("title", { required: "فیلد عنوان الزامی است" })}
              type="text"
              className="form-control"
              defaultValue={address.title}
            />
            <div className="form-text text-danger">{errors.title?.message}</div>
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
              defaultValue={address.cellphone}
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
              defaultValue={address.postal_code}
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
              className="form-select"
              aria-label="Default select example"
              defaultValue={address.province_id}
            >
              <option disabled value="">
                انتخاب استان
              </option>
              {provinces?.map((item) => (
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
              className="form-select"
              aria-label="Default select example"
              defaultValue={address.city_id}
            >
              <option disabled value="">
                انتخاب شهر
              </option>
              {cities
                ?.filter(
                  (item) => item.province_id.toString() === watch("province_id")
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
              defaultValue={address.address}
            ></textarea>
            <div className="form-text text-danger">
              {errors.address?.message}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4 align-items-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary mt-4"
          >
            ویرایش
            {loading && (
              <div className="spinner-border spinner-border-sm ms-2"></div>
            )}
          </button>
          <Delete id={address.id} />
        </div>
      </form>
      <hr />
    </>
  );
};

export default Edit;
