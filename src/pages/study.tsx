import { useRouter } from 'next/router'
import React from 'react'
import Layout from '~/components/Layout'
import QuestionPanel from '~/components/panels/QuestionPanel'

const StudyPage = () => {
    const router = useRouter()

  return (
    <Layout>
        <QuestionPanel />
    </Layout>
  )
}

export default StudyPage