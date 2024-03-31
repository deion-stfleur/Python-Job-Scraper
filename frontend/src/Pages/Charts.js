import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import SoldPricesChart from './SoldPricesChart'
import SoldPricesCA from './SoldPricesCA'
import SoldPricesNY from './SoldPricesNY'
import { IoStatsChartSharp } from "react-icons/io5";
import { ImCalculator } from "react-icons/im";
import { IoIosPricetag } from "react-icons/io";

function Charts() {
  return (
    <div className='full-height'>
        <div className='main-panel-container'>
        <div className="left-panel">
            <h2>Filters</h2>
            <div className="filter">
               
                <label for="sale">Sale <IoIosPricetag /></label>
            </div>
            <div className="filter">
              
                <label for="pending">Pending</label>
            </div>
            <div className="filter">
                <label for="sold">Sold</label>
            </div>
            <div className="filter">
               <Link className='link' to="/Charts">
                    <label for="sold">Charts <IoStatsChartSharp />
</label>
               </Link>
              
            </div>

            <div className="filter">
            <Link className='link' to="/budget">
                <label for="sold">Budget <br/> Calculations <ImCalculator /></label>
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
            <SoldPricesCA />
            <div style={{display: 'flex', width:'90%'}}>
            {/* <SoldPricesNY /> */}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Charts