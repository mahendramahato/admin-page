
import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import AdminAPI from '../services/AdminAPI'

export const UpdateForm = () => {

    const [openNav, setOpenNav] = useState(false)
    const showSidebar = () => setOpenNav(!openNav)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [cellPhone, setCellphone] = useState('')

    const navigate = useNavigate();
    const {formId} = useParams();

    const Update = (e) => {
        e.preventDefault();

        const client = {firstName, lastName, email, cellPhone}
        AdminAPI.updateForm(formId, client).then((response) =>{
            navigate('/form_list')
        }).catch(error =>{
            console.log(error)
        })
    }

    useEffect(() => {
        AdminAPI.getClientById(formId).then((response) =>{
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
            setCellphone(response.data.cellPhone)
        }).catch(error => {
            console.log(error)
        })
    }, [])
    

    return (

        <div className="container-fluid">

            <nav className={openNav ? 'active_sidebar sidebar' : 'sidebars sidebar'} >
                <div className="logo d-flex justify-content-between">
                    <img style={{width: '60px'}} src="/images/aaa.jpg" />
                    <h3 style={{display: 'flex', alignItems: 'center', color: 'burlywood'}}>ADMIN</h3>
                    <div className="sidebar_close_icon d-lg-none">
                        <button className="ti-close" onClick={showSidebar}>
                        <img style={{width : '30px'}} src="/images/cancel.png" alt="..."/>
                        </button>
                    </div>
                </div>

                {/* admin navigation items */}

                <ul id="sidebar_menu" className="sidemenu">

                    <li className="">
                        <Link className="" to="/dashboard">
                            <img style={{width: '35px'}} src="/images/home.png" />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className="">
                        <a className="has-arrow" data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <img style={{width: '35px'}} src="/images/animal.png" />
                            <span>Animals</span>
                        </a>
                        <ul className="collapse" id="collapseExample" style={{height: '0px'}}>
                            <div>
                            <li>
                                <Link to="/add_animals">Add animals</Link>
                            </li>
                            <li>
                                <Link to="/list_animals">List animals</Link>
                            </li>
                            </div>
                        </ul>
                    </li>

                    <li className="">
                        <a className="has-arrow" data-bs-toggle="collapse" href="#collapseForm" aria-expanded="false" aria-controls="collapseExample">
                            <img style={{width: '35px'}} src="/images/page.png" />
                            <span>Forms</span>
                        </a>
                        <ul className="collapse" id="collapseForm" style={{height: '0px'}}>
                            <div>
                            <li>
                                <Link to="/form_list">List forms</Link>
                            </li>
                            <li>
                                <Link to="/edit_forms">Edit forms</Link>
                            </li>
                            </div>
                        </ul>
                    </li>

                    <li className="">
                        <a className="has-arrow" data-bs-toggle="collapse" href="#collapseAForm" aria-expanded="false" aria-controls="collapseExample">
                            <img style={{width: '35px'}} src="/images/apet.png" />
                            <span>Assigned Client</span>
                        </a>
                        <ul className="collapse" id="collapseAForm" style={{height: '0px'}}>
                            <div>
                            <li>
                                <Link to="/assigned_client_list">List Assigned Clients</Link>
                            </li>
                            <li>
                                <Link to="/edit_assigned_client_list">Edit Assigned Clients</Link>
                            </li>
                            </div>
                        </ul>
                    </li>
                </ul>

                
            </nav>

            <section className="main_content dashboard_part">

                <div className="container-fluid g-0">
                    <div className="row">
                        <div className="col-md-12 p-0">
                            <div className="header_inner d-flex justify-content-between align-items-center">
                                
                                <div className="sidebar_icon d-lg-none">
                                    <button className="ti-menu" onClick={showSidebar}>
                                        <img style={{width : '45px'}} src="/images/menu.png" alt="..."/>
                                    </button>
                                </div>

                                <div className="search_field-area">
                                    <div className="search_inner">
                                        <form action="#">
                                            <div className="search_field">
                                                <input type="text" placeholder="Search here..."></input>
                                            </div>
                                            <button typr="submit">
                                                <img style={{width: '25px'}} src="/images/search.png" alt="search" />
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div className="header_right d-flex justify-content-between align-items-center">

                                    <div className="dropdown">
                                        <img style={{width: '85px'}} src="/images/logout.png" alt="..."/>
                                        <div className="dropdown-content">
                                            <p>Welcome Admin!</p>
                                            <hr/>
                                            <Link to="/login_page" className="btn out" href="#">
                                                Log Out <img style={{width: '25px'}} src="/images/exit.png" alt="out"/>
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="main_content_iner">
                    <div className="container-fluid main_body">
                        
                        <h2 className="text-center text-muted">Applicant List</h2>

                        <div className="row">
                            <h2 className="title-form" style={{}}>
                                Personal Information
                            </h2>
                        </div>

                        <hr></hr>

                        <div className="row">

                            <form className="row g-3">
                                
                                <div className="col-md-6">
                                    <label htmlFor="inputFname" className="form-label">FirstName</label>
                                    <input 
                                    type="firstName" 
                                    className="form-control" 
                                    id="inputFname"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e)=> setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputLname" className="form-label">LastName</label>
                                    <input 
                                    type="lastName" 
                                    className="form-control" 
                                    id="inputLname"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="inputEmail" className="form-label">Email</label>
                                    <input 
                                    type="email" 
                                    className="form-control" 
                                    id="inputEmail"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="inputCellPhone" className="form-label">Cell Phone</label>
                                    <input 
                                    type="cellphone" 
                                    className="form-control" 
                                    id="inputCellPhone"
                                    name="cellPhone"
                                    value={cellPhone}
                                    onChange={(e) => setCellphone(e.target.value)}
                                    />
                                </div>

                                <div className="container d-flex" style={{marginTop: 20, marginBottom: 20, justifyContent:'center'}}>
                                    <button className="btn btn-success" style={{marginRight: 10}} onClick={(e) => Update(e)} >Update</button>
                                    <div>
                                        <Link className="btn btn-danger" to={`/edit_forms`}>Cancel</Link>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
                
            </section>
        </div>

    )
}
