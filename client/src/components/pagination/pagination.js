import { Button } from '@mui/material';
import React from 'react';
import '../featured/featured.css'
import './pagination.css'

 const Pagination = ({postsPerPage,totalPosts,paginate})=> {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {

        pageNumbers.push(i);
        console.log(pageNumbers,totalPosts,postsPerPage, "hereit is ")
    }
    // console.log(pageNumbers);
    return (
        <nav>
            <ul className="pagination modal-3">
            <li key={1}  className="page-item active"><a  onClick = {() => paginate(1)}  ClassName="prev"> &laquo; </a></li>
                {pageNumbers.map(number => (
                    
                    <li key={number}  className="page-item active">
                        <a onClick = {() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                   
                    ))

                }
            <li key={pageNumbers[-1]}  className="page-item active"><a onClick = {() => paginate(pageNumbers[-1])} ClassName="next">&raquo;</a></li>
            </ul>
        </nav>
    )
    }

    export default  Pagination
