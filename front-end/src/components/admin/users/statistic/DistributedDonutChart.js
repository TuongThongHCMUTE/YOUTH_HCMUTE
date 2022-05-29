import React from 'react';
import ApexChart from 'react-apexcharts';

const DistributedDonutChart = () => {
    const series = [44, 55, 41, 17, 15, 55, 41, 17, 15, 55, 41, 17, 15];

    const options = {
        chart: {
            type: 'donut',
        },
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'Mango', 'Orange', 'Watermelon', 'Mango', 'Orange', 'Watermelon', 'Watermelon', 'Mango', 'Orange', 'Watermelon'],
        responsive: [{
            // breakpoint: 480,
            options: {
                chart: {
                    width: 700,
                    showLabels: "0",
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }


    return (
        <div id='chart'>
            <ApexChart options={options} series={series} type="donut" height={400} />
        </div>
    )
}

export default DistributedDonutChart