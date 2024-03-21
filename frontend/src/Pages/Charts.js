import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import SoldPricesChart from './SoldPricesChart'


function Charts() {
  return (
    <div>
        <div className='main-panel-container'>
        <div className="left-panel">
            <h2>Filters</h2>
            <div className="filter">
               
                <label for="sale">Sale</label>
            </div>
            <div className="filter">
              
                <label for="pending">Pending</label>
            </div>
            <div className="filter">
                <label for="sold">Sold</label>
            </div>
            <div className="filter">
               <Link className='link' to="/Charts">
                    <label for="sold">Charts</label>
               </Link>
              
            </div>

            <div className="filter">
                <label for="sold">Agent</label>
            </div>
        </div>
        <div className='right-panel'>
            <SoldPricesChart />
        </div>
        </div>
    </div>
  )
}

export default Charts