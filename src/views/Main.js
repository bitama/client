import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link} from "@reach/router"

const Main = (props) => {
    const [manager, setManager] = useState([])
    const [load, setLoad] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [form, setForm] = useState({
        title: "",
        price: "",
        description: ""
    })
    useEffect(() => {
        axios.get("http://localhost:8000/api/managers")
        .then(res => {
            setManager(res.data.managers)
            setLoad(true)
        })
    
        .catch(err =>console.log(err))
    },[deleted,load])
    
    const onSubmitHandler = (event) => {
        event.preventDefault()

        axios.post("http://localhost:8000/api/managers/create",form)
        .then(res => {
            console.log(res)
            setLoad(false)
        })
        .catch(err => console.log(err))
    }
    const onChangeHandler = (event) => {
        setForm({
        ...form,
        [event.target.name]:event.target.value
        })
    }
    const onDeleteHandler = (event, managerId) => {
        axios.delete(`http://localhost:8000/api/managers/${managerId}/delete`)
            .then(res => {
                console.log(res)
                setDeleted(!deleted)
            })
            .catch(err => console.log(err))
    }
    console.log(form)
    return (
        <div className="App container ">
            
            <h1>Create a Product</h1>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control"name="title" onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                <label htmlFor="number">Price</label>
                <input type="number" className="form-control"name="price"onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea type="text" className="form-control"name="description"onChange={onChangeHandler}></textarea>
                </div>
                < input type="submit" className="btn btn-outline-danger mt-4"/>
            </form><hr></hr>
            
                <div className="container">
                    
                        <table  className="table table-stripped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>price</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                                
                            {
                            manager.map((item, i) => {
                                return<tr key={i} className>
                                <td><Link to={`/product/${item._id}`}>{item.title}</Link></td>
                                <td><Link to={`/product/${item._id}`}>${item.price}</Link></td>
                                <td><Link to={`/product/${item._id}`}>{item.description}</Link></td>
                                <Link to="" onClick={(event)=>onDeleteHandler(event, item._id)}>delete</Link>
                                <Link to={`/product/${item._id}/edit`}>/edit</Link>
                                </tr>
                            })
                            
                            }
                    </table>
                </div>
    </div>
                
        
                
                    
        
    
    );    
}
export default Main;