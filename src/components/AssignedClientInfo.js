
import {React, useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AdminAPI from '../services/AdminAPI'

export const AssignedClientInfo = () => {

    const [openNav, setOpenNav] = useState(false)
    const showSidebar = () => setOpenNav(!openNav)
    
    const navigate = useNavigate()

    const [client, setClient] = useState([])
    const [clientAnimals, setClientAnimals] = useState([])
    const {aaId} = useParams();

    useEffect(() => {
        AdminAPI.getAssignedClientById(aaId).then((response) =>{
            setClient(response.data)
            setClientAnimals(response.data.aanimals)
            // console.log(response.data.aanimals)
        }).catch(error=>{
            console.log(error)
        })
    }, [])


    // converting array of items into comma separated strings
    const arr = client.aanimal_interest
    const str = String(arr)

    const handlelogout = () =>{
        localStorage.clear()
        navigate("/login_page")
    }

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
                                            <button type="submit" onClick={handlelogout} className="btn out">
                                                Log Out <img style={{width: '25px'}} src="/images/exit.png" alt="out"/>
                                            </button>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="main_content_iner">
                    <div className="container-fluid main_body dwnld pb-4">
                        
                        <div className="single-form">
                            <div className="pt-4">

                                <h4 className="text-center text-secondary pb-4">Detailed Information on: {client.afirstName} {client.alastName}</h4>
                                <hr />
                                {/* Personal info section */}
                                <div className="row pt-3">

                                    <div className="col-md-6">
                                        {/* personal details part */}
                                        <h5 className="card-title"><img src="/images/personal-details.png" style={{width: '35px', marginRight: '12px'}} />Personal Details</h5>
                                        <hr/>
                                        <div className="more-information"><p className="more-information-content">Name </p> {client.afirstName} {client.alastName}</div>
                                        <div className="more-information"><p className="more-information-content">E-mail </p> {client.aemail}</div>
                                        <div className="more-information"><p className="more-information-content">Phone </p> {client.acellPhone}</div>
                                    </div>

                                    <div className="col-md-6">
                                        {/* living arrangements part */}
                                        <h5 className="card-title"><img src="/images/living.png" style={{width: '35px', marginRight: '12px'}} />Living Arrangements</h5>
                                        <hr/>
                                        <div className="more-information">
                                            <p className="more-information-content">Number of Children in Household </p> {client.achildrenNumber}
                                        </div>
                                        <div className="more-information">
                                            <p className="more-information-content">Ages of Children</p> {client.achildrenAge}
                                        </div>
                                        <div className="">
                                            <div className="more-information-content">Information regarding existing pet in Household </div> 
                                            <p>{client.aexistingPetInfo}</p>
                                        </div>
                                        <div className="more-information">
                                            <p className="more-information-content">Are Existing Household Pet Altered</p> {client.aalter}
                                        </div>
                                        <div className="more-information">
                                            <p className="more-information-content">Foster Program Interested In</p> {client.aprogram}
                                        </div>
                                        <div className="">
                                            <div className="more-information-content">Animal Interested In</div> 
                                            <p>{str}</p>  
                                        </div>
                                    </div>

                                </div>

                                {/* foster information part */}
                                <h5 className="card-title pt-3"><img src="/images/details-pane.png" style={{width: '35px', marginRight: '12px'}} />Foster Information</h5>
                                <hr/>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header">
                                                <img src="/images/area.png" style={{width: '25px', marginRight: '12px'}} />
                                                <strong>Area where the Animal will be Fostered</strong>
                                            </div>
                                            <div className="card-body">
                                                {client.aarea}
                                            </div>       
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header">
                                                <img src="/images/experience-skill.png" style={{width: '25px', marginRight: '12px'}} />
                                                <strong>Experience</strong>
                                            </div>
                                            <div className="card-body">
                                                {client.aexperience}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header">
                                                <img src="/images/about-us.png" style={{width: '25px', marginRight: '12px'}} />
                                                <strong>About Client</strong>
                                            </div>
                                            <div className="card-body">
                                                {client.aaboutyou}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* assigned pet info */}
                                <h5 className="card-title pt-3"><img src="/images/apet.png" style={{width: '35px', marginRight: '12px'}} />Assigned Pet</h5>
                                <hr />

                                <div className="">
                                    {
                                        clientAnimals.map(
                                            client =>
                                            <div className="pb-4" key={client.assignedAId}>
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5 className="">
                                                            {client.petName}    
                                                        </h5>
                                                        <p className="card-text">   
                                                            {client.animalType}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="d-flex" style={{alignItems: 'center'}}>
                                                                    <strong>Appointment Severity Scale: </strong>
                                                                    <h4 style={{paddingLeft: '10px'}}><span className="badge bg-primary">{client.appointment_scale}</span>
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <p>
                                                                    <strong>Appointment Information: </strong> 
                                                                    {client.appointment_information}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                
                            </div>
                        </div>

                    </div>
                </div>
                
            </section>
        </div>
    
    )
}
