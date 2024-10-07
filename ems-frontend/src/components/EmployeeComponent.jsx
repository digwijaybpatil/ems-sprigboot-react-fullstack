import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, listEmployees, updateEmployee } from '../services/EmployeeServices'
import { useNavigate, useParams } from 'react-router-dom'
import { listDepartments } from '../services/DepartmentService'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        listDepartments().then((r) => {
            setDepartments(r.data)
        }).catch(e => console.error(e))
    }, [])

    const [errors, setErrors] = useState({
        firstName : '',
        lastName : '',
        email : '',
        departmentId : ''
    })

    const navigator = useNavigate();

    const {id} = useParams();

    useEffect(() => {

        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmentId(response.data.departmentId)
            }).catch((error) => {
                console.error(error);
            })
        }

    }, [id])

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){
            const employee = {firstName, lastName, email, departmentId}

            console.log(employee);

            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.log);
                    navigator('/employees');
                }).catch(error => console.error(error));

            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(e => console.error(e));
            }

            
        }
    }

    function validateForm(){
        let valid = true;

        const errorCopy = {... errors}

        if(firstName.trim()){
            errorCopy.firstName = '';
        } else {
            errorCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorCopy.lastName = '';
        } else {
            errorCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(email.trim()){
            errorCopy.email = '';
        } else {
            errorCopy.email = 'Email is required';
            valid = false;
        }

        if(departmentId.trim()){
            errorCopy.departmentId = '';
        } else {
            errorCopy.departmentId = 'Department is required';
            valid = false;
        }

        setErrors(errorCopy);

        return valid;
    }

    function getTitle(){

        if(id){
           return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }

    }

  return (
    <div className='container'>
        <br/><br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    getTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                onChange={handleFirstName}
                            >

                            </input>
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                onChange={handleLastName}
                            >

                            </input>
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                                type='test'
                                placeholder='Enter Employee email'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                onChange={handleEmail}
                            >

                            </input>
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Id:</label>
                            <select
                                className={`form-control ${errors.departmentId ? 'is-invalid' : ''}`}
                                value={departmentId}
                                onChange={(e) => setDepartmentId(e.target.value)}
                            >
                                <option value="Select Department">Select Department</option>
                                {
                                    departments.map((department) => {
                                       return <option value={department.id} key={department.id}>{department.departmentName}</option>
                                    })
                                }

                            </select>
                            {errors.departmentId && <div className='invalid-feedback'>{errors.departmentId}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent