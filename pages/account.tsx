import { useAuth } from "@lib/hooks/useAuth";
import { CustomNextPage } from "@lib/types/page";
import { RequireServerSideAuth } from "@lib/wrappers/SSAuth";
import MainLayout from "layouts/MainLayout";
import Image from "next/image";
import { userInfo } from "os";

const Account: CustomNextPage = () => {
  const { user } = useAuth();
  return (
    <MainLayout>
      <div>
        <Image
          src={user?.photoURL || "/placeholder"}
          alt={"User photo"}
          width="80px"
          height="80px"
        />
        <h2>{user?.displayName}</h2>
        <h4>{user?.email}</h4>
      </div>
    </MainLayout>
  );
};

Account.title = "Account";
Account.authRequired = "USER";

export const getServerSideProps = RequireServerSideAuth<{}>(async (context) => {
  context.user;
  return { props: {} };
}, "USER");

export default Account;
