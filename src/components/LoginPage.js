import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginService from '../services/LoginService'

export const LoginPage = () => {

    const [users, setUsers] = useState('')
    const [error, setError] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [isLogged, setIsLogged] = useState(false)

    var u = "";
    var p = "";

    useEffect(() => {
        LoginService.getAllUsers().then((response) => {
            setUsers(response.data)
            //console.log(response.data)

        }).catch(error => {
            console.log(error)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(e)
        {
            users.map(usr => {
                u = usr.username;
                p = usr.password;

                if (u === username && p === password) {
                    //setIsLogged(true)
                    localStorage.setItem("token", "true")
                    window.location.pathname ="/dashboard"
                    navigate("/dashboard")
                } else {
                    console.log("wrong username and password");
                    // console.log(u, p)
                    setError("Username or Password is incorrect. Try Again!")
                }
            })
        }
    }
    

    return (
        <div className="container d-flex" style={{alignItems: 'center', flexDirection: 'column'}}>

            <div className="card mt-5 shadow" style={{width: '25rem'}}>
                <div className="d-flex justify-content-center">
                    <img style={{width: '75%'}} src="./images/logout.png" className="card-img-top" alt="..."/>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="d-flex justify-content-center pb-4">
                            <p className="h3 fw-bold mb-0 me-3">Admin Login</p>
                        </div>

                        {/* <!-- username input --> */}
                        <div className="form-group">
                            <input type="text" id="form3Example3" className="form-control"
                                placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example3"></label>
                        </div>

                        {/* <!-- Password input --> */}
                        <div className="form-group">
                            <input type="password" id="form3Example4" className="form-control"
                                placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example4"></label>
                        </div>

                        {/* Error display message */}
                        {(error !== "") ? (<div className="error text-center text-danger">{error}</div>) : ""}

                        <div className="text-center text-lg-start pt-2">
                            {/* <button type="button" className="btn btn-primary"
                            style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Login</button> */}
                            <div className="col text-center pb-4">
                                <button onSubmit={handleSubmit} className="btn btn-primary" type="submit" >Login</button>
                            </div>
                            {/* <p className="small fw-bold mt-2 pt-1 mb-0 text-center">Don't have an account? <Link to="/registration"
                                className="link-danger">Register</Link></p> */}
                        </div>

                    </form>

                </div>

            </div>


        </div>
    )
}