import Layout from "@/components/profile/Layout";
import useSWR from "swr";
import { toast } from "react-toastify";
import Loading from "@/components/profile/Loading";
import Create from "@/components/profile/address/Create";
import Edit from "@/components/profile/address/Edit";
import { handleError } from "lib/handleError";
import { AllAddress } from "type";

const ProfileAddressPage = () => {
  const { data, error } = useSWR<AllAddress>(`/profile/addresses`);

  if (error) {
    toast.error(handleError(error));
  }

  if (!data)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <Create cities={data?.cities} provinces={data?.provinces} />
      <hr />
      {data.addresses.map((address, index: any) => (
        <Edit
          key={index}
          address={address}
          cities={data?.cities}
          provinces={data?.provinces}
        />
      ))}
    </Layout>
  );
};

export default ProfileAddressPage;
