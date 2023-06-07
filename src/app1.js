import React, { useState,useRef,useEffect } from 'react';
import { Typography, Button, Grid, Paper,LinearProgress } from '@mui/material';
import { color } from '@mui/material/colors';
import {
  Container,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  IconButton,
} from '@mui/material';
import Chart from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EventIcon from '@mui/icons-material/Event';
import Menu from '@mui/material/Menu';
import Popover from '@mui/material/Popover';


const InsightsDashboard = () => {
  const chartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && barChartRef.current) {
      const chartData = {
        labels: ['New York', 'Los Angeles', 'Chicago'],
        datasets: [
          {
            label: 'Total Spend',
            data: [50000, 45000, 30000],
            backgroundColor: ['#5745f7', '#7869ff', '#9684fd'],
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 10000,
            },
          },
        },
      };

      new Chart(chartRef.current, {
        type: 'doughnut',
        data: chartData,
        options: chartOptions,
      });

      new Chart(barChartRef.current, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
    }
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCalendarButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFieldSelect = (field) => {
    // Handle the selected field
    console.log(field);
    setAnchorEl(null);
  };
  

  return (
    <div>
      
        <div className="left-section">  
        <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '2rem' }}>
          <div>
         <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Welcome</Typography>
         <Typography variant="h6" sx={{ marginBottom: '1rem',color:'#525252' }}>Here's an overview of your Business Insights and Performance Dashboard</Typography> 
         </div> 
         <div>
          <Button variant="contained"  sx={{ color: 'white', backgroundColor: '#5745f7','&:hover': {
                  
                    backgroundColor: '#7869ff',
                    
                  },
                  marginTop: '-3.8rem' 
                }}
                onClick={handleCalendarButtonClick}>Calendar</Button>
                
                 <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              getContentAnchorEl={null}
              sx={{ height:'300px',minWidth: '200px', width: '300px' }}
            >
              <MenuItem onClick={() => handleFieldSelect('Field 1')}> 30 days</MenuItem>
              <MenuItem onClick={() => handleFieldSelect('Field 2')}>15 days</MenuItem>
              <MenuItem onClick={() => handleFieldSelect('Field 3')}>7 days</MenuItem>
              <MenuItem onClick={() => handleFieldSelect('Field 4')}>Custom</MenuItem>
              
            </Menu>
                
                </div>
        </Grid>
         </div>
      

      <main>
        <section id="booking-overview">
          <div style={{ marginBottom: '6rem' }}>
          
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Paper sx={{ padding: '1.7rem' }}>
                <Typography variant="h5">Total spend on Hotels</Typography>
                <Typography variant="body1">Rs.10,442.0</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper sx={{ padding: '1.7rem' }}>
                <Typography variant="h5">Average Booking Window</Typography>
                <Typography variant="body1">$150</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper sx={{ padding: '1.7rem' }}>
                <Typography variant="h5">Average Daily Rate</Typography>
                <Typography variant="body1">4 nights</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper sx={{ padding: '1.7rem' }}>
                <Typography variant="h5">Average Length of Stay</Typography>
                <Typography variant="body1">7 days</Typography>
              </Paper>
            </Grid>
            {/* Add more metrics as needed */}
          </Grid>
     
          <Grid container spacing={2} style={{ padding: '1rem' }}>
  <Grid item xs={12}>
    <Paper style={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6">Total Spend</Typography>
        <canvas ref={barChartRef} width="400" height="110" style={{ maxWidth: '100%' }} />
      </CardContent>
    </Paper>
  </Grid>
  <Grid item xs={12} sm={6} md={3.5}>
  <Paper style={{ height: '100%', maxHeight: '330px' }}>
    <CardContent>
      <Typography variant="h6">Spend by Hotel Category</Typography>
      <canvas ref={chartRef} width="200" height="200" style={{ maxWidth: '100%' }} />
      <Box sx={{ marginTop: '1rem' }}>
        <Typography variant="body1">Budget: 80.00%</Typography>
        <LinearProgress variant="determinate" value={80} 
         sx={{
          height: '26px', // Adjust the height of the progress bar
          borderRadius: '12px', // Adjust the border radius of the progress bar
          backgroundColor: '#e0e0e0', // Change the background color of the progress bar
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#5745f7', // Change the color of the progress bar
          },
        }}
        />
      </Box>
    </CardContent>
  </Paper>
</Grid>

  <Grid item xs={12} sm={6} md={4}>
    <Paper style={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6">Spend by Cities</Typography>
        <canvas ref={chartRef} width="200" height="200" style={{ maxWidth: '100%' }} />
      </CardContent>
    </Paper>
  </Grid>
  
</Grid>

       


           

        </section>
      </main>

      <footer>{/* Add your footer content here */}</footer>
    </div>
  );
};

export default InsightsDashboard;