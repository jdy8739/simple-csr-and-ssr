
const getResultHTML = (movies = []) => {
    if (movies.length === 0) {
        return '<p>No movies found</p>'
    }

    return `
        ${
            movies.map((movie) => `
                <div>
                    <p>${movie}</p>
                </div>
            `)
            .join('')
        }
    `
}

const getInintialHTML = (movies) => {
    return `
        <h1>Search Results</h1>
        ${getResultHTML(movies)}
    `
}

const URL = import.meta.env.MODE === 'development' ? 
                'http://localhost:3000' : '';

const renderSearch = async ({ searchParams, initialData }) => {
    if (!initialData) {
            document.querySelector('#app').innerHTML = `
            <p>Searching for ${searchParams.query}...</p>
        `;

        const response = await fetch(
            `${URL}/api/search?query=${searchParams.query}`
            );

        const movies = await response.json();

        document.querySelector('#app').innerHTML = getInintialHTML(movies);
    };
};

export default renderSearch;
export { getInintialHTML };