import Landing from "../../pages";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main
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
