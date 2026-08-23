import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import MusicPlayerBar from "../Components/MusicPlayerBar";
import Header from "../Components/Header";
const Layout = () => {
  return (
    <div className="grid h-screen grid-cols-[1fr] grid-rows-[auto_1fr_auto] primary sm:grid-cols-[80px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[270px_1fr]">
      
      <div className="hidden sm:block row-span-2 p-2 md:p-4">
        <Sidebar />
      </div>

      <Header />

      <main className="min-w-0 overflow-y-auto">
        <Outlet />
      </main>

        <div className="col-span-1 sm:col-span-2">
          <MusicPlayerBar />
        </div>

    </div>
  );
};

export default Layout;
