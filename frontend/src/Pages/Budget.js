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
        <div className='bget-section'>
          <h1 className='bget-h1'>Budget Calculator</h1>
          <form className='bget-form' onSubmit={handleSubmit}>
            <label>
              Enter your monthly income:
              <input
                className='bget-input'
                type="number"
                value={income}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Min Price:
              <input
                className='bget-input'
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </label>
            <label>
              Max Price:
              <input
                className='bget-input'
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </label>
            <button className='calc-btn' type="submit">Calculate</button>
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
              <div className='copy-container'>

                <div className='copy-left'>
                  <p className='cl-h1'>Understanding Your Budget with the 60/20/20 Rule</p>
                </div>

                <div className='copy-right'>
                  <p className='cl-h2'>The 60/20/20 rule is a financial guideline aimed at helping individuals manage their income effectively. It suggests dividing your income into three main categories: 60% for essential expenses, 20% for financial goals, and 20% for personal spending.</p>
                </div>


              </div>
                <div style={{width: '96%',margin: 'auto', marginBottom: 150}}>
                  <img style={{height: 450, width: '96%', objectFit: 'cover',  boxShadow: '0px 4px 18px 0px rgba(0, 0, 0, 0.17)'}} src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </div>


            <div className='min-section'>

              <div className='min-section-row'>
                <div className='min-section-left'>
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGZpbmFuY2V8ZW58MHx8MHx8fDA%3D" />
                </div>

                <div className='min-section-right'>
                  <div>
                    <p>Essential Expenses (60%):</p>
                    <p>This category includes necessities like housing, utilities, groceries, transportation, and healthcare. Allocating 60% of your income ensures that your basic needs are covered comfortably. It's crucial to prioritize these expenses to maintain stability and security.</p>
                  </div>

                  <div>
                    <p>Financial Goals (20%):</p>
                    <p>The next 20% of your income should be directed towards financial goals such as savings, investments, debt repayment, and retirement contributions. Building a robust financial foundation requires consistent saving and smart investment decisions. This portion of your income enables you to plan for the future and achieve long-term financial security.</p>
                  </div>

                  <div>
                    <p>Personal Spending (20%):</p>
                    <p>The remaining 20% is reserved for personal spending, which encompasses discretionary expenses like dining out, entertainment, hobbies, and travel. While it's essential to enjoy life and indulge in leisure activities, it's equally vital to strike a balance between enjoyment and financial responsibility.</p>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  </div>
  )
}

export default Budget