import React, { useEffect, useState} from "react";
import {motion} from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import './wihslist.css'


const WishList= () => {
    const [list, setList] = useState([]);
    const [change, setChange] = useState('');

    useEffect( () => {
        getWishList();
    }, []);

    const getWishList = async () => {
        const response = await fetch('https://playground.4geeks.com/todo/users/angel', {method:'GET'});
        console.log(response); 
        const data = await response.json();
        console.log(data);
        setList(data.todos);
    }
        
    const itemAdd = async () => {
        if( change.trim() === '') return;
        try {
            const response = await fetch('https://playground.4geeks.com/todo/todos/angel', 
                {
                  method: 'POST',
                  body: JSON.stringify({'label': change, 'is_done': false}),
                  headers: {'content-type': 'application/json'}  
                })
            const newWish = await response.json();
            console.log('Respuesta de la API:', newWish);
            setList([...list, newWish]);
            setChange('');
              
           } catch (error) {
             console.error('error', error);
           };
    };

    const updateWishStatus = async (id, value) => {
        console.log(id, value);
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`,
             {
                method:'PUT',
                body: JSON.stringify({'is_done': value}),
                headers: {'content-type': 'application/json'} 
            });
            const result = await response.json();
            console.log('deseo conseguido', result)
            getWishList();
        } catch (error) {
            console.error('error', error);
        }
    }

    const itemDelete = async(id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {method:'DELETE'});
            console.log(response);
            const newWishList = list.filter( (item) => {
                return item.id != id; 
            });
            setList(newWishList);
        } catch (error) {
            console.error('error', error);
        };
        
    };
    
   
  return(<>
      <div className='list-container'>
        <h1 className="list-titleOne">¡Wishes list</h1>
        <h2 className="list-titleTwo">for the 2024!</h2>
        <div>
            <input type="text"
                value={change}
                onChange={(e) => setChange(e.target.value) } 
                placeholder="write your wish here"
                />
            <motion.button 
               className="list-button__add"
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               onHoverStart={() => console.log('hover started!')} 
              onClick={itemAdd}> ¡wish add! </motion.button>
        </div> 
        <div className="list-paper">
            <ul className="list-wish">
                {list.map( (item) => {
                    return(
                    <li className="list-item" key={item.id}>
                       <input type="checkbox" checked={item.is_done} onChange={(e) => updateWishStatus(item.id, e.target.checked)} /> {item.label} <b></b> <b></b>  <button className="list-button__delete" onClick={() => itemDelete(item.id)}><FontAwesomeIcon icon={faXmark} /> </button>
                    </li>
                    )
                })}
            </ul>
            <h6 className="list-footer">wishes {list.length}</h6>
        </div>
      </div>
  </>);  
}

export default WishList;