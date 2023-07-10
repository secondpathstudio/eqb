import { useState } from "react";
import Layout from "~/components/Layout";
import Logo from "~/components/Logo";
import LogoTwoTone from "~/components/Logo-TwoTone";

export default function Home() {
  //home page - get random question
  //quiz mode - get number of questions (user selects 5, 10, 20, 30, etc.)
  //create mode, show question generation form
  //about page, my name, github, linkedin, etc.
  //user page? - show user stats - number of questions created, number of questions answered, votes, etc.

  return (
    <Layout>
      <div className="flex flex-col w-full h-full items-center justify-center fill-eqb-accent">
        <LogoTwoTone rotate={true}  />
        <h3 className="text-2xl italic">Welcome to an endless education.</h3>
      </div>
    </Layout>
  );
}
