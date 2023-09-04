import {React, useEffect} from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase-config.js';

const NoteList = (props) => {
  
  // const deleteNote = async (id) => {
  //   const docRef = doc(db, "notes", id);
  //   await deleteDoc(docRef);
  //   props.notesList.filter(note => note.id !== id)

  //   // window.location.reload();
  //   // notesList,isAuth,auth
  // }

  useEffect(() => {
    console.log('inside NoteList useEffect()')
  }, [])


  return (
    <div className='homePage'>
      {props.notesList.map(note => {
        return (
          <div className='noteCard' key={note.id}>

            <div className='noteHeader'>
              <h2 className='title'>{note.title}</h2>
            <div className='deleteNote'>
              {props.isAuth && 
                note.author.id === auth.currentUser.uid && 
                <button onClick={() => props.deleteNote (note.id)}>DELETE</button>
              }
            </div>
            </div>

            <div className='noteTextContainer'>
            {/* {console.log(note.content)} */}
            <p>{note.content}</p>
            </div>
            <p className='authorName'>@{note.author.name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default NoteList