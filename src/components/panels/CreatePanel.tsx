import React, {useState} from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "~/components/ui/select"
import { Button } from "~/components/ui/button"
import Spinner from '../ui/spinner'
import { api } from '~/utils/api'
import { TrainingLevel } from '~/server/api/routers/openai'
import { useRouter } from 'next/router'

const CreatePanel = () => {
    const [questionDetails, setQuestionDetails] = useState({
        topic: '',
        trainingLevel: '',
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [error, setError] = useState("")
    const ctx = api.useContext();
    const { mutate: saveQuestion, isLoading: savingQuestion, data: question} = api.questions.saveOne.useMutation({
        onSuccess: (data) => {
            //get question ID and navigate to page for that question
            console.log('Saved question to db', data)
            const questionId = data.id;
            void ctx.questions.getOne.invalidate();

            //navigate to question page
            void router.push(`/${questionId}`)
        },
        onError: (error) => {
            console.error(error)
        }
    });
  const { mutate: generateQuestion, isLoading: generatingQuestion, data: questionData } = api.openai.generateQuestion.useMutation({
    onSuccess: (data) => {
      //save to db
      saveQuestion({
        questionText: data.questionText,
        answers: data.answers,
        trainingLevel: data.trainingLevel,
        topic: data.topic,
        aiModelUsed: data.aiModelUsed
      });
      
      void ctx.openai.invalidate();
    },
    onError: (error) => {
      console.error(error)
    }
  });


    const handleGenerateQuestion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        if (!questionDetails.topic || !questionDetails.trainingLevel) {
            setLoading(false)
            setError('Please select a topic and training level')
            return;
        }

        console.log(questionDetails)
        
        generateQuestion({
            topic: questionDetails.topic,
            trainingLevel: questionDetails.trainingLevel as TrainingLevel
        })

        //take response and send to db - or do that on server?
        
        setLoading(false)
    }

  return (
    <div className='flex w-full justify-start items-center h-full'>
        <form onSubmit={handleGenerateQuestion} className='w-full text-center h-full flex flex-col items-center justify-between'>
            <div className='flex flex-col gap-4 justify-start items-center'>
                <h1 className='text-3xl font-bold mb-10'>Create Question</h1>
                <div className="flex flex-col gap-3 w-full items-center justify-center mb-10">
                    <Select onValueChange={value => setQuestionDetails({...questionDetails, topic: value})}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Topic" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="trauma">Trauma</SelectItem>
                            <SelectItem value="peds">Pediatrics</SelectItem>
                            <SelectItem value="id">Infectious Disease</SelectItem>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="neurology">Neurology</SelectItem>
                            <SelectItem value="ob">Obstetrics</SelectItem>
                            <SelectItem value="gynecology">Gynecology</SelectItem>
                            <SelectItem value="urology">Urology</SelectItem>
                            <SelectItem value="vascular">Vascular</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-3 w-full items-center justify-center">
                    <Select onValueChange={value => setQuestionDetails({...questionDetails, trainingLevel: value})}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Training Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="medicalstudent">Medical Student</SelectItem>
                            <SelectItem value="resident">Resident</SelectItem>
                            <SelectItem value="attending">Attending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='flex flex-col gap-3 mt-20'>
            {error && <p className='text-red-500'>{error}</p>}
            {generatingQuestion && <p className='text-eqb-accent italic'>This can take a minute...</p>}
            <Button 
                className='bg-eqb-card-bg hover:bg-eqb-accent border-eqb-accent text-eqb-accent' 
                variant="outline"
                type='submit'
                disabled={generatingQuestion}>
                {generatingQuestion && !savingQuestion && <p className='flex items-center gap-2'>Generating <Spinner /></p>}
                {savingQuestion && <p className='flex items-center gap-2'>Saving <Spinner /></p>}
                {!generatingQuestion && !savingQuestion && <p>Generate Question</p>}
            </Button>
            </div>
        </form>
    </div>
  )
}

export default CreatePanel