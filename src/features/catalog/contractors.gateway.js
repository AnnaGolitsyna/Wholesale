const baseUrl = 'https://651bfcdb194f77f2a5af3176.mockapi.io/contractors';

const fetchData = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export { fetchData };
