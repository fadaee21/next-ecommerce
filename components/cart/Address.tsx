import { handleError } from "lib/handleError";
import Link from "next/link";
import { toast } from "react-toastify";
import useSWR from "swr";
import { Address } from "type";
interface props {
  setAddressId: React.Dispatch<React.SetStateAction<number | null>>;
}
const Address = ({ setAddressId }: props) => {
  const { data, error } = useSWR<Address[]>(`/cart/addresses`);

  if (error) {
    toast.error(handleError(error));
  }

  if (!data)
    return <div className="spinner-border spinner-border-sm ms-2"></div>;

  return (
    <>
      {data.length !== 0 ? (
        <>
          <div>انتخاب آدرس</div>
          <select
            onChange={(e) => setAddressId(+e.target.value)}
            style={{ width: "200px" }}
            defaultValue=""
            className="form-select ms-3"
            aria-label="Default select example"
          >
            <option value="">انتخاب آدرس</option>
            {data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </>
      ) : (
        <Link className="btn btn-primary" href="/profile/addresses">
          ایجاد آدرس
        </Link>
      )}
    </>
  );
};

export default Address;
