const getInintialHTML = ({ movies = [] }) => {
    return `
        <h1>Search Results</h1>
        ${
            movies.map((movie) => `
                <div>
                    <p>${movie.title}</p>
                </div>
            `)
            .join('')
        }
    `
}


const renderSearch = async ({ searchParams, initialData }) => {
    if (!initialData) {
            document.querySelector('#app').innerHTML = `
            <p>Searching for ${searchParams.query}...</p>
        `;

        const response = await fetch(
            `${import.meta.env.MODE === 'development' ? 
                'http://localhost:3000' : ''}/api/search?query=${searchParams.query}`
            );

        const movies = await response.json();

        document.querySelector('#app').innerHTML = getInintialHTML({ movies });
    };
};

export default renderSearch;
export { getInintialHTML };