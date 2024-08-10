import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Crud.css';

const Crud = () => {
    const [standards, setStandards] = useState([]);
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [numberOfTeachers, setNumberOfTeachers] = useState('');
    const [monitorName, setMonitorName] = useState('');
    const [numberOfStudents, setNumberOfStudents] = useState('');

    useEffect(() => {
        fetchStandards();
    }, []);

    const fetchStandards = () => {
        axios.get('http://localhost:8080/standards')
            .then(response => {
                setStandards(response.data);
            })
            .catch(error => {
                console.error('Error fetching standards:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const standard = { id: editId, name, numberOfTeachers, monitorName, numberOfStudents };

        if (editId) {
            axios.put(`http://localhost:8080/standards/${editId}`, standard)
                .then(() => {
                    fetchStandards();
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error updating the standard!', error);
                });

        } else {
            axios.post('http://localhost:8080/standards', standard)
                .then(() => {
                    fetchStandards();
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error creating the standard!', error);
                });
        }
    };

    const handleEdit = (standard) => {
        setEditId(standard.id);
        setName(standard.name);
        setNumberOfTeachers(standard.numberOfTeachers);
        setMonitorName(standard.monitorName);
        setNumberOfStudents(standard.numberOfStudents);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/standards/${id}`)
            .then(() => {
                fetchStandards();
            })
            .catch(error => {
                console.error('There was an error deleting the standard!', error);
            });
    };

    const resetForm = () => {
        setEditId(null);
        setName('');
        setNumberOfTeachers('');
        setMonitorName('');
        setNumberOfStudents('');
    };

    return (
        <div className="container">
            <h1>CRUD Operations</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Standard Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Number of Teachers"
                    value={numberOfTeachers}
                    onChange={(e) => setNumberOfTeachers(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Monitor Name"
                    value={monitorName}
                    onChange={(e) => setMonitorName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Number of Students"
                    value={numberOfStudents}
                    onChange={(e) => setNumberOfStudents(e.target.value)}
                    required
                />
                <button type="submit">{editId ? 'Update Standard' : 'Create Standard'}</button>
                <button type="button" onClick={resetForm}>Reset</button>
            </form>

            <table>
                <tr>
                    <th>Name</th>
                    <th>Monitor Name</th>
                    <th>Number of Students </th>
                    <th>Number of teachers</th>
                    <th>Actions</th>
                </tr>
                {standards.map((standard) => (
                    <tr key={standard.id}>

                        <td>{standard.name}</td>
                        <td>{standard?.monitorName}</td>
                        <td>{standard.numberOfStudents}</td>
                        <td>{standard.numberOfTeachers}</td>
                        <div>
                            <button onClick={() => handleEdit(standard)}>Edit</button>
                            <button onClick={() => handleDelete(standard.id)}>Delete</button>
                        </div>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default Crud;
