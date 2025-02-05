const renderSearch = ({ searchParams }) => {
    document.querySelector('#app').innerHTML = `
        <h1>Search Results: ${searchParams.query}</h1>
    `;
};

export default renderSearch;