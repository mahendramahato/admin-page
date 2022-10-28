import React, { useState, useEffect } from 'react'
import AdminAPI from '../services/AdminAPI'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const pageSize = 5;

export const ListData = () => {

    const [openNav, setOpenNav] = useState(false)
    const showSidebar = () => setOpenNav(!openNav)

    const [applicants, setApplicants] = useState([])
    const [paginatedClients, setPaginatedClients] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const getAllClients = () => {
        AdminAPI.getAllClients().then((response) => {
            setApplicants(response.data)

            setPaginatedClients(_(response.data).slice(0).take(pageSize).value())
        }).catch(error =>{
            console.log(error)
        })
    }

    useEffect(() => {
        getAllClients();
    }, [])
    
    const pageCount = applicants ? Math.ceil(applicants.length/pageSize) : 0;
    if(pageCount === 0) return null;
    const pages = _.range(1, pageCount+1)

    const pagination = (pageNo) => {
        setCurrentPage(pageNo)
        const startIndex = (pageNo - 1) * pageSize
        const paginatedPost = _(applicants).slice(startIndex).take(pageSize).value()
        setPaginatedClients(paginatedPost)
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
                    <div className="container-fluid main_body" style={{height: '469px'}}>

                        <h2 className="text-center">Applicant List</h2>
                        
                        <div style={{paddingTop: '20px'}}>
                            <table className="table align-middle mb-0 bg-white">
                                <thead className="bg-light">
                                    <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paginatedClients.map(
                                            client =>
                                            <tr key={client.id}>
                                                <td>{client.id}</td>
                                                <td>
                                                    <div className="">
                                                        <p className="fw-bold mb-1">{client.firstName} {client.lastName}</p>
                                                        <p className="text-muted mb-0">{client.email}</p>
                                                    </div>
                                                </td>
                                                <td>{client.age}</td>
                                                <td>{client.cellPhone}</td>
                                                <td>
                                                    <p className="fw-normal mb-1">{client.address}</p>
                                                </td>
                                                <td>
                                                    <Link to={`/more_info/${client.id}`} className="btn btn-primary">More Details</Link>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* pagination menu code */}
                    <div className="row" style={{marginTop: 20}}>
                        <nav className="d-flex justify-content-center" aria-label="Page navigation example">
                            <ul className="pagination pg-blue">
                                {
                                    pages.map((page)=>(
                                        <li className={
                                            page === currentPage? "page-item active" : "page-item"
                                        }>
                                            <p className="page-link" onClick={()=>pagination(page)}>
                                                {page}
                                            </p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>

                </div>
                
            </section>
        </div>

    )
}
