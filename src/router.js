/** 
 * This is a router that is used to navigate between pages
 * !! this should never be changed after the router is started !!
 */
let routes;

/** get the search params */
const getSearchParams = (queries) => Object.fromEntries(new URLSearchParams(queries));

/** call the render function based on the pathname and queries */
const gotoPathname = ({ pathname, queries, initialData }) => {
    if (pathname === '/search') {
        const searchParams = getSearchParams(queries);

        routes[pathname]?.({ searchParams, initialData });
    } else if (pathname.includes('/details/')) {
        const movieId = pathname.split('/')[2];

        routes['/details/:id']?.({ movieId, initialData });
    } else {
        routes[pathname]?.();
    }
}

/** navigate to the url */
const goto = (url, { push, initialData } = {}) => {
    if (push) {
        history.pushState({}, '', url);
    }

    const [pathname, queries] = url.split('?');

    gotoPathname({ pathname, queries, initialData });
};

/** go to the details page */
const goToDetails = (e) => {
    e.stopPropagation();
    
    const movieId = e.target.dataset.id;
    
    goto(`/details/${movieId}`, { push: true });
}

/** clear the movie title event listeners */
const clearMovieTitleEventListeners = () => {
    const movies = document.querySelectorAll('.movie-title');

    movies.forEach((movie) => {
        movie.removeEventListener('click', goToDetails);
    })
}

/** add the movie title event listener */
const addMovieTitleEventListener = () => {
    const movies = document.querySelectorAll('.movie-title');

    movies.forEach((movie) => {
        movie.addEventListener('click', goToDetails)
    })
}

/** start the router */
const start = (params) => {
    routes = params.routes;

    window.addEventListener('popstate', () => {
        const { pathname, search } = location;

        gotoPathname({ pathname, queries: search.replace('?', '') });

        // add condition to check if the page is search page
        clearMovieTitleEventListeners();
    });

    goto(`${location.pathname}${location.search}`, {
        initialData: window.__INITIAL_DATA__
    });
};

export default start;
export { goto, addMovieTitleEventListener };