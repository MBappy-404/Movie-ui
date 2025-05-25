import ManagePlatform from "@/components/Dashboardlayout/Platform/ManagePlatform";
import ManageGenre from "@/components/Dashboardlayout/Genre/ManageGenre";

const PlatformAndGenre = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5">
      <div className="flex-[50%]">
        <ManagePlatform />
      </div>
      <div className="flex-[50%] mt-10 md:mt-0">
        <ManageGenre />
      </div>
    </div>
  );
};

export default PlatformAndGenre;
