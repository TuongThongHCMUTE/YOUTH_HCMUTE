import React from 'react';
import ApexChart from 'react-apexcharts';

const DistributedColumnChart = () => {
    const series = [{
        name: 'sales',
        data: [21, 22, 10, 28, 16, 21, 13, 30, 28, 16, 21, 13, 30]
    }]

    const options = {
        chart: {
            height: 350,
            type: 'bar',
            events: {
                click: function(chart, w, e) {
                    // console.log(chart, w, e)
                }
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: [
                ['Đào tạo', 'chất lượng cao'],
                ['Joe', 'Smith'],
                ['Jake', 'Williams'],
                'Amber',
                ['Peter', 'Brown'],
                ['Mary', 'Evans'],
                ['David', 'Wilson'],
                ['Lily', 'Roberts'], 
                'Amber',
                ['Peter', 'Brown'],
                ['Mary', 'Evans'],
                ['David', 'Wilson'],
                ['Lily', 'Roberts'], 
            ],
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        }
    }


    return (
        <div id='chart'>
            <ApexChart options={options} series={series} type="bar" height={400} />
        </div>
    )
}

export default DistributedColumnChart