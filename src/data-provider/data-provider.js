async function fetchData() {
    const response = await fetch('../src/assets/pokemon.json');
    const data = await response.json();
    return  data;
  }
  
  export default fetchData;