import React from 'react'
import FeedBackComments from '../Components/FeedBackComments'
import FeedBackForm from '../Components/FeedBackForm'

function FeedBackPage(){
  return (
    <div className='coinContainer'>
      <div className='sideBar'>
        <FeedBackForm />
      </div>
      <FeedBackComments />
    </div>
  )
}

export default FeedBackPage