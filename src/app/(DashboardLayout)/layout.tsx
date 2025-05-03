import DashboardLayout from "@/components/Dashboardlayout";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="">
      <DashboardLayout children={children} />
    </div>
  );
};

export default Layout;
