
import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import AdminAPI from '../services/AdminAPI'

export const UpdateAssignedClient = () => {

    const [openNav, setOpenNav] = useState(false)
    const showSidebar = () => setOpenNav(!openNav)

    const [afirstName, setFirstName] = useState('')
    const [alastName, setLastName] = useState('')
    const [aemail, setEmail] = useState('')
    const [acellPhone, setCellphone] = useState('')
    const [aanimals, setAanimals] = useState([
        {petName: '', animalType: '', appointment_information: '', appointment_scale: ''}
    ])

    const [firstName, setFirstName1] = useState('')
    const [lastName, setLastName1] = useState('')
    const [email, setEmail1] = useState('')
    const [cellPhone, setCellphone1] = useState('')

    const [childrenNumber, setChildrenNumber] = useState('')
    const [childrenAge, setChildrenAge] = useState('')
    const [existingPetInfo, setExistingPetInfo] = useState('')
    const [alter, setPetAlter] = useState('')
    const [program, setFosterProgram] = useState('')
    const [animal_interest, setAnimalInterest] = useState([])

    const [area, setArea] = useState('')
    const [experience, setExperience] = useState('')
    const [aboutyou, setAboutyou] = useState('')

    const [deleteAForms, setDeleteAForms] = useState('')


    const handleFormChange = (e, index)=>{
        let data = [...aanimals]
        data[index][e.target.name] = e.target.value
        setAanimals(data)

    }

    const navigate = useNavigate();
    const {aaId} = useParams();

    const Update = (e, index) => {
        e.preventDefault();

        const client = {afirstName, alastName, aemail, acellPhone, aanimals }

        AdminAPI.updateAForm(aaId, client).then((response) =>{
            navigate('/assigned_client_list')
        }).catch(error =>{
            console.log(error)
        })

    }

    const Unassign = (e) =>{
        e.preventDefault()

        const un_client = {firstName, lastName, email, cellPhone, 
            childrenNumber, childrenAge, existingPetInfo, alter, program, animal_interest, 
            area, experience, aboutyou}

        // delete assigned client form completely
        AdminAPI.deleteAssignClient(deleteAForms).then((response) =>{
            console.log("deleted successfully")
        }).catch(error =>{
            console.log(error);
        })
        
        AdminAPI.createClient(un_client).then((response) =>{
            console.log(response.data)
            navigate('/assigned_client_list')

        }).catch(error =>{
            console.log(error)
        })    
    }

    useEffect(() => {
        AdminAPI.getAssignedClientById(aaId).then((response) =>{
            setDeleteAForms(aaId)
            setFirstName(response.data.afirstName)
            setLastName(response.data.alastName)
            setEmail(response.data.aemail)
            setCellphone(response.data.acellPhone)
            setAanimals(response.data.aanimals)

            setFirstName1(response.data.afirstName)
            setLastName1(response.data.alastName)
            setEmail1(response.data.aemail)
            setCellphone1(response.data.acellPhone)

            setChildrenAge(response.data.achildrenNumber)
            setChildrenNumber(response.data.achildrenAge)
            setExistingPetInfo(response.data.aexistingPetInfo)
            setPetAlter(response.data.aalter)
            setFosterProgram(response.data.aprogram)
            setArea(response.data.aarea)
            setAnimalInterest(response.data.aanimal_interest)
            setExperience(response.data.aexperience)
            setAboutyou(response.data.aaboutyou)

            //console.log(response.data)
            
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const addFields = () => {
        let object = {
            petName: '', animalType: '', appointment_information: '', appointment_scale: ''
        }
        setAanimals([...aanimals, object])
    }

    const removeFields = (index) => {
        let data = [...aanimals]

        data.splice(index, 1)
        setAanimals(data)  
    }

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
                    <div className="container-fluid main_body">
                        
                        <h2 className="text-center text-muted">Update Pet Assigned Client</h2>

                        <div className="container">

                            <form className="row g-3">
                                <h4 className="title-form pt-4">Personal Information</h4>
                                <hr/>

                                <div className="col-md-6">
                                    <label htmlFor="inputFname" className="form-label">FirstName</label>
                                    <input 
                                    type="firstName" 
                                    className="form-control" 
                                    id="inputFname"
                                    name="afirstName"
                                    value={afirstName}
                                    onChange={(e)=> setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputLname" className="form-label">LastName</label>
                                    <input 
                                    type="lastName" 
                                    className="form-control" 
                                    id="inputLname"
                                    name="alastName"
                                    value={alastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="inputEmail" className="form-label">Email</label>
                                    <input 
                                    type="email" 
                                    className="form-control" 
                                    id="inputEmail"
                                    name="aemail"
                                    value={aemail}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="inputCellPhone" className="form-label">Cell Phone</label>
                                    <input 
                                    type="cellphone" 
                                    className="form-control" 
                                    id="inputCellPhone"
                                    name="acellPhone"
                                    value={acellPhone}
                                    onChange={(e) => setCellphone(e.target.value)}
                                    />
                                </div>

                                <h4 className="title-form">Assigned Pet Information</h4>
                                <hr />

                                <div className="">
                                    {aanimals.map((frm, index)=> {
                                        return(
                                        <div key={index}>
                                            {/* <div className="row">
                                                <div className="col-md-2">
                                                    <label htmlFor="inputPet" className="col-form-label">Pet Name</label>
                                                    <div className="">
                                                    <input type="name" className="form-control" id="inputPet" name="petName"
                                                    value={frm.petName} onChange={(e)=> handleFormChange(e, index)} />
                                                    </div>
                                                </div>

                                                <fieldset className="col-md-2">
                                                    <legend className="col-form-label">Type</legend>
                                                    <div className="">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="gridRadio" 
                                                            id="dogradio"/>
                                                            <label className="form-check-label" htmlFor="gridRadios1">
                                                            Dog
                                                            </label>

                                                            <div id="reveal-if-dog">
                                                                <label className="form-label fw-bold">Dog Types</label>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio"
                                                                        value="Bottle Baby Puppies" name="animalType"
                                                                        onChange={(e)=> handleFormChange(e, index)}
                                                                        id="flexCheckDefault1"/>
                                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                            Bottle Baby Puppies
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio"
                                                                        value="Puppies (up to 6 months)" name="animalType"
                                                                        onChange={(e)=> handleFormChange(e, index)}
                                                                        id="flexCheckDefault1"/>
                                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                            Puppies (up to 6 months)
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio" 
                                                                        value="Small Adult (less than 25 lbs)" name="animalType"
                                                                        onChange={(e)=> handleFormChange(e, index)}
                                                                        id="flexCheckDefault1"/>
                                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                            Small Adult (less than 25 lbs)
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio" 
                                                                        value="Medium Adult (25 - 45 lbs)" name="animalType"
                                                                        onChange={(e)=> handleFormChange(e, index)}
                                                                        id="flexCheckDefault1"/>
                                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                            Medium Adult (25 - 45 lbs)
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio" 
                                                                        value="Large Adult (50 - 110 lbs)" name="animalType"
                                                                        onChange={(e)=> handleFormChange(e, index)}
                                                                        id="flexCheckDefault1"/>
                                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                            Large Adult (50 - 110 lbs)
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio" 
                                                                        value="Pregnant/ Nursing Dog Moms" name="animalType"
                                                                        onChange={(e)=> handleFormChange(e, index)}
                                                                        id="flexCheckDefault1"/>
                                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                            Pregnant/ Nursing Moms
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio" 
                                                                        value="Shy/ Fearful Dogs" name="animalType"
                                                                        onChange={(e)=> handleFormChange(e, index)}
                                                                        id="flexCheckDefault1"/>
                                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                            Shy/ Fearful Dogs
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio" 
                                                                        value="Seniors" name="animalType"
                                                                        onChange={(e)=> handleFormChange(e, index)}
                                                                        id="flexCheckDefault1"/>
                                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                            Seniors
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio" 
                                                                        value="Medical Cases Dogs" name="animalType"
                                                                        onChange={(e)=> handleFormChange(e, index)}
                                                                        id="flexCheckDefault1"/>
                                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                            Medical Cases
                                                                        </label>
                                                                    </div>
                                                            </div>

                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="gridRadio" 
                                                            id="catradio"/>
                                                            <label className="form-check-label" htmlFor="gridRadios2">
                                                            Cat
                                                            </label>

                                                            <div id="reveal-if-cat">
                                                            <label className="form-label fw-bold">Cat Types</label>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" 
                                                                value="Bottle Kitties" name="animalType"
                                                                onChange={(e)=> handleFormChange(e, index)}
                                                                id="flexCheckDefault"/>
                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                    Bottle Kitties
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" 
                                                                value="Pregnant/ Nursing Moms" name="animalType"
                                                                onChange={(e)=> handleFormChange(e, index)}
                                                                id="flexCheckDefault"/>
                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                    Pregnant/ Nursing Moms
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" 
                                                                value="Adult Cats" name="animalType"
                                                                onChange={(e)=> handleFormChange(e, index)} 
                                                                id="flexCheckDefault"/>
                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                    Adult Cats
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" 
                                                                value="Cats/Kittens Needing Socialization" name="animalType"
                                                                onChange={(e)=> handleFormChange(e, index)}
                                                                id="flexCheckDefault"/>
                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                    Cats/Kittens Needing Socialization
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio"
                                                                value="Cats/Kittens with Special Needs" name="animalType"
                                                                onChange={(e)=> handleFormChange(e, index)}
                                                                id="flexCheckDefault"/>
                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                    Cats/Kittens with Special Needs
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" 
                                                                value="Senior Cats" name="animalType"
                                                                onChange={(e)=> handleFormChange(e, index)}
                                                                id="flexCheckDefault"/>
                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                    Senior Cats
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" 
                                                                value="Medical Cases" name="animalType"
                                                                onChange={(e)=> handleFormChange(e, index)}
                                                                id="flexCheckDefault"/>
                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                    Medical Cases
                                                                </label>
                                                            </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </fieldset>


                                                <fieldset className="col-md-2">
                                                    <legend className="col-form-label">Assigned Status</legend>
                                                    <div className="col-sm-7">
                                                    <div className="form-check statyes">
                                                        <input className="form-check-input" type="radio"
                                                        name="assign_status" id="gridRadios11" value={"Yes"}
                                                        onChange={(e)=> handleFormChange(e, index)} />
                                                        <label className="form-check-label" htmlFor="gridRadios1">
                                                        Active
                                                        </label>
                                                    </div>
                                                    <div className="form-check statno">
                                                        <input className="form-check-input" type="radio"
                                                        name="assign_status" id="gridRadios11" value={"No"}
                                                        onChange={(e)=> handleFormChange(e, index)} />
                                                        <label className="form-check-label" htmlFor="gridRadios1">
                                                        Inactive
                                                        </label>
                                                    </div>
                                                    </div>
                                                </fieldset>


                                                <div className="col-md-2">
                                                    <label htmlFor="inputAppointments" className="form-label fs">Appointment Information</label>
                                                    <textarea 
                                                    row="20" 
                                                    type="textd" 
                                                    className="form-control" 
                                                    id="inputAppointments"
                                                    name="appointment_information"
                                                    value={frm.appointment_information}
                                                    onChange={(e)=> handleFormChange(e, index)}
                                                    />
                                                </div>

                                                <fieldset className="col-md-2">
                                                    <legend className="col-form-label">Appointment Severity Scale</legend>
                                                    <div className="col-sm-7">

                                                        <div className="form-check statlow">
                                                            <input className="form-check-input" type="radio"
                                                            name="appointment_scale" id="low" value="Low" onChange={(e)=> handleFormChange(e, index)} />
                                                            <label className="form-check-label" htmlFor="low">
                                                            Low
                                                            </label>
                                                        </div>
                                                        <div className="form-check statmed">
                                                            <input className="form-check-input" type="radio" 
                                                            name="appointment_scale" id="med" value={"Medium"} onChange={(e)=> handleFormChange(e, index)} />
                                                            <label className="form-check-label" htmlFor="med">
                                                            Medium
                                                            </label>
                                                        </div>
                                                        <div className="form-check stathigh">
                                                            <input className="form-check-input" type="radio" 
                                                            name="appointment_scale" id="hi" value={"High"} onChange={(e)=> handleFormChange(e, index)} />
                                                            <label className="form-check-label" htmlFor="hi">
                                                            High
                                                            </label>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <div className="col-md-2 additems">
                                    
                                                    <img style={{width: '45px', cursor: 'pointer'}} 
                                                    onClick={ addFields } src="/images/add.png" alt="more"></img>
                                                    <p className="text-muted">Add Row</p>
                                                
                                                    <img style={{width: '45px', cursor: 'pointer'}}
                                                    onClick={ ()=> removeFields(index) } src="/images/remove.png" alt="more"></img>
                                                    <p className="text-muted">Remove Row</p>
                                                </div>
                                            </div>  */}

                                            <table className="table align-middle mb-0 bg-white">
                                                <thead className="bg-light text-center">
                                                    <tr>
                                                    <th>Pet Name</th>
                                                    <th>Type</th>
                                                    <th>Appointment Information</th>
                                                    <th>Appointment Severity Scale</th>
                                                    <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-center">
                                                    <tr>
                                                        <td>
                                                            <input type="name" className="form-control" id="inputPet" name="petName"
                                                            value={frm.petName} onChange={(e)=> handleFormChange(e, index)} />
                                                        </td>
                                                        {/* animal type */}
                                                        <td>
                                                            <fieldset className="">
                                                                
                                                                <div className="">
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio" name="gridRadio" 
                                                                        id="dogradio"/>
                                                                        <label className="form-check-label" htmlFor="gridRadios1">
                                                                        Dog
                                                                        </label>

                                                                        <div id="reveal-if-dog">
                                                                            <label className="form-label fw-bold">Dog Types</label>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio"
                                                                                    value="Bottle Baby Puppies" name="animalType"
                                                                                    onChange={(e)=> handleFormChange(e, index)}
                                                                                    id="flexCheckDefault1"/>
                                                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                                        Bottle Baby Puppies
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio"
                                                                                    value="Puppies (up to 6 months)" name="animalType"
                                                                                    onChange={(e)=> handleFormChange(e, index)}
                                                                                    id="flexCheckDefault1"/>
                                                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                                        Puppies (up to 6 months)
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" 
                                                                                    value="Small Adult (less than 25 lbs)" name="animalType"
                                                                                    onChange={(e)=> handleFormChange(e, index)}
                                                                                    id="flexCheckDefault1"/>
                                                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                                        Small Adult (less than 25 lbs)
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" 
                                                                                    value="Medium Adult (25 - 45 lbs)" name="animalType"
                                                                                    onChange={(e)=> handleFormChange(e, index)}
                                                                                    id="flexCheckDefault1"/>
                                                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                                        Medium Adult (25 - 45 lbs)
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" 
                                                                                    value="Large Adult (50 - 110 lbs)" name="animalType"
                                                                                    onChange={(e)=> handleFormChange(e, index)}
                                                                                    id="flexCheckDefault1"/>
                                                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                                        Large Adult (50 - 110 lbs)
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" 
                                                                                    value="Pregnant/ Nursing Dog Moms" name="animalType"
                                                                                    onChange={(e)=> handleFormChange(e, index)}
                                                                                    id="flexCheckDefault1"/>
                                                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                                        Pregnant/ Nursing Moms
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" 
                                                                                    value="Shy/ Fearful Dogs" name="animalType"
                                                                                    onChange={(e)=> handleFormChange(e, index)}
                                                                                    id="flexCheckDefault1"/>
                                                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                                        Shy/ Fearful Dogs
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" 
                                                                                    value="Seniors" name="animalType"
                                                                                    onChange={(e)=> handleFormChange(e, index)}
                                                                                    id="flexCheckDefault1"/>
                                                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                                        Seniors
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" 
                                                                                    value="Medical Cases Dogs" name="animalType"
                                                                                    onChange={(e)=> handleFormChange(e, index)}
                                                                                    id="flexCheckDefault1"/>
                                                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                                        Medical Cases
                                                                                    </label>
                                                                                </div>
                                                                        </div>

                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio" name="gridRadio" 
                                                                        id="catradio"/>
                                                                        <label className="form-check-label" htmlFor="gridRadios2">
                                                                        Cat
                                                                        </label>

                                                                        <div id="reveal-if-cat">
                                                                        <label className="form-label fw-bold">Cat Types</label>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="radio" 
                                                                            value="Bottle Kitties" name="animalType"
                                                                            onChange={(e)=> handleFormChange(e, index)}
                                                                            id="flexCheckDefault"/>
                                                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                Bottle Kitties
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="radio" 
                                                                            value="Pregnant/ Nursing Moms" name="animalType"
                                                                            onChange={(e)=> handleFormChange(e, index)}
                                                                            id="flexCheckDefault"/>
                                                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                Pregnant/ Nursing Moms
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="radio" 
                                                                            value="Adult Cats" name="animalType"
                                                                            onChange={(e)=> handleFormChange(e, index)} 
                                                                            id="flexCheckDefault"/>
                                                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                Adult Cats
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="radio" 
                                                                            value="Cats/Kittens Needing Socialization" name="animalType"
                                                                            onChange={(e)=> handleFormChange(e, index)}
                                                                            id="flexCheckDefault"/>
                                                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                Cats/Kittens Needing Socialization
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="radio"
                                                                            value="Cats/Kittens with Special Needs" name="animalType"
                                                                            onChange={(e)=> handleFormChange(e, index)}
                                                                            id="flexCheckDefault"/>
                                                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                Cats/Kittens with Special Needs
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="radio" 
                                                                            value="Senior Cats" name="animalType"
                                                                            onChange={(e)=> handleFormChange(e, index)}
                                                                            id="flexCheckDefault"/>
                                                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                Senior Cats
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="radio" 
                                                                            value="Medical Cases" name="animalType"
                                                                            onChange={(e)=> handleFormChange(e, index)}
                                                                            id="flexCheckDefault"/>
                                                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                Medical Cases
                                                                            </label>
                                                                        </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </fieldset>
                                                        </td>
                                                        
                                                        {/* appointment information  */}
                                                        <td>
                                                            <textarea 
                                                            row="20" 
                                                            type="textd" 
                                                            className="form-control" 
                                                            id="inputAppointments"
                                                            name="appointment_information"
                                                            value={frm.appointment_information}
                                                            onChange={(e)=> handleFormChange(e, index)}
                                                            />
                                                        </td>
                                                        {/* appointment scale menu */}
                                                        <td>
                                                            <fieldset className="">
                                                                <legend className="col-form-label"></legend>
                                                                    <div className="form-check statlow">
                                                                        <input className="form-check-input" type="radio"
                                                                        name="appointment_scale" id="low" value="Low" onChange={(e)=> handleFormChange(e, index)} />
                                                                        <label className="form-check-label" htmlFor="low">
                                                                        Low
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check statmed">
                                                                        <input className="form-check-input" type="radio" 
                                                                        name="appointment_scale" id="med" value={"Medium"} onChange={(e)=> handleFormChange(e, index)} />
                                                                        <label className="form-check-label" htmlFor="med">
                                                                        Medium
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check stathigh">
                                                                        <input className="form-check-input" type="radio" 
                                                                        name="appointment_scale" id="hi" value={"High"} onChange={(e)=> handleFormChange(e, index)} />
                                                                        <label className="form-check-label" htmlFor="hi">
                                                                        High
                                                                        </label>
                                                                    </div>
                                                            </fieldset>
                                                        </td>
                                                        {/* action menu */}
                                                        <td>
                                                            <div className="additems">           
                                                                <img style={{width: '45px', cursor: 'pointer'}} 
                                                                onClick={ addFields } src="/images/add.png" alt="more"></img>
                                                                <p className="text-muted">Add Row</p>
                                                            
                                                                <img style={{width: '45px', cursor: 'pointer'}}
                                                                onClick={ ()=> removeFields(index) } src="/images/remove.png" alt="more"></img>
                                                                <p className="text-muted">Remove Row</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>                    
                                        </div>
                                        
                                        )
                                    })}
                                </div>
                            </form>

                        </div>

                        
                        <div className="container d-flex pb-4" style={{marginTop: 20, marginBottom: 20, justifyContent: 'center'}}>
                            <button type="submit" className="btn btn-success" style={{marginRight: 10}} onClick={(e) => Update(e)} >Update</button>
                            
                            <button type="submit" className="btn btn-warning" 
                                style={{marginRight: 10}} onClick={(e) => Unassign(e)} >
                                    Unassign Pet
                            </button>

                            <div>
                                <Link className="btn btn-danger" to={`/edit_assigned_client_list`}>Cancel</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
        </div>

    )
}
