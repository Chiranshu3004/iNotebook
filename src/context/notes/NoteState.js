import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

//     const s1 = {
//         "name": "Chiranshu",
//         "class": "15b"
//     }
//   const [state, setState] = useState(s1);

//   const update = () => {
//     setTimeout(() => {
//         setState({
//             "name": "Bittu",
//             "class": "E"
//         })
//     }, 1000);
// }

const host = "https://i-notebook-backend-flax.vercel.app/"

// yeh notesInitial fetch api se aayenge yeh to starting mei dikhane k liye yehi add kr diye tha
// const notesInitial = [
//     {
//       "_id": "661f8d268d9e5a950c84c64f",
//       "user": "661f89038d9e5a950c84c648",
//       "title": "Notes Added Successfully",
//       "description": "We have to added notes in this id : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxZjg5MDM4ZDllNWE5NTBjODRjNjQ4In0sImlhdCI6MTcxMzM0MjgwMH0.YCRgpcscpP2EoWpxpSofeb08D5_HWm1z-CdfV5S46wI",
//       "tag": "Personal",
//       "date": "2024-04-17T08:49:42.354Z",
//       "__v": 0
//     },
//     {
//       "_id": "661f934c15c1c9e416f6e17a",
//       "user": "661f89038d9e5a950c84c648",
//       "title": "Notes Added Successfully",
//       "description": "We have to added notes in this id : 661f8d268d9e5a950c84c64f",
//       "tag": "Personal",
//       "date": "2024-04-17T09:15:56.961Z",
//       "__v": 0
//     },
//     {
//       "_id": "661f936b15c1c9e416f6e17f",
//       "user": "661f89038d9e5a950c84c648",
//       "title": "Notes Added",
//       "description": "We have to added notes in this id : 661f8d268d9e5a950c84c64f",
//       "tag": "Personal",
//       "date": "2024-04-17T09:16:27.577Z",
//       "__v": 0
//     },
//     {
//       "_id": "661f936d15c1c9e416f6e181",
//       "user": "661f89038d9e5a950c84c648",
//       "title": "Notes Added",
//       "description": "We have to added notes in this id : 661f8d268d9e5a950c84c64f",
//       "tag": "Personal",
//       "date": "2024-04-17T09:16:29.390Z",
//       "__v": 0
//     },
//     {
//         "_id": "661f936d15c1c9e16f6e1812",
//         "user": "661f89038d9e5a950c84c648",
//         "title": "Notes Added twice",
//         "description": "We have to added notes in this id : 661f8d268d9e5a950c84c64f",
//         "tag": "Personal",
//         "date": "2024-04-17T09:16:29.390Z",
//         "__v": 0
//     }
//   ]

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    // yeh Notes mei Fetch All Notes wala option hai to hmne pehle api fetch ki fir jp jo chiz hmne waha ki thi vo ab yaha kr rahe
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      // fetch krne k liye body ki jrurat nhi hai isliye body nhi likha
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxZjg5MDM4ZDllNWE5NTBjODRjNjQ4In0sImlhdCI6MTcxMzM0MjgwMH0.YCRgpcscpP2EoWpxpSofeb08D5_HWm1z-CdfV5S46wI"
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    // yeh check karne k liye json kaam kar raha hai ya nhi
    // console.log(json);

    // setnotes ka use krke hi hm notes ko dekh pa rahe hai UI p
    setNotes(json)
  }


  // ADD a Note
  const addNote = async(title, description, tag)=>{
    //TODO: API CALL
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxZjg5MDM4ZDllNWE5NTBjODRjNjQ4In0sImlhdCI6MTcxMzM0MjgwMH0.YCRgpcscpP2EoWpxpSofeb08D5_HWm1z-CdfV5S46wI"
        "auth-token": localStorage.getItem('token')
      },
      // iska matlab yeh hai ki hme body mei kya kya chahiye
      // thunder client ki jagah ab hm UI se data lenge kaise?-> Title description mei jo bhi daalna hai vo daal do or jab add notes p click karenge to vo add ho jayega hmne auth_token fix kar rakha hai isliye yeh ek ki hi profile mei kaam kar raha hai 
      body: JSON.stringify({title, description, tag})
    });

  //   const json = await response.json()
  //   console.log(json)

  // console.log("Adding a new note")
  // const note = {
  //       "_id": "661f936d15c1c9e416f6e1812",
  //       "user": "661f89038d9e5a950c84c648",
  //       "title": title,
  //       "description": description,
  //       "tag": tag,
  //       "date": "2024-04-17T09:16:29.390Z",
  //       "__v": 0
  //   }

  const note= await response.json();
    // concat ek nayi array store karta hai
    setNotes(notes.concat(note))
  }

  // Edit a Note
  const editNote = async(id, title, description, tag)=>{

    //API Call
    // fetching the api with headers
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      // edit k liye hmne put mehod ka use kiya tha Updates the notes mei vo chiz likhi hai
      method: 'PUT',
      // update the notes mei jo jo headers aale tha vo sab hmne yaha likh diya auth-token hm yaha by default daal rahe 
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxZjg5MDM4ZDllNWE5NTBjODRjNjQ4In0sImlhdCI6MTcxMzM0MjgwMH0.YCRgpcscpP2EoWpxpSofeb08D5_HWm1z-CdfV5S46wI"
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 
    console.log(json)

     let newNotes = JSON.parse(JSON.stringify(notes))

     // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  // Delete a Note
  const deleteNote =async(id)=>{
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      // fetch krne k liye body ki jrurat nhi hai isliye body nhi likha
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // yeh hard code tha isliye login karne k baad bhi vo auth-token yehi le raha tha... auth-token change nhi ho raha tha
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxZjg5MDM4ZDllNWE5NTBjODRjNjQ4In0sImlhdCI6MTcxMzM0MjgwMH0.YCRgpcscpP2EoWpxpSofeb08D5_HWm1z-CdfV5S46wI"

        // ab hmne auth-token ko local storage se le liya
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    console.log(json)

    // console.log("Deleting the note"+ id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;
