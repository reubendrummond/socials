import { CustomNextPage } from "@lib/types/page";
import { RequireServerSideAuth } from "@lib/wrappers/getServerSidePropsWrappers";
import MainLayout from "layouts/MainLayout";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Account: CustomNextPage = () => {
  const { data: session } = useSession();
  return (
    <MainLayout>
      <div>
        <Image
          src={session?.user?.image || "/placeholder"}
          alt={"User photo"}
          width="80px"
          height="80px"
        />
        <h2>{session?.user?.username}</h2>
        <h4>{session?.user?.email}</h4>
      </div>
    </MainLayout>
  );
};

Account.title = "Account";
Account.authRequired = "USER";

export const getServerSideProps = RequireServerSideAuth<{}>(async (context) => {
  return { props: {} };
}, "USER");

export default Account;
