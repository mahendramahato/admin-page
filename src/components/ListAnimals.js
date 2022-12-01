import { Link } from 'react-router-dom'
import AnimalAPI from '../services/AnimalAPI';
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import ReactPaginate from 'react-paginate';

export const ListAnimals = () => {

    const [openNav, setOpenNav] = useState(false)
    const showSidebar = () => setOpenNav(!openNav)

    const [animals, setAnimals] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    const getAllAnimals = () => {
        AnimalAPI.getAllAnimals().then((response) => {
            setAnimals(response.data)
            // console.log(response.data)
        }).catch(error =>{
            console.log(error)
        })
    }

    useEffect(() => {
        getAllAnimals();
    }, [])

    // delete assigned client form completely
    const deleteAnimal = (aid) => {
        AnimalAPI.deleteForm(aid).then((response) =>{
            getAllAnimals();
        }).catch(error =>{
            console.log(error);
        })
    }
    
    const usersPerPage = 5
    // no.of pages visited sofar
    const pagesVisited = pageNumber * usersPerPage

    const displayUsers = animals
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => {
            return(
                <tbody className="text-center">
                    <tr key={item.animalId}>
                        <td>{item.animalId}</td>
                        <td>
                            <div className="">
                                <p className="fw-bold mb-1">{item.petName}</p>
                            </div>
                        </td>
                        <td><p className="text-muted mb-0">{item.type}</p></td>
                        <td>{item.program}</td>
                        <td><h4><span className="badge bg-warning text-dark">{item.status}</span></h4></td>
                        <td>
                            <Link to={`/update_animals/${item.animalId}`} className="btn" style={{marginRight: '10px'}}>
                                <img style={{width: '25px'}} src="/images/update.png" alt="update" />
                                <p className="text-muted">Update</p>
                            </Link>
                            <a className="btn" onClick={()=>deleteAnimal(item.animalId)}>
                                <img style={{width: '25px'}} src="/images/delete-forever.png" alt="delete" />
                                <p className="text-muted">Delete</p>
                            </a>
                        </td>
                    </tr>
                </tbody>
            )
        })
    
        const pageCount = Math.ceil(animals.length / usersPerPage)

        const changePage = ({selected}) => {
            setPageNumber(selected)
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
                        
                        <h2 className="text-center text-muted">Animal List</h2>
                        
                        <div style={{paddingTop: '20px'}}>
                            <table className="table align-middle mb-0 bg-white">
                                <thead className="bg-light text-center">
                                    <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Available for</th>
                                    <th>Assigned Status</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                { displayUsers }
                            </table>
                        </div>
                    </div>

                    {/* pagination menu code */}
                    <div className="row d-flex justify-content-center" style={{marginTop: 20}}>
                        <ReactPaginate 
                            previousLabel={"Previous"}
                            nextAriaLabel={"Next"}
                            pageCount={ pageCount }
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    </div>

                </div>
                
            </section>
        </div>

    )
}
