import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { appSelectors } from './store'
import { Chart as RGCChart, } from 'react-google-charts';

function Chart() {
  const jobs = useSelector(appSelectors.selectJobs);

  const options = useMemo(
    () => ({
      //seriesType: "line",
      title: "Cumulative job views vs. prediction",
      series: {
        0: {
          type: "line",
          color: "0dd6d6",
        },
        1: {
          type: "line",
          color: "66b319",
        },
        2: {
          type: "bars",
          color: "c2c2c2"
        }
      },
      pointSize: 10,
      animation: {
        duration: 1000,
        easing: "out",
        startup: true
      }
    }),
    []
  );

  const dataProp = useMemo(
    () => {
      const data = jobs.map(job => [
        new Date(job.date),
        job.predictionsQuantity,
        job.viewsQuantity,
        job.jobsQuantity,
        `Date ${new Date(job.date)}
         Job Views: ${job.viewsQuantity}
         Predicted Job Views: ${job.predictionsQuantity}
         Active Jobs: ${job.jobsQuantity}`
      ]);

      return [
        [{
          type: "date",
          label: "Day"
        },
          "Predicted Job Views",
          "Job Views", 
          "Job Quantity",
          {role: 'tooltip'}
        ],
        ...data
      ];
    },
    [jobs]
  );

  if (!jobs.length) {
    return null;
  }

  return (
    <RGCChart
      chartType="ComboChart"
      data={dataProp}
      width="100%"
      height="800px"
      legendToggle
      options={options}
    />
  )
}

export default Chart