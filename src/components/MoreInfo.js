import {React, useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminAPI from '../services/AdminAPI'

export const MoreInfo = () => {

    const [openNav, setOpenNav] = useState(false)
    const showSidebar = () => setOpenNav(!openNav)

    const [client, setClient] = useState([])
    const {id} = useParams();

    useEffect(() => {
        AdminAPI.getClientById(id).then((response) =>{
            setClient(response.data)
        }).catch(error=>{
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
                            <img style={{width: '25px'}} src="/images/home.png" />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className="">
                        <a className="has-arrow" data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <img style={{width: '25px'}} src="/images/animal.png" />
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
                            <img style={{width: '25px'}} src="/images/page.png" />
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
                </ul>

                
            </nav>

            <section className="main_content dashboard_part">

                <div className="container-fluid g-0">
                    <div className="row">
                        <div className="col-md-12 p-0">
                            <div className="header_inner d-flex justify-content-between align-items-center">
                                
                                <div className="sidebar_icon d-lg-none">
                                    <button className="ti-menu" onClick={showSidebar}>
                                        <img style={{width : '25px'}} src="/images/menu.png" alt="..."/>
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
                                            <a className="out" href="#">
                                                Log Out <img style={{width: '25px'}} src="/images/exit.png" alt="out"/>
                                            </a>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="main_content_iner">
                    <div className="container-fluid main_body pb-4">
                        
                        <div className="card shadow single-form">
                            <div className="card-body">
                                <h5 className="card-title"><img src="/images/personal-details.png" style={{width: '35px', marginRight: '12px'}} />Personal Details</h5>
                                <hr/>
                                <p className="card-text"><img src="/images/username.png" style={{width: '25px', marginRight: '12px'}} />{client.firstName} {client.lastName}</p>
                                <p className="card-text"><img src="/images/age.png" style={{width: '25px', marginRight: '12px'}} />{client.age}</p>
                                <p className="card-text"><img src="/images/e-mail.png" style={{width: '25px', marginRight: '12px'}} />{client.email}</p>
                                <p className="card-text"><img src="/images/address.png" style={{width: '25px', marginRight: '12px'}} />{client.address} {client.city} {client.state} {client.zip}</p>
                                <p className="card-text"><img src="/images/mobile-phone.png" style={{width: '25px', marginRight: '12px'}} />{client.cellPhone} 
                                    <img src="/images/telephone.png" style={{width: '25px', marginRight: '12px', marginLeft: '12px'}} /> {client.homePhone}
                                </p>
                                
                                <h5 className="card-title pt-3"><img src="/images/details-pane.png" style={{width: '35px', marginRight: '12px'}} />Foster Information</h5>
                                <hr/>
                                <p className="card-text"><img src="/images/area.png" style={{width: '25px', marginRight: '12px'}} />{client.area}</p>
                                <p className="card-text"><img src="/images/experience-skill.png" style={{width: '25px', marginRight: '12px'}} />{client.experience}</p>
                                <p className="card-text"><img src="/images/about-us.png" style={{width: '25px', marginRight: '12px'}} />{client.aboutYou}</p>
                            </div>
                        </div>

                    </div>
                </div>
                
            </section>
        </div>
    
    )
}
