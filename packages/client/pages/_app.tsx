import "../styles/globals.css";
import "../styles/Clock.css";
import type { AppProps } from "next/app";
import { SocketIOProvider } from "use-socketio";
import Header from "./layout/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SocketIOProvider url={`${process.env.NEXT_PUBLIC_COM_URL}`}>
        <Header />
        <Component {...pageProps}></Component>
      </SocketIOProvider>
    </>
  );
}

export default MyApp;
