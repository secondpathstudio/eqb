import React from 'react'
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useState } from "react";
import Link from 'next/link';
import Logo from "~/components/Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';

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
      <main className="flex min-h-screen h-full py-10 flex-col items-center bg-gradient-to-b from-eqb-bg-light to-eqb-bg-dark px-10 text-eqb-text">
        <Link className="fill-black flex lg:flex-row flex-col items-center text-3xl text-black mb-5" href="/">
          Endless Q Bank
        </Link>
        <div className="flex-col flex bg-eqb-card-bg shadow-lg rounded-xl w-full max-w-6xl min-h-[600px] h-[600px] text-eqb-card-bg">
          <div className="bg-eqb-accent w-full h-14 rounded-t-xl grid lg:grid-cols-5 grid-cols-3 justify-center items-center p-3">
            <nav className="bg-eqb-bg-light rounded-xl h-full flex justify-between items-center px-4 lg:col-start-2 lg:col-end-5 col-span-2 py-1">
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
            <div className='flex justify-end items-center w-full gap-2 text-sm'>
              <button className='w-5 h-5 flex justify-center items-center hover:text-eqb-bg-dark'>
              {user.isSignedIn ? 
                <UserButton afterSignOutUrl='/'/>
              :
              <SignInButton>
                <FontAwesomeIcon icon={faSignIn}  />
              </SignInButton>
              }
              </button>
            </div>
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