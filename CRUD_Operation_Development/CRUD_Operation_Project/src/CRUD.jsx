import React, { useState, useEffect } from 'react';
import 'react-bootstrap';

const CrudApp = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    // Function Of AddData 
    const addData = () => {
        if (name === "") {
            alert("Please enter a name");
            return;
        } else if (age === "") {
            alert("Please enter an age");
            return;
        }
        const newUsers = [...users, { name, age }];
        setUsers(newUsers);
        localStorage.setItem("users", JSON.stringify(newUsers));
        setName('');
        setAge('');
    };

    // Function Of EditData
    const editData = (index) => {
        const newName = prompt("Edit Name", users[index].name);
        const newAge = prompt("Edit Age", users[index].age);
        if (newName && newAge) {
            const updatedUsers = [...users];
            updatedUsers[index] = { name: newName, age: newAge };
            setUsers(updatedUsers);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
        }
    };

    // Function Of DeleteData
    const deleteData = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">CRUD Operations with LocalStorage</h2>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control mb-2" 
                    placeholder="Enter Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    type="number" 
                    className="form-control mb-2" 
                    placeholder="Enter Age" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={addData}>Add</button>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>
                                <button className="btn btn-success btn-sm" onClick={() => editData(index)}>Edit</button>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteData(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CrudApp;
