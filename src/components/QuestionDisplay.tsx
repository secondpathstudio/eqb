import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Question } from '@prisma/client'

type Props = {
    question: Question
}

const QuestionDisplay = (props: Props) => {

    const percentageApproval = Math.trunc(props.question.approvals / (props.question.approvals + props.question.disapprovals) * 100);

    const handleUpvote = async () => {
        //call trpc api call for upvote
    }

    const handleDownvote = async () => {
        //call trpc api call for downvote
    }

    const handleAnswerQuestion = async () => {
        //handle question answer
    }

  return (
    <div className="text-center">
        <h2 className="font-bold text-xl">
            {percentageApproval > 0 ? 
                `${percentageApproval}% Approval`
                :
                "No votes yet"
            }
            </h2>
        <div className="flex gap-3 items-center justify-center">
        <div className="flex-col items-center justify-center flex">
            <button className="h-5 w-5 mb-2 hover:text-eqb-accent">
            <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <p className="text-xs">{props.question.approvals}</p>
        </div>
        <div className="flex-col items-center justify-center flex">
            <button className="h-5 w-5 mb-2 hover:text-eqb-accent">
            <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <p className="text-xs">{props.question.disapprovals}</p>
        </div>
        </div>
        <p className="text-center mt-10 text-xl px-4 mb-10">
        {props.question.questionText}
        </p>

        <div className='flex flex-col items-center justify-center'>
        {props.question?.answers.length > 0 && props.question?.answers.map((answer: Answer, index: number) => (
        <button key={index} className="rounded-lg bg-eqb-bg-dark w-full lg:w-1/2 text-start mb-4 py-1 hover:bg-eqb-bg-light">
            <label className="ml-2 hover:cursor-pointer">{answer.answerText}</label>
        </button>
        ))}
        </div>
    </div>
  )
}

export default QuestionDisplay