'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const BarChart = () => {
  const initialData = [
    { x: 'Jan', y: 50 },
    { x: 'Feb', y: 60 },
    { x: 'Mar', y: 80 },
    { x: 'Apr', y: 90 },
    { x: 'May', y: 110 },
    { x: 'Jun', y: 305 },
    { x: 'Jul', y: 100 },
    { x: 'Aug', y: 125 },
    { x: 'Sep', y: 140 },
    { x: 'Oct', y: 40 },
    { x: 'Nov', y: 60 },
    { x: 'Dec', y: 90 }
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleBarClick = (event, chartContext, { dataPointIndex }) => {
    setSelectedIndex(dataPointIndex);
  };

  const series = [{
    name: 'Money Earned',
    data: initialData.map((item, index) => ({
      ...item,
      color: index === selectedIndex ? '#ffc53f' : '#0649cc'
    }))
  }];

  const options = {
    chart: {
      type: 'bar',
      events: {
        click: handleBarClick
      },
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 3,
        borderRadiusApplication: 'end',
        columnWidth: '70%',
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: initialData.map(item => item.x),
      labels: {
        show: true,
        rotate: 0
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    grid: {
      show: false
    },
    legend: {
      show: false
    },
    colors: series[0].data.map(item => item.color),
    states: {
      normal: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none'
        }
      },
    },
    tooltip: {
      enabled: true,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const value = w.globals.series[seriesIndex][dataPointIndex];
        return `
          <div style="
            background-color: #f0f0f0; /* Background color */
            color: #230; /* Text color */
            text-align: center;
            font-size: 14px;
            padding: 8px;
            border-radius: 5px;
          ">
            <span style="font-weight: bold;">$${value}</span>
          </div>
        `;
      }
    }
  };

  return (
    <div className='w-full'>
      <Chart options={options} series={series} type="bar" height={350} width="100%" className='w-full' />
    </div>
  );
}

export default BarChart;
