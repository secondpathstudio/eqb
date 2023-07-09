import { useRouter } from 'next/router'
import React from 'react'
import Layout from '~/components/Layout'
import QuestionPanel from '~/components/panels/QuestionPanel'
import { api } from '~/utils/api'

const AboutPage = () => {
    const router = useRouter()

  return (
    <Layout>
      <div>
        About the website.
      </div>
    </Layout>
  )
}

export default AboutPage