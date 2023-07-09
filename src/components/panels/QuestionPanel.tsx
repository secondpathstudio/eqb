import React from 'react'
import QuestionDisplay from '../QuestionDisplay'
import { api } from "~/utils/api";

const QuestionPanel = () => {

    const {data: currentQuestion} = api.questions.getOne.useQuery();

    if (currentQuestion != null) {
        return (
            <QuestionDisplay question={currentQuestion}/>
        )
    } else {
        return(
            <p className="text-center mt-10 text-xl px-4 mb-10">No question found.</p>
        )
    }
}

export default QuestionPanel