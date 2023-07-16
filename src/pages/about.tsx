import { useRouter } from 'next/router'
import React from 'react'
import Layout from '~/components/Layout'
import QuestionPanel from '~/components/panels/QuestionPanel'
import { api } from '~/utils/api'

const AboutPage = () => {
    const router = useRouter()

  return (
    <Layout>
      <div className='text-center'>
        <h3 className='text-3xl'>An endless question bank, thanks to generative artificial intelligence.</h3>
        <p className='text-xl mt-5 flex justify-center w-full'>Vote on questions to help ensure validity of study resource. Create a free account to help generate new questions and get more tokens by voting on questions!</p>
      </div>
    </Layout>
  )
}

export default AboutPage