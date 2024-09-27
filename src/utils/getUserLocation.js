// utils/getUserLocation.js
export const getUserLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('Failed to fetch location');
      const data = await response.json();
      return {
        country: data.country_name,
        countryCode: data.country_code,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  