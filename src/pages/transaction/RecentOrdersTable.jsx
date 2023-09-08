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
import BulkActions from './BulkActions.jsx';

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
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

 

  
  
  const theme = useTheme();
  const { makeRequest } = useAuthenticatedRequest();
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
  const [transactions, setTransactions] = useState([]);
  const fetchUpdatedTransactions = async () => {
    try {
      const data = await makeRequest(`${apiBaseURL}/transactions`, 'GET');
      console.log("Received data:", data);
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.error("Received data is not an array:", data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  useEffect(() => {
    fetchUpdatedTransactions();
   
  }, []);
  return (
  
      <TableContainer>
      <Table>
        <TableHead>
          {/* ... table headers */}
          <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Token</TableCell>
              <TableCell >Amount</TableCell>
              <TableCell >USD</TableCell>
              <TableCell >Price</TableCell>
              
        </TableHead>
        <TableBody>
         {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.transaction_type}</TableCell>
              <TableCell>{transaction.token.name}</TableCell>
              <TableCell >{transaction.transaction_amount}</TableCell>
              <TableCell >{transaction.usd_value}</TableCell>
              <TableCell >{transaction.transaction_price}</TableCell>
              {/* ... other table cells */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
