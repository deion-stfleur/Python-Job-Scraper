import React, {useState} from 'react'
import '../Pages/Home.css'
import { Link } from 'react-router-dom'


function Budget() {
    const [income, setIncome] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [properties, setProperties] = useState([]);

    const handleInputChange = (event) => {
        setIncome(event.target.value);
      };
    
    //   const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setShowResults(true);
    //   };

      const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
      };
    
      const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        fetchProperties();
        setShowResults(true);
      };
    
      const fetchProperties = async () => {
        const response = await fetch(`http://127.0.0.1:5000/api/properties?min_price=${minPrice}&max_price=${maxPrice}`);
        const data = await response.json();
        console.log("Fetched properties data:", data); // Add console.log statement to check data
        setProperties(data.properties);
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
          <label htmlFor="sale">Sale</label>
        </div>
        <div className="filter">
          <label htmlFor="pending">Pending</label>
        </div>
        <div className="filter">
          <label htmlFor="sold">Sold</label>
        </div>
        <div className="filter">
          <Link className='link' to="/Charts">
            <label htmlFor="sold">Charts</label>
          </Link>
        </div>
        <div className="filter">
          <Link className='link' to="/budget">
            <label htmlFor="sold">Budget <br/> Calculations</label>
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
            <label>
              Min Price:
              <input
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </label>
            <label>
              Max Price:
              <input
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceChange}
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

            <h2>Properties:</h2>
           
        </div>
      </div>
    </div>
  </div>
  )
}

export default Budget