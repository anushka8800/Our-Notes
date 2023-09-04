import React, { useState, useEffect } from 'react'
// import { serverTimestamp } from "firebase/firestore";
import { db, auth } from '../firebase-config.js';
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'

const CreateNote = ({ isAuth }) => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate()

  const notesCollectionRef = collection(db, "notes");
  const createNote = async() => {
    let objectDate = new Date();
    
    addDoc(notesCollectionRef, {
      title, 
      content, 
      author: {name: auth.currentUser.displayName, id:auth.currentUser.uid},
      // createdAt: new Date()
      createdAt: Timestamp.now()

    })
    navigate('/')
  }

  useEffect(()=> {
    if(!isAuth) {
    // if(!localStorage.getItem('isAuth')) {
      navigate('/login')
    }
  }, [])

  return (
    <div className='createNotePage'>
      <div className='creatNoteContainer'>
        {/* <p>Create Note</p> */}

        <form>
          <div className='inputGp'>
            <label>Title:</label>
            <input 
              // placeholder="Title" 
              onChange={(e)=>{
                setTitle(e.target.value)
              }}/>
          </div>
          <div className='inputGp'>
            <label>Note:</label>
            <textarea 
              // placeholder="Note" 
              onChange={(e)=>{
                setContent(e.target.value)
            }}/>
          </div>
          <button onClick={createNote}>Submit Post</button>
        </form>
      </div>
    </div>
  )
}

export default CreateNote