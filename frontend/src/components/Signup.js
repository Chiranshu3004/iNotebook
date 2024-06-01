import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials,setCredentials]=useState({name: "",email: "",password: "",cpassword: ""});
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault();

        // API CALL
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);

        if (json.success){
            // Save the auth token and redirect
            // jaise login kiya auth token ko store karwa denge local storage k andar
            localStorage.setItem('token', json.authtoken); 
            // iska mtlb hau jab bhi submit button p click kare home page p bhej de
            navigate("/login");
            props.showAlert("Account Created Successfully","success");

        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
        <h2 className="my-3">Sign Up to INotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Username"
            required
            onChange={handleChange}
          />
          </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            required
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter the Password"
            name="password"
            minLength={5} 
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword mb-3">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Confirm Password"
            name="cpassword"
            minLength={5}
            required
            onChange={handleChange}
          />
        </div>
        <div className="my-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
