import Landing from "../../pages";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CookieConsent from "react-cookie-consent";
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
      <CookieConsent buttonText="I got it!" disableStyles={true}>
        This website uses cookies to enchance the user experience. Read more{" "}
        <a
          href="/cookies"
          style={{ textDecoration: "underline"}}
        >
          {" "}
          here
        </a>
      </CookieConsent>
      <Footer />
    </div>
  );
};

export default Layout;
