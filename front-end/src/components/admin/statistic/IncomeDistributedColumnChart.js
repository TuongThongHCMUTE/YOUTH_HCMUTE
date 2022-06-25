// Node Modules ============================================================ //
import React from 'react';
import ApexChart from 'react-apexcharts';
// Constants =============================================================== //
import { FACULTY_NAMES } from 'helpers/constants/chart';
// My Components =========================================================== //
import CircularLoading from 'components/common/loading/CircularLoading';

// ======================|| DISTRIBUTED COLUMN CHART ||===================== //
const DistributedColumnChart = ({ data }) => {
    const series = [{
        name: 'Tổng',
        data: data?.map(i => i.total)
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
            categories: data ? data.map(i => FACULTY_NAMES[i.tenDonVi]) : [],
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