// pages/_app.js
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <ToastContainer position="top-right" autoClose={3000} />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
