import { Toaster } from "react-hot-toast";

const CommonLayout = ({children} :{children:React.ReactNode}) => {
    return (
        <div className="flex flex-col min-h-screen">
          <div className="min-h-screen ">
            <Toaster position="top-center" reverseOrder={false} />
          {children}
          </div>
        </div>
    );
};

export default CommonLayout;