import type { AppProps } from 'next/app';
import '@/pages/styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
