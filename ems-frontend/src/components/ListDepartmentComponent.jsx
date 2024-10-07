import React, { useEffect, useState } from 'react'
import { deleteDepartment, listDepartments } from '../services/DepartmentService';
import { useNavigate } from 'react-router-dom';

function ListDepartmentComponent() {

    const[departments, setDepartments] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        listAllDepartments();
    }, [])

    function listAllDepartments(){
        listDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => console.error(error));
    }

    function addNewDepartment() {
        navigator('/add-department');
    }

    function editDepartment(id) {
        navigator(`/edit-department/${id}`);
    }

    function removeDepartment(departmentId){
        deleteDepartment(departmentId).then((response) => {
            console.log(response);
            listAllDepartments();
        }).catch(e => console.error(e));
    }

  return (
    <div className='container'>
        <h2 className='text-center'>List of Departments</h2>
        <button className='btn btn-primary mb-2'onClick={addNewDepartment}>Add Department</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Department Id</th>
                    <th>Department Name</th>
                    <th>DepartMent Description</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                { 
                    departments.map((department) => 
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.departmentName}</td>
                            <td>{department.departmentDescription}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => editDepartment(department.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeDepartment(department.id)} style={{marginLeft:'10px'}}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListDepartmentComponent