import React, { useState, useEffect } from 'react'
import './Navbar.css'
import {ChevronUp, ChevronDown} from 'react-feather';

const Navbar = ({sortingOption, onSortingChange,groupingOption,onGroupingChange}) => {
    const[dropdownOpen,setDropdownOpen]=useState(false);
    const toggleDropdown=()=>{
        setDropdownOpen(!dropdownOpen);
    };
  return (
    <div className='navbar'>
        <div className='dd-button'>
            <div className='drop-down' onClick={toggleDropdown}>
                <img src='https://cdn-icons-png.flaticon.com/128/8017/8017760.png' className='icon' alt='Menu'></img>
                <p className='bold'>Display</p>
                {dropdownOpen ? <ChevronUp className="icon" /> :<ChevronDown className="icon"/>}
            </div>
            {dropdownOpen && (
                <div className='dropdown-options'>
                    <Dropdownoption label="Grouping" value={groupingOption} onchange={onGroupingChange}>
                        <option value='status'>Status</option>
                        <option value='user'> User</option>
                        <option value='priority'> Priority </option>
                    </Dropdownoption>
                    <Dropdownoption label='Ordering' value={sortingOption} onchange={onSortingChange}>
                        <option value="priority"> Priority</option>
                        <option value='title'>Title</option>
                    </Dropdownoption>
                </div>
            )}

        </div>
    </div>
  );
};

const Dropdownoption=({label,value,onchange,children})=>{
    return (
        <div className='dd-option'>
            <label>{label}</label>
            <select value={value} onchange={onchange} > {children} </select>
        </div>
    );
};

export default Navbar;