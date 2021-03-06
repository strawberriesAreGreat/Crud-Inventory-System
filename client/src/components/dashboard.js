import React from 'react'
import './dashboard.css'
import { useState } from "react";

import InventoryList from './InventoryList';


class dashboard extends React.Component{
    
    state =  {
        email:[],
        password:[]
    }


    handleChange = (event) => {
        console.log(event.target.value);
        if(event.target.className == "formEmail"){
            this.state.email =  event.target.value;
        }
        if(event.target.className == "formPassword"){
            this.state.password = event.target.value;
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        alert(`The email you entered was: ${this.state.email} \n The pswd you entered was: ${this.state.password} `)
    }

    render(){
        return(
            <div>
                <InventoryList  />
            </div>
        );
}
}

export default dashboard