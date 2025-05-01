import Sidebar from '@/components/sidebar/sidebar';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
