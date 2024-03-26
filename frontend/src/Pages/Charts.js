import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import SoldPricesChart from './SoldPricesChart'
import SoldPricesCA from './SoldPricesCA'
import SoldPricesNY from './SoldPricesNY'

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
            <Link className='link' to="/budget">
                <label for="sold">Budget <br/> Calculations</label>
                </Link>
            </div>
        </div>
        <div className='right-panel'>
            <div>
                <div>
                    <p></p>
                </div>
            </div>
            <SoldPricesChart />
            <div style={{display: 'flex', width:'90%'}}>
            <SoldPricesCA />
            <SoldPricesNY />
            </div>
        </div>
        </div>
    </div>
  )
}

export default Charts