import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import TokenList from "../components/TokenList";
import { Toaster } from "react-hot-toast";
export function RootLayout() {
  const [currentPage, setCurrentPage] = useState("send");

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-600/20 via-primary-900/5 to-transparent">
        <div className="min-h-screen backdrop-blur-[100px] bg-gradient-to-b from-transparent via-dark-900/30 to-dark-900/80">
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mt-20">
              <Outlet />
            </div>
            <div className="relative">
              <TokenList />
            </div>
            <div className="">
              <Toaster
                position="bottom-right"
                reverseOrder={false}
                containerStyle={{
                  position: "absolute",
                  bottom: "100px",
                  right: "90px",
                }}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
