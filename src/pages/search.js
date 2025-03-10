import { URL } from '../../const.js';
import { fetchAPI, updateInnerHTML } from '../../utils.js';
import { addMovieTitleEventListener } from '../router.js';

const getResultHTML = (movies = []) => {
    if (movies.length === 0) {
        return '<li>No movies found</li>'
    }

    return `
        ${
            movies.map(({ id, title }) => `
                <li>
                    <button class="movie-title" data-id="${id}">${title}</button>
                </li>
            `)
            .join('')
        }
    `
}

const getInintialSearchHTML = (movies) => {
    return `
        <h1>Search Results</h1>
        <ul>
            ${getResultHTML(movies)}
        </ul>
    `
}

const renderSearch = async ({ searchParams, initialData }) => {
    if (!initialData) {
        const app = document.querySelector('#app');

        updateInnerHTML({ container: app, elements: `<p>Searching for ${searchParams.query}...</p>` });

        const movies = await fetchAPI(`${URL}/api/search?query=${searchParams.query}`);

        updateInnerHTML({ container: app, elements: getInintialSearchHTML(movies) });
    };

    addMovieTitleEventListener();
};

export default renderSearch;
export { getInintialSearchHTML };