import React, { useState } from 'react'
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import "./Search.css"
import MetaData from '../layout/MetaData';
const Search = ({history}) => {
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/products/${keyword}`)
        }
        else{
            history.push("/products")
        }

    }
  return (
    <Fragment>
        <MetaData title={`Search A Product -- ECOMMERCE`}/>
        <form className='searchBox' onSubmit={searchSubmitHandler} >
            <input 
                type="text" 
                placeholder='Search a Product.....' 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <input type="submit" value="Submit"/>
        </form>
    </Fragment>
  )
}

export default Search