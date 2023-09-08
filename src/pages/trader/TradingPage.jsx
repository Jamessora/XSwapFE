import React,{ useState, useEffect } from 'react';
import { withKYCProtection } from '../hoc/withKYCProtection.jsx'; // Update the path according to your project structure
import { buyToken, sellToken, fetchPrice } from '../../services/tradeService.jsx';
import { useAuthenticatedRequest } from '../../services/useAuthenticatedRequest.jsx';

import PersistentDrawerLeft from '../../components/Sidebar.jsx';
import { Grid, Typography, Select, Input, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { isAuthenticated } from '../../services/authService.jsx';
import AuthModal from './AuthModal.jsx';

const theme = createTheme();

const TradingPage = (props) => {

  console.log("Initial auth_token value:", localStorage.getItem('auth_token'))
  console.log("Checking authentication status...");
  
  if(!isAuthenticated() || localStorage.getItem('role') !== 'user') {
    console.log(`Not authenticated or Trying to access as: ${localStorage.getItem('role')} , showing modal...`);
    return <AuthModal />
  }

  const { makeRequest } = useAuthenticatedRequest();
  const [balance, setBalance] = useState(0)
  const [tokenPrice, setTokenPrice] = useState(null);
  const [selectedToken, setSelectedToken] = useState('bitcoin');
  const [tokenAmount, setTokenAmount] = useState(1);
  const [usdValue, setUsdValue] = useState(0);
  const [availableTokens] = useState(['bitcoin', 'ethereum', 'binance-coin', 'polygon', 'xrp','dogecoin','cardano','solana','litecoin','binancecoin','matic-network']);
  const [maxSellAmount, setMaxSellAmount] = useState(0);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
   
  const handleTokenAmountChange = (amount) => {
    setTokenAmount(amount);
    if (tokenPrice) {
      setUsdValue(amount * tokenPrice);
    }
  };

  const handleTokenChange = (event) => {
    setSelectedToken(event.target.value);
  };

  const handleTokenSelection = (event) => {
    setSelectedToken(event.target.value);
  };
  
  useEffect(() => {
    fetchUserBalance();
  }, []);
  
  const fetchUserBalance = async () => {
    try {
      const response = await makeRequest(`${apiBaseURL}/portfolio_items/show`, 'GET');
      if (response && response.balance) {
        setBalance(parseFloat(response.balance));
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error('Error fetching user balance:', error);
    }
  };
  
  useEffect(() => {
    if (tokenPrice) {
      setTokenAmount(usdValue / tokenPrice);
    }
  }, [usdValue, tokenPrice]);

  const handleUsdValueChange = (value) => {
    setUsdValue(value);
    if (tokenPrice) {
      setTokenAmount(value / tokenPrice);
    }
  };


  const fetchTokenPrice = async () => {
    try {
      const price = await fetchPrice(selectedToken, makeRequest);
      setTokenPrice(parseFloat(parseFloat(price).toFixed(2))); // Format the price to 2 decimal places
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyToken = async () => {
    try {
      const result = await buyToken(makeRequest, selectedToken, tokenAmount, usdValue);
      
      console.log('Buy successful:', result);
      
      
      alert('Buy Successful')
      if (result && result.user && result.user.balance) {
        setBalance(parseFloat(result.user.balance));
        fetchUserBalance();
        fetchUpdatedPortfolio();
      }
      
      console.log('Balance after buying:', result.user.balance);
     } catch (error) {
      // Handle the error here
      console.error('Error buying token:', error);
      alert('Error buying token');
    }
  };
  

  const handleMaxSell = () => {
    setTokenAmount(maxSellAmount);
    setUsdValue(maxSellAmount * tokenPrice);
  };

  const fetchUpdatedPortfolio = async () => {
    try {
      const data = await makeRequest(`${apiBaseURL}/portfolio_items`, 'GET');
      console.log("Received data:", data);
      if (Array.isArray(data)) {  
        setPortfolioItems(data);
  
        // Find the portfolio item for the selected token
        const tokenPortfolioItem = data.find(item => item.token.ticker === selectedToken);
        if (tokenPortfolioItem) {
          // Update the maxSellAmount state variable
          setMaxSellAmount(tokenPortfolioItem.amount);
        } else {
          setMaxSellAmount(0); // Reset to 0 if the token is not found in the portfolio
        }
  
      } else {
        console.error("Received data is not an array:", data);
      }
    } catch (error) {
      console.error('Error fetching Portfolio:', error);
    }
  };

  

  const handleSellToken = async () => {
    try {
      const result = await sellToken(makeRequest, selectedToken, tokenAmount, usdValue);

      console.log('Sell successful:', result);
      
      alert('Sell successful');

      if (result && result.user && result.user.balance) {
        setBalance(parseFloat(result.user.balance));
        fetchUserBalance();
        fetchUpdatedPortfolio();
      }
    
      console.log('Balance after selling:', result.user.balance);
    } catch (error) {
      // Handle the error here
      console.error('Error selling token:', error);
      alert('Error selling token');
    }
  };

  

    useEffect(() => {
      
    
     fetchTokenPrice();
    
      // Set up an interval to fetch the BTC price every min
      const intervalId = setInterval(fetchTokenPrice, 60000);
  
      // Clean up the interval when the component is unmounted
      return () => clearInterval(intervalId);
     
 
    }, [selectedToken]);

    useEffect(() => {
      fetchUpdatedPortfolio();
    }, [selectedToken, maxSellAmount]);

    useEffect(() => {
     //Script element with its source from the CoinGecko widget script URL
      const script = document.createElement('script');
      script.src = "https://widgets.coingecko.com/coingecko-coin-compare-chart-widget.js";
      script.async = true;
      document.body.appendChild(script);
    
      //widget element and set its attributes
      const widget = document.createElement('coingecko-coin-compare-chart-widget');
      widget.setAttribute('coin-ids', selectedToken);
      widget.setAttribute('currency', 'usd');
      widget.setAttribute('locale', 'en');
    
      // Select the container div and append the widget element to it
      const container = document.getElementById('coingecko-widget-container');
      container.appendChild(widget);
    
      // Cleanup function to remove script and widget elements when the component is unmounted
      return () => {
        // Check if the script is a child of its parent before removing it
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        // Remove the widget as well
        if (widget.parentNode) {
          widget.parentNode.removeChild(widget);
        }
      };
    }, [selectedToken]); 

    return (
      <ThemeProvider theme={theme}>
        <PersistentDrawerLeft />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3">Trading Page</Typography>
          </Grid>
          <Grid item xs={6}>
            <div id="coingecko-widget-container"></div>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">Current Price of {selectedToken}: {tokenPrice ? `${tokenPrice} USDT` : 'Loading...'}</Typography>
            <Select
              value={selectedToken}
              onChange={handleTokenSelection}
              fullWidth
              variant="outlined"
              margin="dense"
              native
            >
              <option value="" disabled>Select Token</option>
              {availableTokens.map((token) => (
                <option key={token} value={token}>
                  {token}
                </option>
              ))}
            </Select>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Amount of Tokens</Typography>
                <Input
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => handleTokenAmountChange(e.target.value)}
                  inputProps={{ max: maxSellAmount }}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">USD Value</Typography>
                <Input
                  type="number"
                  value={usdValue}
                  onChange={(e) => handleUsdValueChange(e.target.value)}
                  inputProps={{ max: balance }}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button onClick={() => setUsdValue(balance)} variant="contained" fullWidth>
                  Max Buy
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={handleBuyToken} variant="contained" fullWidth>
                  Buy
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button onClick={handleMaxSell} variant="contained" fullWidth>
                  Max Sell
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={handleSellToken} variant="contained" fullWidth>
                  Sell
                </Button>
              </Grid>
              <Grid item xs={12}>
              <div style={{ marginTop: '1rem' }}>Current Balance: {balance}</div>
            </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    );


};

export default withKYCProtection(TradingPage);
