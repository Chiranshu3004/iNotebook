// import React, {useContext, useEffect} from 'react'
import React from "react"
// import noteContext from '../context/notes/noteContext'

const About = () => {
    // const a=useContext(noteContext)
    // useEffect(() => {
    //   a.update();
    //   // eslint-disable-next-line
    // }, [])

  return (
    // <div>
    //   {/* <h3>This is About {a.state.name} and he is in the class {a.state.class} </h3> */}
    //   <h3>This is About Page</h3>
    // </div>
    <div className="container">
      <h1>About iNotebook</h1>
      <p>
        iNotebook is a simple note-taking application that allows you to create, edit, delete notes, and fetch all data from the server. It provides a convenient way to organize your thoughts, ideas, and tasks digitally.
      </p>
      <h2>Features:</h2>
      <ul>
        <li>Create Notes: Easily add new notes with a title and description.</li>
        <li>Edit Notes: Update your existing notes whenever you need to make changes.</li>
        <li>Delete Notes: Remove notes that you no longer need.</li>
        <li>Fetch All Data: Retrieve all notes from the server to ensure synchronization across devices.</li>
      </ul>
      <h2>Technology Stack:</h2>
      <p>iNotebook is built using the following technologies:</p>
      <ul>
        <li>Frontend: React.js - A JavaScript library for building user interfaces.</li>
        <li>Backend: Node.js and Express.js - For handling server-side logic and API requests.</li>
        <li>Database: MongoDB - A NoSQL database for storing note data.</li>
        <li>Authentication: JWT (JSON Web Tokens) - For secure authentication of users.</li>
      </ul>
      <h2>Author:</h2>
      <p>iNotebook is developed by Chiranshu Agrawal. As a passionate developer, I created iNotebook with the aim of providing users with a simple yet powerful tool for organizing their thoughts and tasks. I'm dedicated to continuously improving iNotebook and welcome any feedback or suggestions from users.</p>
      <h2>Contact:</h2>
      <p>If you have any questions, feedback, or inquiries about iNotebook, please don't hesitate to reach out. You can contact me via email at agarwalchiranshu2003@gmail.com. I'm always happy to hear from users and am committed to providing support and assistance whenever needed.</p>
    </div>
  )
}

export default About

