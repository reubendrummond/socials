import { CustomNextPage } from "@lib/types/page";
import MainLayout from "layouts/MainLayout";

const Dashboard: CustomNextPage = () => {
  return (
    <MainLayout>
      <h1>Dashboard</h1>
    </MainLayout>
  );
};

Dashboard.title = "Dashboard";

export default Dashboard;
