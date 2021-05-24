import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link,navigate } from '@reach/router'


const Show = (props) => {
    const [product, setProduct] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8000/api/managers/${props.id}/find`)
            .then(res => {
                console.log(res)
                setProduct(res.data.manager)
            
            })
            .catch(err=>console.log(err))
        
    },[])
    const onDeleteHandler = () => {
        axios.delete(`http://localhost:8000/api/managers/${props.id}/delete`)
            .then(res => {
                console.log(res);
                navigate("/")

            })
            .catch(err=>console.log(err))
    }
    return (
        <div>
            <Link to="/">Back to main</Link>
            <h4>{product.title}</h4>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <button onClick={onDeleteHandler}>delete</button>
        </div>)
}
export default Show;