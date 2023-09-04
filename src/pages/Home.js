import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase-config.js';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { NoteList } from './'
import { query, orderBy } from "firebase/firestore";

const Home = ({isAuth}) => {
  const [notesList, setNotesList] = useState([])
  const notesCollectionRef = query(collection(db, "notes"), orderBy('createdAt', 'desc'));

  const deleteNote = async (id) => {
    const docRef = doc(db, "notes", id);
    await deleteDoc(docRef);
    setNotesList(notesList.filter(note => note.id !== id))

    // window.location.reload();
    
  }
  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(notesCollectionRef)
      setNotesList(data.docs.map(doc => ({...doc.data(), id: doc.id})))
      console.log('called getNotes()')

    }

    getNotes()

  }, [])


  return (
    <div className='homePage'>
      {notesList.map(note => {
        return (
          <div className='noteCard' key={note.id}>

            <div className='noteHeader'>
              <h2 className='title'>{note.title}</h2>
            <div className='deleteNote'>
              {isAuth && 
                note.author.id === auth.currentUser.uid && 
                <button onClick={() => deleteNote (note.id)}>DELETE</button>
              }
            </div>
            </div>

            <div className='noteTextContainer'>
            {/* {console.log(note.content)} */}
            <p>{note.content}</p>
            </div>
            <p className='authorName'>@{note.author.name}</p>
            {/* {console.log(note.title)}
            {console.log(note.createdAt.toDate().toLocaleTimeString())}
            {console.log(note.createdAt.toDate().toDateString())} */}
            <span>
              <span className='time'>{note.createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              <span>{'  -  '}</span>
              <span className='date'>{note.createdAt.toDate().toLocaleDateString()}</span>

            </span>
          </div>
        )
      })}
    </div>
    // <NoteList notesList={notesList} deleteNote={deleteNote} isAuth={isAuth} auth={auth}/>
  )
}

export default Home