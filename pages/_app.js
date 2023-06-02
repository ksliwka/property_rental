import "../styles/globals.css";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout/Layout";
import "./CustomCalendar.css";
import CartProvider from "../components/store/CartProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </>
  );
}

export default MyApp;
