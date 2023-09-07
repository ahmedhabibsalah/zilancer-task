import Appbar from "../components/layout/Appbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Appbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
