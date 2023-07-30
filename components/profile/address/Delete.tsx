import { handleError } from "lib/handleError";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiAxiosApp } from "service/axios";
import { useSWRConfig } from "swr";

const Delete = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState(false);

  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await apiAxiosApp.post(`/profile/addresses/delete`, {
        address_id: id,
      });
      toast.success("حذف آدرس با موفقیت انجام شد");

      mutate(`/profile/addresses`);
    } catch (err) {
      toast.error(handleError(err as any));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading} className="btn btn-dark">
      حذف
      {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
    </button>
  );
};

export default Delete;
