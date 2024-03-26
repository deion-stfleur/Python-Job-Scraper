import React, {useState} from 'react'
import '../Pages/Home.css'
import { Link } from 'react-router-dom'


function Budget() {
    const [income, setIncome] = useState('')
    const [showResults, setShowResults] = useState(false)

    const handleInputChange = (event) => {
        setIncome(event.target.value);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        setShowResults(true);
      };
    
      const calculateBudget = () => {
        const necessitiesBudget = income * 0.6;
        const savings = income * 0.2;
        const discretionarySpending = income * 0.2;
    
        return {
          necessitiesBudget,
          savings,
          discretionarySpending,
        };
      };
    
      const { necessitiesBudget, savings, discretionarySpending } = calculateBudget();

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
      <h1>Budget Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your monthly income:
          <input
            type="number"
            value={income}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Calculate</button>
      </form>

      {showResults && (
        <div>
          <h2>Budget Allocation:</h2>
          <p>Necessities Budget: ${necessitiesBudget.toFixed(2)}</p>
          <p>Savings: ${savings.toFixed(2)}</p>
          <p>Discretionary Spending: ${discretionarySpending.toFixed(2)}</p>
        </div>
      )}
    </div>
        </div>

        </div>
    </div>
  )
}

export default Budget