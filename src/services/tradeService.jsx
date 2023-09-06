import { useAuthenticatedRequest } from './useAuthenticatedRequest';
 const apiBaseURL = import.meta.env.VITE_API_BASE_URL;


 export const fetchPrice = async (pair, makeRequest) => {
  const url = `${apiBaseURL}/api/trades/price?pair=${pair}`;
  let data = await makeRequest(url, 'GET');
  data = { ...data, price: data.data.priceUsd };

  if (!data.price) {
    throw new Error(`Price information not available for ${pair}`);
  }
  return data.price;
};




export const buyToken = (makeRequest, selectedToken, tokenAmount, totalUsdValue) => {
  return makeRequest(`${apiBaseURL}/api/trades/buy`, 'POST', {
    token: selectedToken,
    amount: tokenAmount,
    total_usd_value: totalUsdValue
  });
};

export const sellToken = (makeRequest, selectedToken, tokenAmount, totalUsdValue) => {
  return makeRequest(`${apiBaseURL}/api/trades/sell`, 'POST', {
    token: selectedToken,
    amount: tokenAmount,
    total_usd_value: totalUsdValue
  });
};
