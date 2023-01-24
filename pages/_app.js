import "../styles/globals.css";
import "../styles/Hamburger.css";
import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "react-use-cart";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </SessionProvider>
  );
}
