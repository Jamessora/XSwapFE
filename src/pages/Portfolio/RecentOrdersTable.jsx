import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import { withKYCProtection } from '../hoc/withKYCProtection.jsx'; 
import { useAuthenticatedRequest } from '../../services/useAuthenticatedRequest.jsx';

import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from '../../components/Label/index.jsx';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
//import BulkActions from './BulkActions.jsx';

const getStatusLabel = (cryptoOrderStatus) => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color } = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (cryptoOrders, filters) => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (cryptoOrders, page, limit) => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable = ({ cryptoOrders }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllCryptoOrders = (event) => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (event, cryptoOrderId) => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;
  const theme = useTheme();
  const { makeRequest } = useAuthenticatedRequest();
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
  //const [transactions, setTransactions] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);

  const fetchUpdatedPortfolio = async () => {
    try {
      const data = await makeRequest(`${apiBaseURL}/portfolio_items`, 'GET');
      console.log("Received data:", data);
      if (Array.isArray(data)) {  // <-- Check if the data is an array
        setPortfolioItems(data);
      } else {
        console.error("Received data is not an array:", data);
      }
    } catch (error) {
      console.error('Error fetching Portfolio:', error);
    }
  };
  const [pnls, setPnls] = useState({});
 
  // const fetchPnls = async () => {
  //   const response = await fetch(`${apiBaseURL}/api/trades/calculate_pnl`, { method: 'GET' });
  //   const data = await response.json();
  //   return data.pnls;
  // };

  const fetchPnls = async () => {
    try {
      const data = await makeRequest(`${apiBaseURL}/api/trades/calculate_pnl`, 'GET');
      console.log("Received data:", data);
      
      if (data.pnls && Array.isArray(data.pnls)) {  // <-- Check if the data.pnls is an array
        const pnlsObject = {};
        data.pnls.forEach((pnlItem) => {
          pnlsObject[pnlItem.token] = pnlItem.pnl;
        });
        setPnls(pnlsObject);  // <-- Update the state here
      } else {
        console.error("Received data is not an array:", data);
      }
    } catch (error) {
      console.error('Error fetching Portfolio:', error);
    }
  };
  
  useEffect(() => {
    fetchUpdatedPortfolio();
   
  }, []);
  
  useEffect(() => {
    fetchPnls();
    console.log("Fetched PNLs:", pnls);
    
  }, []);

  useEffect(() => {
    console.log("Fetched PNLs:", pnls);
    console.log("Fetched Portfolio Items:", portfolioItems);
  }, [pnls, portfolioItems]);


  return (
    // <Card>
    //   {selectedBulkActions && (
    //     <Box flex={1} p={2}>
    //       <BulkActions />
    //     </Box>
    //   )}
    //   {!selectedBulkActions && (
    //     <CardHeader
    //       action={
    //         <Box width={150}>
    //           <FormControl fullWidth variant="outlined">
    //             <InputLabel>Status</InputLabel>
    //             <Select
    //               value={filters.status || 'all'}
    //               onChange={handleStatusChange}
    //               label="Status"
    //               autoWidth
    //             >
    //               {statusOptions.map((statusOption) => (
    //                 <MenuItem key={statusOption.id} value={statusOption.id}>
    //                   {statusOption.name}
    //                 </MenuItem>
    //               ))}
    //             </Select>
    //           </FormControl>
    //         </Box>
    //       }
    //       title="Recent Orders"
    //     />
    //   )}
    //   <Divider />
      <TableContainer>
      <Table>
        <TableHead>
          {/* ... table headers */}
          
              <TableCell>Token</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell >USD</TableCell>
              <TableCell >PNL</TableCell>
              
        </TableHead>
        <TableBody>
         {portfolioItems.map((portfolioItem, index) => (
            <TableRow key={index}>
              <TableCell>{portfolioItem.token.name}</TableCell>
              <TableCell>{portfolioItem.amount}</TableCell>
              <TableCell >{portfolioItem.amount*portfolioItem.token.price}</TableCell>
              <TableCell >{pnls[portfolioItem.token.name] || 'N/A'}</TableCell>
       
              {/* ... other table cells */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    //   <Box p={2}>
    //     <TablePagination
    //       component="div"
    //       count={filteredCryptoOrders.length}
    //       onPageChange={handlePageChange}
    //       onRowsPerPageChange={handleLimitChange}
    //       page={page}
    //       rowsPerPage={limit}
    //       rowsPerPageOptions={[5, 10, 25, 30]}
    //     />
    //   </Box>
    // </Card>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
