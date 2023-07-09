import { useRouter } from 'next/router'
import React from 'react'
import Layout from '~/components/Layout'
import QuestionDisplay from '~/components/QuestionDisplay'
import { api } from '~/utils/api'
import Spinner from '~/components/ui/spinner'

type Props = {}

const SpecificQuestionPage = (props: Props) => {
    const router = useRouter()

    const {data: currentQuestion, isLoading} = api.questions.getOne.useQuery({id: router.query.questionId as string});

    if (isLoading) {
      return (
        <Layout>
            <p className="text-center mt-10 text-xl px-4 mb-10 flex items-center gap-3 justify-center">Loading question <Spinner /></p>
        </Layout>
      )
    }

    if (currentQuestion != null && !isLoading) {
      return (
        <Layout>
            <QuestionDisplay question={currentQuestion}/>
        </Layout>
      )
    } else if (currentQuestion === null && !isLoading) {
      return (
        <Layout>
            <p className="text-center mt-10 text-xl px-4 mb-10 flex items-center gap-3 justify-center">No question found.</p>
        </Layout>
      )
    }
}

export default SpecificQuestionPage