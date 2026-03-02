async function searchCountry(countryName) {
    const countryInformation=document.getElementById('country-info');
    const bordersInformation=document.getElementById('bordering-countries');
    const spinner=document.getElementById('loading-spinner');
    const errorMessage=document.getElementById('error-message');

    try {
        spinner.style.display='block';
        errorMessage.textContent=' ';
        countryInformation.innerHTML=' ';
        bordersInformation.innerHTML=' ';
        
        const response=await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
            throw new Error("Invalid Country Name");
        }
        const data=await response.json();
        const country=data[0];

    
        countryInformation.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="${country.name.common} flag">`;

        if(country.borders && country.borders.length>0){
            const bordersResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}`);
            const borderData=await bordersResponse.json();

            const borderNames=borderData.map(b=>b.name.common).join(',');
            bordersInformation.innerHTML=`<p><strong>Bordering Countries:</strong> ${borderNames}<p>`;
        }
        else{
            bordersInformation.innerHTML=`<p><strong>No Bordering Countries</strong><p>`;
        }


    } catch (error) {
        errorMessage.textContent=error.message;
    } finally {
        spinner.style.display='none';
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value.trim();
    if (country){
        searchCountry(country);
    }
});
