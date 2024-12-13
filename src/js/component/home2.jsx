import React, { useState} from "react";
import {motion} from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import './home2.css'


const HomeTwo = () => {
    const [list, setList] = useState([]);
    const [change, setChange] = useState('');
  
    const handleChange = (e) => {
        setChange(e.target.value);
    }
    
    const itemAdd = () => {
        if( change.trim() !== ''){
        setList([...list, change]);
        setChange('');
        }
    }

    const itemDelete = (wish) => {
        const newList = list.filter( (_,index) => {
            return index !== wish;
        });
        setList(newList); 
    }
   
  return(<>
      <div className='list-container'>
        <h1 className="list-titleOne">¡Wishes list</h1>
        <h2 className="list-titleTwo">for the 2024!</h2>
        <div>
            <input type="text"
                value={change}
                onChange={handleChange} 
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
                {list.map( (item, index) => {
                    return(<>
                    <li className="list-item" key={index}>
                        {item} <b></b> <b></b>  <button className="list-button__delete" onClick={() => itemDelete(index)}><FontAwesomeIcon icon={faXmark} /> </button>
                    </li>
                    </>)
                })}
            </ul>
            <h6 className="list-footer">wishes {list.length}</h6>
        </div>
      </div>
  </>);  
}

export default HomeTwo;