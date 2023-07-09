import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useState } from "react";
import Logo from "~/components/Logo";
import HomePanel from "~/components/panels/HomePanel";
import QuestionPanel from "~/components/panels/QuestionPanel";
import CreatePanel from "~/components/panels/CreatePanel";
import AboutPanel from "~/components/panels/AboutPanel";
import Layout from "~/components/Layout";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();

  //home page - get random question
  //quiz mode - get number of questions (user selects 5, 10, 20, 30, etc.)
  //create mode, show question generation form
  //about page, my name, github, linkedin, etc.
  //user page? - show user stats - number of questions created, number of questions answered, votes, etc.

  return (
    <Layout>
      <div>
        Welcome to Endless Q Bank!
      </div>
    </Layout>
  );
}
