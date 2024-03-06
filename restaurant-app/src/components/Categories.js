import React, { useEffect, useState, useRef } from 'react';

import { Link } from 'react-router-dom';
import { getCategoryItems, getMenuItems } from '../services/api';

import demo from "./images/demo.jpg"
import axios from 'axios';
import GlobalApi from './../services/GlobalApi'

const Categories = () => {
    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
              const res = await axios.get('http://127.0.0.1:8000/menus/');
                setCategoryItems(res.data);
                console.log(res.data);
              
              
            } catch (error) {
              console.error('Error fetching menu items:', error);
            }
          };
      
          fetchMenuItems();
        }, []);

  return (
    <section id='categories'>
    <div className="cate-title">Categories</div>
    <div class="grid-container" style={{margin: '0%', width: '100%'}}>
    { categoryItems && 
      categoryItems.map((item) => (
        
        
        <div class="catego"  key={item.id}>
        <Link to={`/catedetail/${item.id}`}>
       <div className="list-justify">
       <span>{item.name}</span>
        <span>&#8594;</span>
        </div>
        </Link>
        </div>
       
        
       ))
    }
    
    </div>
    </section>
  );
};

export default Categories;
