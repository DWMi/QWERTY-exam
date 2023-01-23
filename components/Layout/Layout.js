import Landing from "../../pages";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Abel } from "@next/font/google";

const fontStyle = Abel({ weight: "400", subnets: ["sans-serif"] });

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main
        className={fontStyle.className}
        style={{
          backgroundColor: "white",
          boxSizing: "border-box",
          padding: 0,
          margin: 0,
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
