import { URL } from '../../const.js';
import { fetchAPI, updateInnerHTML } from '../../utils.js';

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

const getInintialSearchHTML = (movies) => {
    return `
        <h1>Search Results</h1>
        ${getResultHTML(movies)}
    `
}

const renderSearch = async ({ searchParams, initialData }) => {
    if (!initialData) {
        const app = document.querySelector('#app');

        updateInnerHTML({ container: app, elements: `<p>Searching for ${searchParams.query}...</p>` });

        const movies = await fetchAPI(`${URL}/api/search?query=${searchParams.query}`);

        updateInnerHTML({ container: app, elements: getInintialSearchHTML(movies) });
    };
};

export default renderSearch;
export { getInintialSearchHTML };