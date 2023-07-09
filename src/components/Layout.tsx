import React from 'react'
import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useState } from "react";
import Link from 'next/link';
import Logo from "~/components/Logo";

type Props = {
    children: React.ReactNode;
}

const Layout = (props: Props) => {
    const user = useUser();
    const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Endless Q Bank</title>
        <meta name="description" content="An endless Q bank." />
        <link rel="icon" href="/endlessqbank.svg" />
      </Head>
      <main className="flex min-h-screen h-screen flex-col items-center bg-gradient-to-b from-eqb-bg-light to-eqb-bg-dark px-10 text-eqb-text">
        <Link className="fill-black flex lg:flex-row flex-col items-center text-3xl text-black mb-5" href="/">
          Endless
          <Logo 
            rotate={isLoading}
          />
          Q Bank
        </Link>
        <div className="flex-col flex bg-eqb-card-bg shadow-lg rounded-xl lg:w-[1000px] lg:h-[600px] max-h-full text-eqb-card-bg">
          <div className="bg-eqb-accent w-full h-14 rounded-t-xl flex justify-center items-center p-3 grow-0">
            <nav className="bg-eqb-bg-light w-2/3 rounded-xl h-full flex justify-between items-center px-4">
              <Link className="hover:cursor hover:bg-eqb-bg-dark rounded-lg px-2" href="/study">
                Study
              </Link>
              <Link className="hover:cursor hover:bg-eqb-bg-dark rounded-lg px-2" href="/create">
                Create
              </Link>
              <Link className="hover:cursor hover:bg-eqb-bg-dark rounded-lg px-2" href="/about">
                About
              </Link>
            </nav>
              {user ? <SignOutButton />
              :
              <SignInButton />
              }
          </div>
        
          <div className="grow text-eqb-text p-5">
            {props.children}
          </div>
        </div>
        </main>
    </>
  )
}

export default Layout