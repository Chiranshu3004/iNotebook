// import React, { useContext, useState } from 'react'
// import contextValue from '../context/notes/noteContext';
import Notes from "./Notes"

const Home = (props) => {
    // yaha pr ab inn chizo ki jrurt nhi hai kyuki hmne ek alag se notes.js ki file bana li
    // const context = useContext(contextValue);
    // const {notes, setNotes} = context;
  return (
    <div>
        {/* <div className="container my-3">
            <h2>Add a Notes</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div> */}


        {/* isko hm yaha se hata k ek notes.js ki khud ki file banayenge  */}
        {/* <div className="container my-3">
            <h2>Yours Notes</h2>
            {notes.map((note)=>{
                return note.title;
            })}
        </div> */}
        <Notes showAlert={props.showAlert}/>
    </div>
  )
}

export default Home
