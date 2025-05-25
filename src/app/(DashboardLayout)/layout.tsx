import DashboardLayout from "@/components/Dashboardlayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wellcome to Dashboard",
  description: "this is admin dashboard.",
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <DashboardLayout children={children} />
    </div>
  );
};

export default Layout;
