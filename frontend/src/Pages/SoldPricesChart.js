import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const SoldPricesChart = () => {
    const [soldPricesData, setSoldPricesData] = useState([]);
    const chartRef = React.useRef(null); // Reference to the Chart instance

    useEffect(() => {
        const fetchSoldPrices = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/properties');
                setSoldPricesData(response.data);
            } catch (error) {
                console.error('Failed to fetch sold prices:', error);
            }
        };

        fetchSoldPrices();
    }, []);

    useEffect(() => {
        if (soldPricesData.length > 0) {
            renderChart();
        }
    }, [soldPricesData]);

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
            type: 'line',
            data: {
                labels: propertyIndices,
                datasets: [{
                    label: 'Sold Prices',
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
            <canvas id="soldPricesChart2" width="800" height="400"></canvas>
        </div>
    );
};

export default SoldPricesChart;
