// Node Modules ============================================================ //
import React, { useState, useEffect} from 'react';
import ApexChart from 'react-apexcharts';
// APIs ==================================================================== //
import { countStudentsByFaculty } from 'apis/statistic';
// Constants =============================================================== //
import { FACULTY_NAMES } from 'helpers/constants/chart';
// My Components =========================================================== //
import CircularLoading from 'components/common/loading/CircularLoading';

// ======================|| DISTRIBUTED COLUMN CHART ||===================== //
const DistributedColumnChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        try {
            setLoading(true);

            const res = await countStudentsByFaculty();
            if (res.data.status === 'success') {
                setData(res.data.data);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }, []);

    const series = [{
        name: 'Tổng',
        data: data.map(i => i.count)
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
            categories: data.map(i => FACULTY_NAMES[i.tenDonVi]),
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        }
    }

    if (loading) {
        return <CircularLoading />
    };

    return (
        <div id='chart'>
            <ApexChart options={options} series={series} type="bar" height={400} />
        </div>
    )
}

export default DistributedColumnChart