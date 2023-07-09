import React from 'react'

type Props = {}

const CreatePanel = (props: Props) => {
  return (
    <div className='flex w-full justify-start items-center'>
        <form>
            <div className="flex flex-col items-center justify-center">
                <label className="text-xl font-bold">Question</label>
                <input className="rounded-lg bg-eqb-bg-dark w-full lg:w-1/2 text-start mb-4 py-1 hover:bg-eqb-bg-light" type="text" placeholder="Question" />
            </div>
            <div className="flex flex-col items-center justify-center">
                <label className="text-xl font-bold">Answer</label>
                <input className="rounded-lg bg-eqb-bg-dark w-full lg:w-1/2 text-start mb-4 py-1 hover:bg-eqb-bg-light" type="text" placeholder="Answer" />
            </div>
        </form>
    </div>
  )
}

export default CreatePanel