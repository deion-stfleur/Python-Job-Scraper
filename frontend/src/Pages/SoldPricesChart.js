import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { ColorRing } from 'react-loader-spinner'
import "../App.css"


const SoldPricesChart = () => {
    const [soldPricesData, setSoldPricesData] = useState([]);
    const chartRef = React.useRef(null); // Reference to the Chart instance
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSoldPrices = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/properties');
                setSoldPricesData(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Failed to fetch sold prices:', error);
            }
        };

        fetchSoldPrices();
    }, []);

    useEffect(() => {
        if (!loading && soldPricesData.length > 0) {
            renderChart();
        }
    }, [soldPricesData, loading]);

    const renderChart = () => {
        const soldPrices = soldPricesData
            .filter(property => property.sold_price !== null)
            .map(property => property.sold_price);
        const propertyIndices = soldPricesData
            .map((property, index) => index + 1)
            .filter((index, idx) => soldPricesData[idx].sold_price !== null);

        const ctx = document.getElementById('soldPricesChart2').getContext('2d');

        // Check if a Chart instance already exists
        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy the existing Chart instance
        }

        // Create new Chart instance and store it in the reference
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: propertyIndices,
                datasets: [{
                    label: 'Number of Boston Properties Sold at this Price',
                    data: soldPrices,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    };

    return (
        <div>
           {loading ? (

            <>
            <div className='loading-container'>

            <div style={{display: 'block',marginTop: 40, alignItems:'center',textAlign:'center'}}>
                <p>Loading Chart Data...</p>
            <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            </div>
            </div>
            </>
            ) : (
            <canvas id="soldPricesChart2" width="800" height="400"></canvas>
            )}
        </div>
    );
};

export default SoldPricesChart;
