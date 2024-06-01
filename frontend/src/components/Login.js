import React , {useState} from 'react'
import { useNavigate } from "react-router-dom"

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const navigate = useNavigate();

    const handleSubmit= async(e) =>{
        e.preventDefault();
        // API CALL
        const response = await fetch("https://i-notebook-backend-flax.vercel.app/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);

        if (json.success){
            // Save the auth token and redirect
            // jaise login kiya auth token ko store karwa denge local storage k andar
            localStorage.setItem('token', json.authtoken); 
            props.showAlert("Account Created Successfully","success");
            // iska mtlb hau jab bhi submit button p click kare home page p bhej de
            navigate("/");

        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }
    // const [email, setemail] = useState("")
    // const [password, setpassword] = useState("")
    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
        <h2 className="my-3">Login to INotebook</h2>
        <form  onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Enter Password" value={credentials.password} onChange={onChange} name="password" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login
