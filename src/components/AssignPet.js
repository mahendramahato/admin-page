import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import AdminAPI from '../services/AdminAPI'

export const AssignPet = () => {

    const [openNav, setOpenNav] = useState(false)
    const showSidebar = () => setOpenNav(!openNav)

    const [client, setClient] = useState([])
    const {formId} = useParams();

    const [afirstName, setFirstName] = useState('')
    const [alastName, setLastName] = useState('')
    const [aemail, setEmail] = useState('')
    const [acellPhone, setCellphone] = useState('')

    const [achildrenNumber, setChildrenNumber] = useState('')
    const [achildrenAge, setChildrenAge] = useState('')
    const [aexistingPetInfo, setExistingPetInfo] = useState('')
    const [aalter, setPetAlter] = useState('')
    const [aprogram, setFosterProgram] = useState('')
    const [aanimal_interest, setAnimalInterest] = useState([])

    const [aarea, setArea] = useState('')
    const [aexperience, setExperience] = useState('')
    const [aaboutyou, setAboutyou] = useState('')

    const [deleteForms, setDeleteForms] = useState('')

    // const [petName, setPetName] = useState('')
    // const [animalType, setAnimalType] = useState('')
    // const [assign_status, setAssignedToClient] = useState('')
    // const [appointment_information, setAppointments] = useState('')
    // const [appointment_scale, setScale] = useState('')

    const [aanimals, setAanimals] = useState([
        {petName: '', animalType: '', assign_status: '', appointment_information: '', appointment_scale: ''}
    ])

    const handleFormChange = (e, index)=>{
        //console.log(e.target.value)

        // const {value, checked} = e.target
        // console.log(`${value} is ${checked}`)
        let data = [...aanimals]
        data[index][e.target.name] = e.target.value
        setAanimals(data)

    }

    const navigate = useNavigate()

    useEffect(() => {
        AdminAPI.getClientById(formId).then((response) =>{
            setDeleteForms(formId)
            setClient(response.data)
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
            setCellphone(response.data.cellPhone)
            setChildrenNumber(response.data.childrenNumber)
            setChildrenAge(response.data.childrenAge)
            setExistingPetInfo(response.data.existingPetInfo)
            setPetAlter(response.data.alter)
            setFosterProgram(response.data.program)
            setArea(response.data.area)
            setExperience(response.data.experience)
            setAboutyou(response.data.aboutyou)
            setAnimalInterest(response.data.animal_interest)            
        }).catch(error=>{
            console.log(error)
        })
    }, [])

    const savePet = (e) => {
        e.preventDefault()

        const assignedPet = {afirstName, alastName, aemail, acellPhone, achildrenNumber,
            achildrenAge, aexistingPetInfo, aalter, aprogram, aanimal_interest, aarea,
            aexperience, aaboutyou, aanimals
        } 
        
        // delete client form completely
        AdminAPI.deleteForm(deleteForms).then((response) =>{
            console.log("deleted successfully")
        }).catch(error =>{
            console.log(error);
        })
        

        AdminAPI.createAssignClient(assignedPet).then((response) =>{
            // console.log(response.data)
            // console.log("saved successfully")
            navigate('/assigned_client_list')
        }).catch(error =>{
            console.log(error)
        })
    }

    const addFields = () => {
        let object = {
            petName: '', animalType: '', assign_status: '', appointment_information: '', appointment_scale: ''
        }
        setAanimals([...aanimals, object])
    }

    const removeFields = (index) => {
        let data = [...aanimals]
        if(index != 0){
            data.splice(index, 1)
            setAanimals(data)
        }     
    }

    // converting array of items into comma separated strings
    const arr = client.animal_interest
    const str = String(arr)

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
                        <h2 className="text-muted" style={{textAlign: 'center', paddingBottom: '20px'}}>Assign Pet</h2>
                        <hr />
                        <div className="row pb-4">

                            <div className="container pb-4">

                                <div className="card clr">
                                    <div className="card-body">
                                        <div className="row">
                                        <div className="col-md-6">
                                            {/* personal details part */}
                                            <h5 className="card-title"><img src="/images/personal-details.png" style={{width: '35px', marginRight: '12px'}} />Personal Details</h5>
                                            <hr/>
                                            <div className="more-information"><p className="more-information-content">Name </p> {client.firstName} {client.lastName}</div>
                                            <div className="more-information"><p className="more-information-content">E-mail </p> {client.email}</div>
                                            <div className="more-information"><p className="more-information-content">Phone </p> {client.cellPhone}</div>
                                        </div>

                                        <div className="col-md-6">
                                            {/* living arrangements part */}
                                            <h5 className="card-title"><img src="/images/living.png" style={{width: '35px', marginRight: '12px'}} />Foster Information</h5>
                                            <hr/>
                                            <div className="more-information">
                                                <p className="more-information-content">Foster Program Interested In</p> {client.program}
                                            </div>
                                            <div className="">
                                                <div className="more-information-content">Animal Interested In</div> 
                                                <p>{str}</p>  
                                            </div>
                                            <div className="more-information">
                                                <p className="more-information-content">Assigned Pet</p> {client.petName}
                                            </div>
                                            <div className="more-information">
                                                <p className="more-information-content">Type</p> {client.animalType}
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="container">
                                {aanimals.map((frm, index)=>{
                                    return(
                                    <div key={index}>
                                        <div className="row" style={{paddingLeft: '13px', paddingBottom: '10px'}}>

                                            <div className="card clr col-md-11">
                                                
                                                <div className="card-body">
                                                    <h5 className="card-title"><img src="/images/pets.png" style={{width: '35px', marginRight: '12px'}} />Assign Pet</h5>
                                                    <hr/>

                                                    <form>
                                                        <div className="row">
                                                        <div className="col-md-2">
                                                            <label htmlFor="inputPet" className="col-form-label">Assign Pet Name</label>
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


                                                        <div className="col-md-3">
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

                                                        <fieldset className="col-md-3">
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
                                                        </div>
                                                    </form>
                                    
                                                </div>
                                                
                                            </div>

                                            <div className="col-md-1 additems">
                                        
                                                <img style={{width: '45px', cursor: 'pointer'}} 
                                                onClick={ addFields } src="/images/add.png" alt="more"></img>
                                            
                                            
                                                <img style={{width: '45px', cursor: 'pointer'}}
                                                onClick={ ()=> removeFields(index) } src="/images/remove.png" alt="more"></img>
                                            
                                            </div>

                                        </div>
                                        
                                    </div>

                                    )

                                })}
                                <div className="container pt-3 text-center">

                                <button type="submit" className="btn btn-primary"
                                        onClick={(e)=> savePet(e)}
                                >Save</button>
                                </div>
                            </div>

                        </div>
                        
                        

                    </div>
                </div>
                
            </section>
        </div>

    )
}
