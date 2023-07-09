import { useState } from "react";
import Layout from "~/components/Layout";

export default function Home() {
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
