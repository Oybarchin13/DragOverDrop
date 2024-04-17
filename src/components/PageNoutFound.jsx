import React from 'react';
import nout404 from '../img/404.png'
import Home from './Home';

function PageNoutFound(props) {
    return (
       
        <div>
            <Home/>
            <div className='NotFound d-flex align-items-center'>
          <div className='NotFound404 d-flex align-items-center justify-content-center'>
            <img src={nout404} alt="" /></div>  
        </div>
        </div>
    );
}

export default PageNoutFound;