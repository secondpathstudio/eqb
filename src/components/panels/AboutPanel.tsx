import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import React from 'react'

type Props = {}

const AboutPanel = (props: Props) => {
  return (
    <div className='flex flex-col gap-3 justify-center items-center w-full'>
        <h3>Create by Grant Nelson, MD</h3>
        <p>Source code: <FontAwesomeIcon icon={faGithub} /></p>
    </div>
  )
}

export default AboutPanel