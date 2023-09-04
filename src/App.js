import React, { useState, useEffect } from 'react';
import './App.css';
// import { db } from './firebase-config.js';
// import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Login, CreateNote } from './pages';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config.js';


function App() {

  // const [users, setUsers] = useState([]);
  // const usersCollectionRef = collection(db, "users");

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map(doc => ( {...doc.data(), id: doc.id} )));
  //     console.log(data);
  //     console.log(data.docs.map(doc => ( {...doc.data(), id: doc.id} )));

  //   };
  //   getUsers();


  // }, []);

  
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = '/login'
    });
  }
  return (


    <Router>
      <nav>
        <Link to="/">Home</Link>

        { !isAuth ? 
          <Link to="/login">Login</Link> :
            <>
              <div className='create-note-button-container'><Link to="/create-note" className='create-note-button'>Create Note</Link></div> 
              <button className='log-out-button' onClick={signUserOut}>Log Out</button>
            </>
        }

        {/* { !isAuth ?
          <Link to="/login"></Link> :
            // <>
            //   <div className='create-note-button-container'><Link to="/create-note" className='create-note-button'>Create Note</Link></div> 
              <button onClick={signUserOut}>Log Out</button>
            // </>
        }

        { isAuth && window.location.pathname === '/' &&
          <>
            <div className='create-note-button-container'><Link to="/create-note" className='create-note-button'>Create Note</Link></div> 
            
          </>
        } */}


      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        {/* <Route path="/notes" element={<NoteList />} /> */}
        <Route path="/create-note" element={<CreateNote isAuth={isAuth} />} />
      </Routes>

      
    </Router>

  );
}

export default App;
