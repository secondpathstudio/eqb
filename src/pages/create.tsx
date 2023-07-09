import { useRouter } from 'next/router'
import React from 'react'
import Layout from '~/components/Layout'
import CreatePanel from '~/components/panels/CreatePanel'
import QuestionPanel from '~/components/panels/QuestionPanel'
import { api } from '~/utils/api'

type Props = {}

const StudyPage = (props: Props) => {
    const router = useRouter()

  return (
    <Layout>
        <CreatePanel />
    </Layout>
  )
}

export default StudyPage