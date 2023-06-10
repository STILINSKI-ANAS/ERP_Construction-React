import { ResponsiveLine } from "@nivo/line";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [payement, setPayement] = useState([]);
  const [total, setTotal] = useState(0);
  const API_URL = "https://api.tourtit-travaux.com/api";

  useEffect(() => {
    fetchData();
  }, []);

  const maxValue = Math.max(...data.map((point) => point.y));

  // Add 10,000 to the maximum value for yScale max
  const yScaleMax = maxValue + 200000;

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL + "/charts/9"); // Replace '/api/prix-total-by-day' with your Laravel endpoint URL
      const response2 = await axios.get(API_URL + "/charts/10"); // Replace '/api/prix-total-by-day' with your Laravel endpoint URL
      const parsedData = response.data.map(item => ({
        // x: new Date(item.month),
        x: item.month,
        // y: item.total,
        y: parseFloat(item.total),
      }));
      setTotal(response2.data)
      setData(parsedData);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };



  const currentYear = new Date().getFullYear();
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box p="20px" backgroundColor={colors.primary[450]} sx={{ boxShadow: 3 }}>
      <Box display="flex " justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
        Chiffre d'affaire de l'année {currentYear}
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          color={colors.secondary[100]}
        >
          MAD {total}
        </Typography>
      </Box>
    <Box height="302px" m="-20px 0 0 0">
    {/* <ResponsiveLine
        data={[{ id: 'prix_total', data: data }]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
        xFormat="time:%Y-%m-%d"
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{ format: '%b %d', tickRotation: -45 }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    /> */}
    <ResponsiveLine
        data={[{ id: "total", data: data }]}
        margin={{ top: 20, right: 30, bottom: 50, left: 80 }}
        padding={0.3}
        xScale={{ type: 'point'}}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: yScaleMax,
          stacked: true,
          reverse: false
      }}
      yFormat={(value) => `${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        format: (value) => `${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
      }}
      axisBottom={{tickRotation: -25 }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      // legends={[
      //     {
      //         anchor: 'bottom-right',
      //         direction: 'column',
      //         justify: false,
      //         translateX: 100,
      //         translateY: 0,
      //         itemsSpacing: 0,
      //         itemDirection: 'left-to-right',
      //         itemWidth: 80,
      //         itemHeight: 20,
      //         itemOpacity: 0.75,
      //         symbolSize: 12,
      //         symbolShape: 'circle',
      //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
      //         effects: [
      //             {
      //                 on: 'hover',
      //                 style: {
      //                     itemBackground: 'rgba(0, 0, 0, .03)',
      //                     itemOpacity: 1
      //                 }
      //             }
      //         ]
      //     }
      // ]}
      tooltip={({ point }) => (
        <div
          style={{
            padding: 12,
            color: colors.secondary[250],
            background: "#222222",
          }}
        >
          <strong>{point.data.xFormatted}</strong>
          <br/>
          <strong>MAD {point.data.yFormatted}</strong>
        </div>
      )}
      theme={{
        axis: {
          ticks: {
            text: {
              fontSize: 12,
              fill: colors.secondary[100]
            },
          },
        },
      }}
      colors={colors.secondary[100]}
      />
    </Box>
    </Box>
  );
};

export default LineChart;
