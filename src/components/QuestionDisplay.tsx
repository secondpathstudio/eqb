import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as thumbsUpSolid, faThumbsDown as thumbsDownSolid } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'
import React, {useState} from 'react'
import { Answer } from '@prisma/client'
import { api } from '~/utils/api'
import { useUser } from '@clerk/nextjs'

type Props = {
    question: {
        id: string,
        questionText: string,
        approvals: number,
        disapprovals: number,
        answers: Answer[]
    }
}

const QuestionDisplay = (props: Props) => {
    const percentageApproval = Math.trunc(props.question?.approvals / (props.question?.approvals + props.question?.disapprovals) * 100);
    const user = useUser();
    const ctx = api.useContext();
    const {data: questionVote, isLoading} = api.questions.getQuestionVote.useQuery({questionId: props.question.id});
    const { mutate: upvote, isLoading: upvoting} = api.questions.upvoteQuestion.useMutation({
        onSuccess: (data) => {
            void ctx.questions.invalidate();
        },
        onError: (error) => {
            console.error(error)
        }
    });
    const { mutate: downvote, isLoading: downvoting} = api.questions.downvoteQuestion.useMutation({
        onSuccess: (data) => {
            void ctx.questions.invalidate();
        },
        onError: (error) => {
            console.error(error)
        }
    });
    const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);


    const handleUpvote = () => {
        upvote({
            questionId: props.question.id
        })
    }

    const handleDownvote = () => {
        downvote({
            questionId: props.question.id
        })
    }

    const handleAnswerQuestion = (selectedAnswer: Answer) => {
        setSelectedAnswer(selectedAnswer)
        console.log(selectedAnswer);
    }

  return (
    <div className="text-center">
        <p className="text-center mt-10 text-xl px-4 mb-10">
        {props.question?.questionText}
        </p>

        <div className='flex flex-col items-center justify-center'>
        {props.question?.answers.length > 0 && props.question?.answers.map((answer: Answer, index: number) => (
            <button key={index} className={`rounded-lg border-2 w-full text-center mb-4 py-1 ${(selectedAnswer === answer && answer.isCorrect) ? 'border-eqb-accent bg-eqb-accent text-eqb-card-bg' : 'border-eqb-bg-dark hover:bg-eqb-bg-dark'}`} onClick={() => handleAnswerQuestion(answer)}>
                <label className="ml-2 hover:cursor-pointer">{answer.answerText}</label>
            </button>
        ))}
        </div>

        <p className='mt-10 font-bold text-xl'>Is this a good question?</p>
        <div className="flex gap-3 items-center justify-center">
            <div className="flex-col items-center justify-center flex">
                <button className="h-5 w-5 mb-2 hover:text-eqb-accent disabled:hover:text-eqb-text" onClick={handleUpvote} disabled={questionVote?.approved === true}>
                    {questionVote?.approved && <FontAwesomeIcon icon={thumbsUpSolid} />}
                    {(questionVote?.approved === false || !questionVote) && <FontAwesomeIcon icon={faThumbsUp} />}
                </button>
                <p className="text-xs">{props.question?.approvals}</p>
            </div>
            <div className="flex-col items-center justify-center flex">
                <button className="h-5 w-5 mb-2 hover:text-eqb-accent disabled:hover:text-eqb-text" onClick={handleDownvote} disabled={questionVote?.approved === false}>
                    {(questionVote?.approved || !questionVote) && <FontAwesomeIcon icon={faThumbsDown} />}
                    {questionVote?.approved === false && <FontAwesomeIcon icon={thumbsDownSolid} />}
                </button>
                <p className="text-xs">{props.question?.disapprovals}</p>
            </div>
        </div>
        {percentageApproval > 0 ? 
            `${percentageApproval}% Approval`
            :
            "No votes yet"
        }
    </div>
  )
}

export default QuestionDisplay