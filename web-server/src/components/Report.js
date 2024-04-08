import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Grid,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

export const Report = ({ userData }) => {
  const location = useLocation();
  const userId = userData.user_id
  useEffect(() => {
    if (location.pathname === '/report-history') {
      // Make the API request here
      fetchData();
    }
  }, [location]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page
  const [historyList, setHistoryList] = useState([]);

  const fetchData = async () => {
    try {

      // Define your query parameters
      const queryParams = {
        userId: userId
      };

      // Make the HTTP request to your API endpoint
      const response = await axios.get('http://localhost:5000/api/get_history', { params: queryParams });

      // Process the response and extract the report data
      const responseList = response.data;

      // Set the report data in state
      setHistoryList(responseList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (row) => {
    setSelectedRow(row);
    setShowPopup(true);
  };

  const handleClose = () => {
    setSelectedRow(null);
    setShowPopup(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#3F6255',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(id, date, filename, vulnerabilitiesData) {
    return { id, date, filename, vulnerabilitiesData };
  }

  return (
    <Container>
      <div
        style={{
          padding: '2.5rem',
          borderRadius: '40px',
          width: '100%',
          margin: ' 10rem auto',
        }}
      >
        <Grid xs={12}>
          <h1 style={{ textAlign: 'center', marginBottom: '4rem' }}>Report History</h1>
        </Grid>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Filename</StyledTableCell>
                <StyledTableCell align="center">Vulnerability Amount</StyledTableCell>
                <StyledTableCell align="center">Vulnerabilities</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((history, historyIndex) => (
                <StyledTableRow key={historyIndex}>
                  <StyledTableCell align="center">{history.date}</StyledTableCell>
                  <StyledTableCell align="center">{history.file_name}</StyledTableCell>
                  <StyledTableCell align="center">{history.vulnerability_amount}</StyledTableCell>
                  <StyledTableCell align="center">
                    <button onClick={() => handleClick(history)}>View Details</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={historyList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Custom Popup for showing details */}
        {showPopup && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999,
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '40px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                border: '2px solid #023020',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Render your custom popup content here */}
              {selectedRow && (
                <ul style={{ marginBottom: '1rem' }}>
                  {selectedRow.vulnerabilities.map((vulnerability, index) => (
                    <li key={index} style={{ marginBottom: '2rem' }}>
                        <li key={index} style={{ marginBottom: '2rem' }}>
                          <strong>Vulnerability Type:</strong> {vulnerability.vulnerability_type}<br />
                          <strong>Impact:</strong> {vulnerability.impact}<br />
                          <strong>Confidence:</strong> {vulnerability.confidence}<br />
                          <strong>Description:</strong> {vulnerability.description}<br />
                          <strong>Recommendation:</strong> {vulnerability.recommendation}<br />
                          <strong style={{color:'red'}}>Vulnerability Code:</strong><br />
                          {vulnerability.vulnerability_codes.map((code, codeIndex) => (
                          <ul key={codeIndex}>
                            <strong>Code desc:</strong> {code.code_desc}<br />
                            <strong>Location:</strong> {code.location}<br />
                          </ul>
                        ))}
                        </li>
                    </li>
                  ))}
                </ul>
              )}

              {/* Add a button or any element to close the popup */}
              <button
                onClick={handleClose}
                style={{
                  background: '#023020',
                  color: 'white',
                  padding: '1rem 3rem',
                  fontSize: '1.rem',
                  marginTop: 'auto',
                  borderRadius: '40px',
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};
