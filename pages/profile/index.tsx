import Layout from "@/components/profile/Layout";
import useSWR from "swr";
import { toast } from "react-toastify";
import Loading from "@/components/profile/Loading";
import { handleError } from "lib/handleError";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { apiAxiosClient } from "service/axios";
import { UserInfo } from "type";
type Inputs = {
  name: string;
  email: string;
};

const ProfilePage = () => {
  const [loadingPost, setLoadingPost] = useState(false);
  const { data, error, isLoading, mutate } = useSWR<UserInfo>(`/profile/info`);
  const {register,handleSubmit,formState: { errors }} = useForm<Inputs>();

  if (error) {
    toast.error(handleError(error));
  }

  if (!data && isLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoadingPost(true);
      const res = await apiAxiosClient.post("/profile/info/edit", { data });
      toast.success("ویرایش اطلاعات با موفقیت انجام شد");
      mutate(res.data);
    } catch (error) {
      toast.error(handleError(error as any));
    } finally {
      setLoadingPost(false);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} className="vh-70">
        <div className="row g-4">
          <div className="col col-md-6">
            <label className="form-label">نام و نام خانوادگی</label>
            <input
              {...register("name", {
                required: "فیلد نام و نام خانوادگی الزامی است",
                value: data?.name,
              })}
              type="text"
              className="form-control"
            />
            <div className="form-text text-danger">{errors.name?.message}</div>
          </div>
          <div className="col col-md-6">
            <label className="form-label">ایمیل</label>
            <input
              {...register("email", {
                required: "فیلد ایمیل خانوادگی الزامی است",
                value: data?.email,
              })}
              type="text"
              className="form-control"
            />
            <div className="form-text text-danger">{errors.email?.message}</div>
          </div>
          <div className="col col-md-6">
            <label className="form-label">شماره تلفن</label>
            <input
              defaultValue={data?.cellphone}
              type="text"
              disabled
              className="form-control"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loadingPost}
          className="btn btn-primary mt-4"
        >
          ویرایش
          {loadingPost && (
            <div className="spinner-border spinner-border-sm ms-2"></div>
          )}
        </button>
      </form>
    </Layout>
  );
};

export default ProfilePage;
