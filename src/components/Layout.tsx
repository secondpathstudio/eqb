import React from 'react'
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useState } from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';

type Props = {
    children: React.ReactNode;
}

const generateBoxShadow = (n: number) => {
  let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  }
  return value;
};

const smallStars = generateBoxShadow(100);
const mediumStars = generateBoxShadow(50);
const bigStars = generateBoxShadow(30);

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
      <main className="h-screen bg-gradient-to-t from-[#1B2735] to-[#090A0F] overflow-hidden relative">
      {/* Small Stars */}
        <div 
          className="z-0 absolute w-1 h-1 bg-transparent animate-anim-star"
          style={{ boxShadow: smallStars, animationDuration: '50s' }}
        ></div>
      {/* Medium Stars */}
        <div 
          className="z-0 absolute w-[6px] h-[6px] bg-transparent animate-anim-star-100"
          style={{ boxShadow: mediumStars, animationDuration: '100s' }}
        ></div>
      {/* Big Stars */}
        <div 
          className="z-0 absolute w-3 h-3 bg-transparent animate-anim-star-150"
          style={{ boxShadow: bigStars, animationDuration: '150s' }}
        ></div>
      {/* Main Box */}
      <div className="absolute left-0 right-0 flex min-h-screen h-full py-10 justify-center flex-col items-center px-10 text-eqb-text overflow-scroll">
        <Link className="fill-black flex lg:flex-row flex-col items-center text-3xl mb-5 font-bold" href="/">
          Endless Q Bank
        </Link>
        <div className="shadow-lg flex-col flex bg-eqb-card-bg rounded-xl w-full max-w-6xl min-h-[600px] h-fit text-eqb-card-bg">
          <div className="bg-eqb-accent w-full h-14 rounded-t-xl grid lg:grid-cols-5 grid-cols-3 justify-center items-center p-2">
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
            <div className='flex justify-end items-center w-full gap-2'>
              <button className='w-5 h-5 mr-3 flex justify-center items-center text-white'>
                {user.isSignedIn ? 
                  <UserButton afterSignOutUrl='/'/>
                :
                <SignInButton>
                  <FontAwesomeIcon icon={faSignIn} />
                </SignInButton>
                }
              </button>
            </div>
          </div>
        
          <div className="grow text-eqb-text p-4">
            {props.children}
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

export default Layout