import { Link, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AnimalAPI from '../services/AnimalAPI'

export const UpdateAnimal = () => {

    const [openNav, setOpenNav] = useState(false)
    const showSidebar = () => setOpenNav(!openNav)

    const [petName, setPetName] = useState('')
    const [type, setType] = useState('')
    const [program, setFosterProgram] = useState('')
    const [status, setStatus] = useState('')

    const navigate = useNavigate()
    const {animalId} = useParams()

    const Update = (e) => {
        e.preventDefault()

        const animal = {petName, type, program, status}

        AnimalAPI.updateForm(animalId, animal).then((response) =>{

            console.log(response.data)
            navigate('/list_animals')

        }).catch(error =>{
            console.log(error)
        })  
    }

    useEffect(() => {
        AnimalAPI.getAnimalById(animalId).then((response) =>{
            setPetName(response.data.petName)
            setType(response.data.type)
            setFosterProgram(response.data.program)
            setStatus(response.data.status)
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
                        <div className="row">
                            <h2 className="text-center text-muted">Update Animal</h2>
                        </div>

                        <form>
                            <h4>Animal Info</h4>
                            <hr/>
                            <div className="row mb-3">
                                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-5">
                                <input type="name" className="form-control" value={petName}
                                name="petName" id="inputName" onChange={(e)=> setPetName(e.target.value)}/>
                                </div>
                            </div>

                            <fieldset className="row mb-3">
                                <legend className="col-form-label col-sm-2 pt-0">Type</legend>
                                <div className="col-sm-10">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gridRadios" 
                                        id="dogradio"/>
                                        <label className="form-check-label" htmlFor="gridRadios1">
                                        Dog
                                        </label>

                                        <div id="reveal-if-dog">
                                            <label className="form-label fw-bold">Dog Types</label>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio"
                                                    value="Bottle Baby Puppies" name="type"
                                                    onChange={(e)=> setType(e.target.value)}
                                                    id="flexCheckDefault1"/>
                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                        Bottle Baby Puppies
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio"
                                                    value="Puppies (up to 6 months)" name="type"
                                                    onChange={(e)=> setType(e.target.value)}
                                                    id="flexCheckDefault1"/>
                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                        Puppies (up to 6 months)
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" 
                                                    value="Small Adult (less than 25 lbs)" name="type"
                                                    onChange={(e)=> setType(e.target.value)}
                                                    id="flexCheckDefault1"/>
                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                        Small Adult (less than 25 lbs)
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" 
                                                    value="Medium Adult (25 - 45 lbs)" name="type"
                                                    onChange={(e)=> setType(e.target.value)}
                                                    id="flexCheckDefault1"/>
                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                        Medium Adult (25 - 45 lbs)
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" 
                                                    value="Large Adult (50 - 110 lbs)" name="type"
                                                    onChange={(e)=> setType(e.target.value)}
                                                    id="flexCheckDefault1"/>
                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                        Large Adult (50 - 110 lbs)
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" 
                                                    value="Pregnant/ Nursing Dog Moms" name="type"
                                                    onChange={(e)=> setType(e.target.value)}
                                                    id="flexCheckDefault1"/>
                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                        Pregnant/ Nursing Moms
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" 
                                                    value="Shy/ Fearful Dogs" name="type"
                                                    onChange={(e)=> setType(e.target.value)}
                                                    id="flexCheckDefault1"/>
                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                        Shy/ Fearful Dogs
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" 
                                                    value="Seniors" name="type"
                                                    onChange={(e)=> setType(e.target.value)}
                                                    id="flexCheckDefault1"/>
                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                        Seniors
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" 
                                                    value="Medical Cases Dogs" name="type"
                                                    onChange={(e)=> setType(e.target.value)}
                                                    id="flexCheckDefault1"/>
                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                        Medical Cases
                                                    </label>
                                                </div>
                                        </div>

                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gridRadios" 
                                        id="catradio"/>
                                        <label className="form-check-label" htmlFor="gridRadios2">
                                        Cat
                                        </label>

                                        <div id="reveal-if-cat">
                                        <label className="form-label fw-bold">Cat Types</label>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" 
                                            value="Bottle Kitties" name="type"
                                            onChange={(e)=> setType(e.target.value)}
                                            id="flexCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Bottle Kitties
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" 
                                            value="Pregnant/ Nursing Moms" name="type"
                                            onChange={(e)=> setType(e.target.value)}
                                            id="flexCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Pregnant/ Nursing Moms
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" 
                                            value="Adult Cats" name="type"
                                            onChange={(e)=> setType(e.target.value)} 
                                            id="flexCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Adult Cats
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" 
                                            value="Cats/Kittens Needing Socialization" name="type"
                                            onChange={(e)=> setType(e.target.value)}
                                            id="flexCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Cats/Kittens Needing Socialization
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio"
                                            value="Cats/Kittens with Special Needs" name="type"
                                            onChange={(e)=> setType(e.target.value)}
                                            id="flexCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Cats/Kittens with Special Needs
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" 
                                            value="Senior Cats" name="type"
                                            onChange={(e)=> setType(e.target.value)}
                                            id="flexCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Senior Cats
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" 
                                            value="Medical Cases" name="type"
                                            onChange={(e)=> setType(e.target.value)}
                                            id="flexCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Medical Cases
                                            </label>
                                        </div>
                                        </div>

                                    </div>
                                </div>
                            </fieldset>

                            <h4>Foster Info</h4>
                            <hr/>
                            <div className="row mb-3">
                                <legend className="col-form-label col-sm-2 pt-0">Available For</legend>
                                <div className="col-sm-10">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            id="fosterprogram"
                                            type="radio" 
                                            name="program"
                                            value="Weekend Sleepovers (2-3 nights)"
                                            onChange={(e) => setFosterProgram(e.target.value)}
                                        /> Weekend Sleepovers (2-3 nights)
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            id="fosterprogram"
                                            type="radio" 
                                            name="program"
                                            value="Short Term Foster (average of 1-3 weeks)"
                                            onChange={(e) => setFosterProgram(e.target.value)}
                                    /> Short Term Foster (average of 1-3 weeks)
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            id="fosterprogram"
                                            type="radio" 
                                            name="program"
                                            value="Family Foster (potentially 8-12 weeks)"
                                            onChange={(e) => setFosterProgram(e.target.value)}
                                        /> Family Foster (potentially 8-12 weeks)
                                    </div>
                                </div>
                            </div>

                            <fieldset className="row mb-3">
                                <legend className="col-form-label col-sm-2 pt-0">Assigned Status</legend>
                                <div className="col-sm-10">
                                <div className="form-check statyes">
                                    <input className="form-check-input" type="radio" 
                                    name="status" id="gridRadios1" value={"Yes"}
                                    onChange={(e)=> setStatus(e.target.value)} />
                                    <label className="form-check-label" htmlFor="gridRadios1">
                                    Active
                                    </label>
                                </div>
                                <div className="form-check statno">
                                    <input className="form-check-input" type="radio"
                                    name="status" id="gridRadios2" value={"No"}
                                    onChange={(e)=> setStatus(e.target.value)} />
                                    <label className="form-check-label" htmlFor="gridRadios2">
                                    InActive
                                    </label>
                                </div>
                                </div>
                            </fieldset>

                            <button type="submit" className="btn btn-primary"
                            onClick={(e)=> Update(e)} >Update</button>
                        </form>

                    </div>
                </div>
                
            </section>
        </div>

    )
}
