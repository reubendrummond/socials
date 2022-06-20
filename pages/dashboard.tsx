import { CustomNextPage } from "@lib/types/page";
import { RequireServerSideAuth } from "@lib/wrappers/SSAuth";
import MainLayout from "layouts/MainLayout";

const Dashboard: CustomNextPage = () => {
  return (
    <MainLayout>
      <h1>Dashboard</h1>
    </MainLayout>
  );
};

Dashboard.title = "Dashboard";
Dashboard.authRequired = "USER";

export const getServerSideProps = RequireServerSideAuth<{}>(async (context) => {
  return { props: {} };
}, "USER");

export default Dashboard;
