import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";

 

const layout = ({children}: Readonly<{ children: React.ReactNode;}>) => {
    return (
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
};

export default layout;