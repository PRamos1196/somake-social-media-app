import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, [])
  
  if(isSSR) return null;

  return (
    
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh] bg-[#0f0f0f]">
        <Navbar />
          <div className=" bg-[#0F0F0F] flex gap-6 md:gap-20 bg-">
            <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
              <Sidebar />
            </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}
