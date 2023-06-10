import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'd3-format';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";

const BarChartCharge = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const API_URL = "https://api.tourtit-travaux.com/api";

  const fetchData = async () => {
    try {
      const response = await axios.get(
        API_URL + "/charts/4"
      );
      const response2 = await axios.get(
        API_URL + "/charts/6"
      );
       // Replace '/api/sum-by-day' with your Laravel endpoint URL
      setData(response.data);
      setTotal(response2.data);
    } catch (error) {
      console.error(error);
    }
  };

  const valueFormatter = format(',.2f');

  useEffect(() => {
    fetchData();
    // console.log(data);
  }, []);

  return (
    <Box backgroundColor={colors.primary[450]} p="20px" sx={{ boxShadow: 3 }}>
      <Box display="flex " justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
          Depense (30 Jour)
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          color={colors.secondary[1100]}
        >
          MAD {total}
        </Typography>
      </Box>

      <Box height="350px" m="-20px 0 0 0">
        <ResponsiveBar
          data={data}
          keys={["total"]}
          indexBy="day"
          margin={{ top: 30, right: 10, bottom: 100, left: 85 }}
          padding={0.3}
          axisBottom={{
            tickRotation: -45,
            legend: "Date",
            legendPosition: "middle",
            legendOffset: 70,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legend: "Depense",
            legendPosition: "middle",
            legendOffset: -80,
            format: (value) => `${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
          }}
          label={(d) => `MAD ${d.value}`}
          enableLabel={false}
          labelSkipWidth={10}
          labelSkipHeight={10}
          tooltip={({ value, color }) => (
            <div
              style={{
                padding: 12,
                color,
                background: "#222222",
              }}
            >
              <strong>MAD {valueFormatter(value)}</strong>
            </div>
          )}
          theme={{
            // colors: "#000000",
            axis: {
              ticks: {
                text: {
                  fontSize: 12,
                  fill: colors.secondary[100]
                },
              },
              legend:{
                text:{
                  fontSize: 12,
                  fill: colors.secondary[100]
                }
              }
            },
          }}
          colors={colors.secondary[1100]}
        />
      </Box>
    </Box>
  );
};

export default BarChartCharge;
