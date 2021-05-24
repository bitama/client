import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, navigate } from "@reach/router"

const Edit = (props) => {
    const [manager, setManager] = useState([])
    // const [load, setLoad] = useState(false)
    // const [deleted, setDeleted] = useState(false)
    const [form, setForm] = useState({
        title: "",
        price: "",
        description: ""
    })
    useEffect(() => {
        axios.get(`http://localhost:8000/api/managers/${props.id}/find`)
        .then(res => {
            setForm(res.data.manager)
            
        })
    
        .catch(err =>console.log(err))
    },[props.id])
    
    const onSubmitHandler = (event) => {
        event.preventDefault()

        axios.put(`http://localhost:8000/api/managers/${props.id}/update`,form)
        .then(res => {
            console.log(res)
            
        })
            navigate("/")
        .catch(err => console.log(err))
    }
    const onChangeHandler = (event) => {
        setForm({
        ...form,
        [event.target.name]:event.target.value
        })
    }
    
    return (
    <div className="App container">
        <h1>Edit a Product</h1>
        <form onSubmit={onSubmitHandler}>
            <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control"name="title" value={form.title} onChange={onChangeHandler} />
            </div>
            <div className="form-group">
            <label htmlFor="number">Price</label>
            <input type="number" className="form-control"name="price" value={form.price} onChange={onChangeHandler} />
            </div>
            <div className="form-group">
            <label htmlFor="description">Description</label>
                    <textarea type="text" className="form-control" name="description" value={form.description} onChange={onChangeHandler}></textarea>
            </div>
            < input type="submit" className="btn btn-outline-danger mt-4"/>
        </form><hr></hr>
        </div>
    );    
}
export default Edit;