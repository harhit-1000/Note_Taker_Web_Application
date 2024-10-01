
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const SignUp = (props) => {

    const host = "http://localhost:4000";
    const [signUp, setSignUp] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const onChange = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(signUp);
        const response = await fetch(`${host}/signup`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signUp)
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.token);
            navigate("/");
            props.showAlert("Welcome, Your Account has been created. ", "success")
        }
        else {
            props.showAlert(json.errors, "danger")
        }
    }

    return (
        <div className='location-c'>
            <div className='inbox'>
                <div className='text-center bg-info rounded text-white py-2 px-2 m-30'><h3 className='py-2 mx-1  d-inline-block'>Create an account to use Note-Taker...</h3></div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" id="name" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" id="email" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="password" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
                <div className='my-5 mx-2'>
                    <ul>
                        <li>Password must be min 8 character.</li>
                        <li>Use Strong Password.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
