import "@/styles/globals.css";
import { createClient, cacheExchange, fetchExchange } from "@urql/core";
import { Provider } from "urql";
import Nav from "@/components/Nav";
import { StateContext } from "@/lib/context";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "react-hot-toast";

const client = createClient({
  url: process.env.NEXT_PUBLIC_BACKEND_API,
  exchanges: [cacheExchange, fetchExchange],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </StateContext>
    </UserProvider>
  );
}
