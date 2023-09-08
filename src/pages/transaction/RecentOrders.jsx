import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable.jsx';
import { subDays } from 'date-fns';

function RecentOrders() {
  const cryptoOrders = [
    {}
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default RecentOrders;
