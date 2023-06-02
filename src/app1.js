import './index.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
 

const StyledDataGrid = styled(DataGrid)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1); /* Add box shadow effect */
  margin-bottom: 15px; /* Increase spacing between the table and other elements */
  border: 1px solid rgba(224, 224, 224, 1); /* Add border to the table */
  border-radius: 4px; /* Add border radius to the table */
`;

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    state: '',
    entityName: '',
    gstin: '',
    pincode: '',
    address1: '',
    address2: '',
  });
  const [rows, setRows] = useState([
    {
      id: 1,
      'Entity Name': 'Company A',
      State: 'State A',
      GSTIN: 'GSTIN A',
      'Address 1': 'Address 1 A',
    'Address 2': 'Address 2 A',
      Pincode: 'Pincode A',

    },
    {
      id: 2,
      'Entity Name': 'Company B',
      State: 'State B',
      GSTIN: 'GSTIN B',
      'Address 1': 'Address 1 B',
    'Address 2': 'Address 2 B',
      Pincode: 'Pincode B',
    },
    {
      id: 3,
      'Entity Name': 'Company C',
      State: 'State C',
      GSTIN: 'GSTIN C',
      'Address 1': 'Address 1 C',
    'Address 2': 'Address 2 C',
      Pincode: 'Pincode C',
    },
  ]);

  const [isFieldsEmpty, setIsFieldsEmpty] = useState(false);

  const columns = [
    { field: 'Entity Name', headerName: 'Entity Name', width: 100 },
    { field: 'State', headerName: 'State', width: 100 },
    { field: 'GSTIN', headerName: 'GSTIN', width: 100 },
    { field: 'Address 1', headerName: 'Address 1', width: 100 },
    { field: 'Address 2', headerName: 'Address 2', width: 100 },
    { field: 'Pincode', headerName: 'Pincode', width: 110 },
    
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        const handleEdit = () => {
          const rowIndex = rows.findIndex((row) => row.id === params.row.id);
          if (rowIndex !== -1) {
            // Retrieve the row data
            const rowData = rows[rowIndex];
            setOpen(true);
            setFormData({
              state: rowData.State,
              entityName: rowData['Entity Name'],
              gstin: rowData.GSTIN,
              pincode: rowData.Pincode,
              address1: rowData.Address,
              address2: '', // Assuming there is no address2 in the row data
            });
            setEditingRowIndex(rowIndex); // Add this line to store the index of the editing row
          }
        };
        

        const handleDelete = () => {
          const confirmDelete = window.confirm("Are you sure you want to delete?");
          if (confirmDelete) {
            const updatedRows = rows.filter((row) => row.id !== params.row.id);
            setRows(updatedRows);
          }
        };


        
        return (
          <div>
            <Button onClick={handleEdit} startIcon={<EditIcon />} size="small">
            
            </Button>
            <Button
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
              size="small"
              color="error"
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  
  ];
  
  
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
  
    if (id === 'pincode' &&  !/^\d+$/.test(value)) {
      event.preventDefault();
      event.stopPropagation();
      event.target.value = formData.pincode; // Revert the input value to the previous pincode value
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };
  const handleSave = () => {
    if (!formData.state || !formData.entityName || !formData.gstin || !formData.pincode || !formData.address1 || !formData.address2) {
      setIsFieldsEmpty(true);
    } else {


    if (editingRowIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editingRowIndex] = {
        id: rows[editingRowIndex].id,
        'Entity Name': formData.entityName,
        State: formData.state,
        GSTIN: formData.gstin,
        'Address 1': formData.address1,
      'Address 2': formData.address2,
        Pincode: formData.pincode,
      };
      setRows(updatedRows);
      setEditingRowIndex(null); // Reset the editing row index
    } else {
      const newId = rows.length + 1;
      const newRow = {
        id: newId,
        'Entity Name': formData.entityName,
        State: formData.state,
        GSTIN: formData.gstin,
        'Address 1': formData.address1,
        'Address 2': formData.address2,
        Pincode: formData.pincode,
      };
      setRows((prevRows) => [...prevRows, newRow]);
    }
  
    setOpen(false);
    handleSnackbarOpen();
    setFormData({
      state: '',
      entityName: '',
      gstin: '',
      pincode: '',
      address1: '',
      address2: '',
    });
    setIsFieldsEmpty(false);
  }
  };
  

  const [indianStates, setIndianStates] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    axios.post('http://localhost:3000/api/hbstateselect/')
      .then((response) => {
        console.log(response.status, response.data);
         setIndianStates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Indian states:', error);
      });
  }, []);

  

  const handleStateChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      state: value,
    }));
  };

  return (
    <div>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        GST
      </Typography>
    <div style={{ position: 'relative' }}>
      <Button variant="outlined" id="agst" onClick={handleClickOpen}
      style={{ position: 'absolute', top: '-75px', right: '20px' }}>
        Add GST
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add GST</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the following information to add GST:
          </DialogContentText>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              select
              margin="dense"
              id="state"
              label="State"
              fullWidth
              variant="outlined"
              value={formData.state}
              onChange={handleStateChange}
              required // Added required attribute
              error={isFieldsEmpty && !formData.state }
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: '415px', // Adjust the maximum height of the dropdown menu
                    },
                  },
                },
              }}
              
            >
                        
    {indianStates.map((state,i) => (
       <MenuItem key={i} value={state.StateName}>
       {state.StateName}
     </MenuItem>
   ))}
              
            </TextField>
            <TextField
              margin="dense"
              id="entityName"
              label="Entity Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.entityName}
              onChange={handleInputChange}
              required // Added required attribute
              error={isFieldsEmpty&& !formData.entityName}
               SelectProps={{
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: '415px', // Adjust the maximum height of the dropdown menu
        },
      },
    },
  }}
            />
            <TextField
              margin="dense"
              id="gstin"
              label="GSTIN"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.gstin}
              onChange={handleInputChange}
              required // Added required attribute
              error={isFieldsEmpty && !formData.gstin}
            />
            <TextField
              margin="dense"
              id="pincode"
              label="Pincode"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Specify numeric input pattern
  fullWidth
              fullWidth
              variant="outlined"
              value={formData.pincode}
              onChange={handleInputChange}
              required // Added required attribute
              error={isFieldsEmpty && !formData.pincode}
            />
            <TextField
              margin="dense"
              id="address1"
              label="Address 1"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.address1}
              onChange={handleInputChange}
              required // Added required attribute
              error={isFieldsEmpty && !formData.address1 }
            />
            <TextField
              margin="dense"
              id="address2"
              label="Address 2"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.address2}
              onChange={handleInputChange}
              required // Added required attribute
              error={isFieldsEmpty && !formData.address2}
            />
            {isFieldsEmpty && !formData.address2 && (
  <Typography variant="body2" color="error" align="center">
    All fields are mandatory
  </Typography>
)}
          </Box>
        </DialogContent>
        <DialogActions>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleClose}
              id="cancelb"
              variant="outlined"
              sx={{ marginRight: '40px', marginBottom: '20px' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              id="addb"
              variant="contained"
              sx={{ marginRight: '85px', marginBottom: '20px' }}
            >
              Save
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '90px',height: '400px',overflowY: 'auto' }}>
      <div style={{ height: '100%', width: '51%', marginBottom: '10px' }}>
      <ThemeProvider
            theme={(theme) =>
              createTheme({
                ...theme,
                components: {
                  MuiDataGrid: {
                    styleOverrides: {
                      root: {
                        '& .MuiDataGrid-colCellTitle': {
                          padding: '0.5rem 1rem', // Increase spacing between columns
                        },
                      },
                    },
                  },
                },
              })
            }
          >
            <StyledDataGrid rows={rows} columns={columns} pageSize={10} autoHeight />
          </ThemeProvider>
        
      </div>
      </Box>
    </div>
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
        message="Invoice saved!"
      />
    </div>
  );}