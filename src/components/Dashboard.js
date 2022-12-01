import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2'
import {Chart as ChartJs} from  'chart.js/auto'
import AdminAPI from '../services/AdminAPI'
import { lowerCase } from 'lodash'
import AnimalAPI from '../services/AnimalAPI'

export const Dashboard = () => {

    var l = 0;

    const [openNav, setOpenNav] = useState(false)
    const showSidebar = () => setOpenNav(!openNav)
    
    const [low, setLow] = useState([])
    const [med, setMed] = useState([])
    const [high, setHigh] = useState([]) 

    const testdata = [
        {id:1, program: "Weekend", usergain: 8000, userlost: 823},
        {id:2, program: "Family", usergain: 2000, userlost: 5000},
        {id:3, program: "Short", usergain: 300, userlost: 6000},
    ]

    const [bdata, setBdata] = useState({
        labels: testdata.map((item)=> item.program),
        datasets: [{
            label: "User gained",
            data: testdata.map((item)=> item.usergain), 
            backgroundColor: ["#20c997", "#ffc107", "#0dcaf0"]         
        }]
    })
    

    var program_data = [
        {id:1, program: "Low", number: 5},
        {id:2, program: "Medium", number: 2},
        {id:3, program: "High", number: 2},
    ]

    const [pdata, setPdata] = useState({
        labels: program_data.map((item)=> item.program),
        datasets: [{
            label: "Foster Program",
            data: program_data.map((item)=> item.number),
            backgroundColor: ["green", "yellow", "red"]
        }]
    })

    const getAllAAnimalsByLow = () =>{
        AdminAPI.getAllAAnimalsByLow().then((response) => {
            setLow(response.data)
            console.log(response.data)
            
        }).catch(error => {
            console.log(error)
        })
    }
    const getAllAAnimalsByMedium = () =>{
        AdminAPI.getAllAAnimalsByMedium().then((response) => {
            setMed(response.data)

        }).catch(error => {
            console.log(error)
        })
    }
    const getAllAAnimalsByHigh = () =>{
        AdminAPI.getAllAAnimalsByHigh().then((response) => {
            setHigh(response.data)

        }).catch(error => {
            console.log(error)
        })
    }

    const [animals, setAnimals] = useState([])
    let d = 0
    let c = 0
    const getAllAnimals = () =>{
        AnimalAPI.getAllAnimals().then((response) =>{
            setAnimals(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    
    useEffect(() => {

        getAllAAnimalsByLow();
        getAllAAnimalsByMedium();
        getAllAAnimalsByHigh();
        getAllAnimals();
        
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
                        {/* cards for total animals cats and dogs */}
                        <div className="row row-fix">
                            <div className="col-md-4">
                                <div className="card count-animal1 mb-3 shadow">
                                    <div className="card-header text-white">
                                        <h4>Total Pets</h4>
                                        {
                                            animals.map(ani =>{
                                                if(ani.type === "Bottle Baby Puppies" || ani.type === "Puppies (up to 6 months)" ||
                                                ani.type === "Small Adult (less than 25 lbs)" || ani.type === "Medium Adult (25 - 45 lbs)"
                                                || ani.type === "Large Adult (50 - 110 lbs)" || ani.type === "Pregnant/ Nursing Dog Moms" || ani.type === "Shy/ Fearful Dogs"
                                                || ani.type === "Seniors"
                                                || ani.type === "Medical Cases Dogs"){
                                                    d++
                                                }else{
                                                    c++
                                                }
                                            })
                                        }
                                    </div>
                                    <div className="card-body text-white ">
                                        <div className="incard">
                                            <img style={{width: '35%'}} src="./images/pet.png" alt="animal" />
                                            <p>{animals.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card count-animal2 mb-3 shadow">
                                    <div className="card-header text-white"><h4>Total Dogs</h4></div>
                                    <div className="card-body text-white">
                                        <div className="incard">
                                            <img style={{width: '35%'}} src="./images/animal.png" alt="animal" />
                                            <p>{d}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                            <div className="card count-animal3 mb-3 shadow">
                                <div className="card-header text-white"><h4>Total Cats</h4></div>
                                    <div className="card-body text-white">
                                        <div className="incard">
                                            <img style={{width: '35%'}} src="./images/cat.png" alt="animal" />
                                            <p>{c}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>  

                        {/* appointment menu */}
                        <div className="row pb-4 row-fix">
                            <div className="ribbon">
                                <h2 className="ribbon3">Upcoming Appointments</h2>
                            </div>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item shadow">
                                    <h2 className="accordion-header" id="headingOne">
                                    <button style={{background: '#f8d7da', fontSize: '20px'}} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        High Severity
                                    </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        
                                        <table className="table align-middle table-danger">
                                                <thead className="text-center">
                                                    <tr>
                                                    {/* <th>#</th> */}
                                                    <th>Pet</th>
                                                    {/* <th>Pet Handler</th> */}
                                                    <th>Appointment Info</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-center">
                                                    {
                                                        high.map(
                                                            info =>{
                                                        <tr key={info.formId}>
                                                        {/* <th>{info.formId}</th> */}
                                                        <td>
                                                            <div className="">
                                                                <p className="fw-bold mb-1">{info.petName}</p>
                                                                <p className="text-muted mb-0">{info.animalType}</p>
                                                            </div>
                                                        </td>
                                                        {/* <td>
                                                            <div className="">
                                                                <p className="fw-bold mb-1">{info.firstName} {info.lastName}</p>
                                                                <p className="text-muted mb-0">{info.email}</p>
                                                            </div>
                                                        </td> */}
                                                        <td>{info.appointment_information}</td>
                                                        </tr>
                                                        })
                                                    }
                                                </tbody>
                                        </table>

                                    </div>
                                    </div>
                                </div>
                                <div className="accordion-item shadow">
                                    <h2 className="accordion-header" id="headingTwo">
                                    <button style={{background: '#fff3cd', fontSize: '20px'}} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Medium Severity
                                    </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                    
                                        <table className="table align-middle table-warning">
                                            <thead className="text-center">
                                                <tr>
                                                {/* <th>#</th> */}
                                                <th>Pet</th>
                                                {/* <th>Pet Handler</th> */}
                                                <th>Appointment Info</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-center">
                                                {
                                                    med.map(
                                                        info =>
                                                        
                                                        <tr key={info.formId}>
                                                        {/* <th>{info.formId}</th> */}
                                                        <td>
                                                            <div className="">
                                                                <p className="fw-bold mb-1">{info.petName}</p>
                                                                <p className="text-muted mb-0">{info.animalType}</p>
                                                            </div>
                                                        </td>
                                                        {/* <td>
                                                        <div className="">
                                                            <p className="fw-bold mb-1">{info.firstName} {info.lastName}</p>
                                                            <p className="text-muted mb-0">{info.email}</p>
                                                        </div>
                                                        </td> */}
                                                        <td>{info.appointment_information}</td>
                                                        </tr>
                                                        )
                                                }
                                            </tbody>
                                        </table>
                                    
                                    </div>
                                    </div>
                                </div>
                                <div className="accordion-item shadow">
                                    <h2 className="accordion-header" id="headingThree">
                                        {
                                            low.map((i, index)=>{
                                                if(i.appointment_scale == "Low"){
                                                    l++;
                                                }
                                            } )
                                        }
                                    <button style={{background: '#badbcc', fontSize: '20px'}} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Low Severity
                                    </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        
                                        <table className="table align-middle table-success">
                                                <thead className="text-center">
                                                    <tr>
                                                    {/* <th>#</th> */}
                                                    <th>Pet</th>
                                                    {/* <th>Pet Handler</th> */}
                                                    <th>Appointment Info</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-center">
                                                    {
                                                        low.map(
                                                            info =>
                                                        <tr key={info.formId}>
                                                        {/* <th>{info.formId}</th> */}
                                                        <td>
                                                            <div className="">
                                                                <p className="fw-bold mb-1">{info.petName}</p>
                                                                <p className="text-muted mb-0">{info.animalType}</p>
                                                            </div>
                                                        </td>
                                                        {/* <td>
                                                            <div className="">
                                                                <p className="fw-bold mb-1">{info.firstName} {info.lastName}</p>
                                                                <p className="text-muted mb-0">{info.email}</p>
                                                            </div>
                                                        </td> */}
                                                        <td>{info.appointment_information}</td>
                                                        </tr>
                                                        )
                                                    }
                                                </tbody>
                                        </table>

                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* cards for assigned animals cats and dogs */}
                        <div className="row pb-4 row-fix d-flex" style={{alignItems: 'flex-end'}}>

                            <div className="col-md-6">
                                <div className="card shadow">
                                    <div className="card-body d-flex"
                                    style={{justifyContent: 'center'}}>
                                        <div className="chart">
                                            <Doughnut data={pdata} />
                                            <h4 className="text-center pt-2">Appointment Chart</h4>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card shadow">
                                    <div className="card-body d-flex"
                                    style={{justifyContent: 'center'}}>
                                        <div className="chart">
                                            <Pie data={bdata} />
                                            <h4 className="text-center pt-2">Foster Program</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div> 


                        {/* <div className="row row-fix">
                            <div className="col">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <div className="chart">
                                            <Bar data={bdata} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>
                
            </section>
        </div>

    )
}
