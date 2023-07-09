import { useRouter } from 'next/router'
import React from 'react'
import Layout from '~/components/Layout'
import CreatePanel from '~/components/panels/CreatePanel'

const StudyPage = () => {
    const router = useRouter()

  return (
    <Layout>
        <CreatePanel />
    </Layout>
  )
}

export default StudyPage