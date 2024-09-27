// components/ProductPrice.js
import React, { useEffect, useState } from 'react';
import { getUserLocation } from '../utils/getUserLocation';

const ProductPrice = ({ priceInINR, priceInUSD }) => {
  const [currencySymbol, setCurrencySymbol] = useState('$'); // Default to USD symbol
  const [price, setPrice] = useState(priceInUSD);  // Default to USD price

  useEffect(() => {
    const fetchUserLocation = async () => {
      const location = await getUserLocation();
      if (location && location.countryCode === 'IN') {
        // User is from India, show INR price with ₹ symbol
        setCurrencySymbol('₹');
        setPrice(priceInINR);
      } else {
        // Default to USD symbol and price
        setCurrencySymbol('$');
        setPrice(priceInUSD);
      }
    };
    fetchUserLocation();
  }, [priceInINR, priceInUSD]);

  return (
    <span>
      {currencySymbol}{price}
    </span>
  );
};

export default ProductPrice;
