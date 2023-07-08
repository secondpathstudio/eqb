import Head from "next/head";
import { useState } from "react";
import Logo from "~/components/Logo";
import { api } from "~/utils/api";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  // const question = api.questions.getOne.useQuery({})

  //home page - get random question
  //quiz mode - get number of questions (user selects 5, 10, 20, 30, etc.)
  //create mode, show question generation form
  //about page, my name, github, linkedin, etc.
  //user page? - show user stats - number of questions created, number of questions answered, votes, etc.


  const toggleLoadingState = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(prev => !prev);
  }

  const toggleQuestion = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    //load new question
  }

  return (
    <>
      <Head>
        <title>Endless Q Bank</title>
        <meta name="description" content="An endless Q bank." />
        <link rel="icon" href="/endlessqbank.svg" />
      </Head>
      <main className="flex min-h-screen h-screen flex-col items-center bg-gradient-to-b from-eqb-bg-light to-eqb-bg-dark px-10 text-eqb-text">
        <div className="fill-black flex lg:flex-row flex-col items-center text-3xl text-black mb-5">
          Endless
          <Logo 
            rotate={isLoading}
          />
          Q Bank
        </div>
        <div className="flex-col flex bg-eqb-card-bg shadow-lg rounded-xl lg:w-[1000px] lg:h-[600px] max-h-full text-eqb-card-bg">
          <div className="bg-eqb-accent w-full h-14 rounded-t-xl flex justify-center items-center p-3 grow-0">
            <nav className="bg-eqb-bg-light w-2/3 rounded-xl h-full flex justify-between items-center px-4">
            <button className="hover:cursor" onClick={toggleQuestion}>
              Study
            </button>
            <button className="hover:cursor" onClick={toggleLoadingState}>
              Create
            </button>
            <button className="hover:cursor">
              About
            </button>
            </nav>
          </div>
        
          <div className="grow text-eqb-text p-5">
            Question
            {/* {currentQuestion &&
              <Question 
                question={currentQuestion} 
              />
            }
            {!currentQuestion && 
              <p className="text-center mt-10 text-xl px-4 mb-10">No questions found.</p>
            } */}
          </div>
        </div>
      </main>
    </>
  );
}
