import React, { useState, useEffect } from 'react'
import FeedBackComments from '../Components/FeedBackComments'
import FeedBackForm from '../Components/FeedBackForm'

function FeedBackPage(){

  const [commentsZ, setCommentsZ] = useState([])

    useEffect(() => {
        fetch('https://phase2-api.herokuapp.com/userdata')
        .then(r => r.json())
        .then(data => setCommentsZ(data))
    }, []);

    function handlePosting(data){
        setCommentsZ([...commentsZ, data])
    }

    function deleteComm(id){
        fetch(`https://phase2-api.herokuapp.com/userdata/${id}`,{
            method: "DELETE",
        })
        .then(r => r.json())
        .then(() => {
            const goThru = commentsZ.filter((comment) => comment.id !== id)
                setCommentsZ(goThru)
            })
        }

  return (
    <div className='coinContainer'>
      <div className='sideBar'>
        <FeedBackForm handlePosting={handlePosting} />
      </div>
      <FeedBackComments commentEd={commentsZ} deleteComm={deleteComm}/>
    </div>
  )
}

export default FeedBackPage