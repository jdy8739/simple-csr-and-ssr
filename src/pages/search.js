const renderSearch = async ({ searchParams }) => {
    document.querySelector('#app').innerHTML = `
        <p>Searching for ${searchParams.query}...</p>
    `;

    const response = await fetch(`http://localhost:3000/search?query=${searchParams.query}`);

    const movies = await response.json();

    document.querySelector('#app').innerHTML = `
        <h1>Search Results</h1>
        ${
            movies.map((movie) => `
                <div>
                    <p>${movie.title}</p>
                </div>
            `)
            .join('')
        }
    `;
};

export default renderSearch;