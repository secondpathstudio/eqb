import React from 'react'
import QuestionDisplay from '../QuestionDisplay'
import { api } from "~/utils/api";
import Spinner from '../ui/spinner';

const QuestionPanel = () => {

    //move to state - stop from re-rendering on window change
    const {data: currentQuestion} = api.questions.getRandom.useQuery();

    if (currentQuestion != null) {
        return (
            <QuestionDisplay question={currentQuestion}/>
        )
    } else if (currentQuestion == null) {
        return (
            <p className="text-center mt-10 text-xl px-4 mb-10 flex items-center gap-3 justify-center">No questions found.</p>
        )
    } else {
        return(
            <p className="text-center mt-10 text-xl px-4 mb-10 flex items-center gap-3 justify-center">Loading question <Spinner /></p>
        )
    }
}

export default QuestionPanel