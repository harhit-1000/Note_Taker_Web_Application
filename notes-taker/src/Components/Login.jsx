import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const Login = (props) => {

    const host = "http://localhost:4000";
    const [login, setlogin] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const onChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login)
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.token);
            navigate("/");
            props.showAlert("Logged In","success")
        }
        else {
            props.showAlert(json.errors,"danger")
        }
    }

    return (
        <div className='location-c'>
        <div className='inbox'>
            <div className='text-center bg-info rounded text-white py-2 px-2 m-30'><h3 className=' mx-1 d-inline-block py-2'>Login & Use Note-Taker App ...</h3></div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
        </div>
    )
}
