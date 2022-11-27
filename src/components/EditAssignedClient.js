
import React, { useState, useEffect } from 'react'
import AdminAPI from '../services/AdminAPI'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import ReactPaginate from 'react-paginate'

export const EditAssignedClient = () => {

    const [openNav, setOpenNav] = useState(false)
    const showSidebar = () => setOpenNav(!openNav)

    const [applicants, setApplicants] = useState([])
    const [filterF, setFilterF] = useState('All')

    const [pageNumber, setPageNumber] = useState(0)

    const getAllAssignedAnimals = () => {
        AdminAPI.getAllAssignedAnimals().then((response) => {
            setApplicants(response.data)
        }).catch(error =>{
            console.log(error)
        })
    }

    useEffect(() => {
        getAllAssignedAnimals();
    }, [])

    // delete assigned client form completely
    const deleteAssignClient = (aid) => {
        AdminAPI.deleteAssignClient(aid).then((response) =>{
            getAllAssignedAnimals();
        }).catch(error =>{
            console.log(error);
        })
    }

    const filteredItems = applicants.filter((sort =>{

        // filter by foster program

        if(filterF === 'Short Term Foster (average of 1-3 weeks)'){
            return sort.aprogram === 'Short Term Foster (average of 1-3 weeks)'
        }else if(filterF === 'All'){
            return applicants
        }

        if(filterF === 'Family Foster (potentially 8-12 weeks)'){
            return sort.aprogram === 'Family Foster (potentially 8-12 weeks)'
        }else if(filterF === 'All'){
            return applicants
        }

        if(sort.aprogram === filterF){
            return sort.aprogram === 'Weekend Sleepovers (2-3 nights)'
        }else if(filterF === 'All'){
            return applicants
        }

        // filter by animal type
        if(filterF === 'Dogs'){
            return sort.aanimal_interest[0] === 'Bottle Baby Puppies' || sort.aanimal_interest[0] === 'Puppies (up to 6 months)' 
            || sort.aanimal_interest[0] === 'Small Adult (less than 25 lbs)' || sort.aanimal_interest[0] === 'Medium Adult (25 - 45 lbs)' 
            || sort.aanimal_interest[0] === 'Large Adult (50 - 110 lbs)' || sort.aanimal_interest[0] === 'Pregnant/ Nursing Dog Moms' || sort.aanimal_interest[0] === 'Shy/ Fearful Dogs'
            || sort.aanimal_interest[0] === 'Seniors' || sort.aanimal_interest[0] === 'Medical Cases Dogs'  
        }else if(filterF === 'All'){
            return applicants
        }

        if(filterF === 'Cats'){ 
            return sort.aanimal_interest[0] === 'Bottle Kitties ' 
            || sort.aanimal_interest[0] === 'Pregnant/ Nursing Moms' 
            || sort.aanimal_interest[0] === 'Adult Cats' || sort.aanimal_interest[0] === 'Cats/Kittens Needing Socialization' 
            || sort.aanimal_interest[0] === 'Cats/Kittens with Special Needs' || sort.aanimal_interest[0] === 'Senior Cats' 
            || sort.aanimal_interest[0] === 'Medical Cases'
        }else if(filterF === 'All'){
            return applicants
        }

    }))

    const usersPerPage = 5
    // no.of pages visited sofar
    const pagesVisited = pageNumber * usersPerPage

    const displayUsers = filteredItems
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => {
            return(
                <tbody className="text-center">
                    <tr key={item.aaId}>
                        <td>{item.aaId}</td>
                        <td>
                            <div className="">
                                <p className="fw-bold mb-1">{item.afirstName} {item.alastName}</p>
                                <p className="text-muted mb-0">{item.aemail}</p>
                            </div>
                        </td>
                        <td>{item.acellPhone}</td>
                        <td>
                            <Link to={`/update_assigned_client_list/${item.aaId}`} className="btn">
                                <img style={{width: '25px'}} src="/images/update.png" alt="delete" />
                                <p className="text-muted">Update</p>
                            </Link>

                            <a className="btn" onClick={()=>deleteAssignClient(item.aaId)}
                                style={{marginLeft:10}}><img style={{width: '25px'}} src="/images/delete-forever.png" alt="delete" />
                                <p className="text-muted">Delete</p>
                            </a>
                        </td>
                    </tr>
                </tbody>
            )
        })
    
        const pageCount = Math.ceil(filteredItems.length / usersPerPage)

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
                    <div className="container-fluid main_body">

                        <h2 className="text-center text-muted">Edit Pet Assigned Client Forms</h2>
                        <hr />

                        <div className="filter">
                            <h4>Filter By: {filterF}</h4>
                            
                            <select className="selectpicker" value={filterF} onChange={(e)=> setFilterF(e.target.value)}>
                                <option>
                                    All
                                </option>
                                <option>
                                    Weekend Sleepovers (2-3 nights)
                                </option>
                                <option>
                                    Short Term Foster (average of 1-3 weeks)
                                </option>
                                <option>
                                    Family Foster (potentially 8-12 weeks)
                                </option>
                                <option>
                                    Dogs
                                </option>
                                <option>
                                    Cats
                                </option>
                            </select>

                        </div>
                        
                        <hr/>
                        
                        <div style={{paddingTop: '20px'}}>
                            <table className="table align-middle mb-0 bg-white">
                                <thead className="bg-light text-center">
                                    <tr>
                                    <th>Id</th>
                                    <th>Applicant Info</th>
                                    <th>Phone Number</th>
                                    <th style={{paddingLeft: '30px'}}>Actions</th>
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
