import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
      
      <ChatBot />
    </>
    
  );
}

export default MainLayout;
