const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-gray-100 min-h-screen flex   justify-center">
      <div className="w-[20%]">
        <h2>This is Sidebar</h2>
      </div>
      <div className="w-[75%] bg-white p-4 shadow-md rounded-lg">
        <h2>This is Header</h2>
        {children}
      </div>
    </div>
  );
};

export default layout;
