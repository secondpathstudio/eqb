import { useRouter } from 'next/router'
import React from 'react'
import Layout from '~/components/Layout'
import QuestionDisplay from '~/components/QuestionDisplay'
import { api } from '~/utils/api'

type Props = {}

const SpecificQuestionPage = (props: Props) => {
    const router = useRouter()

    const {data: currentQuestion, isLoading} = api.questions.getOne.useQuery({id: router.query.questionId as string});

  return (
    <Layout>
        <QuestionDisplay question={currentQuestion}/>
    </Layout>
  )
}

export default SpecificQuestionPage