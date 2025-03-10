let routes;

const getSearchParams = (queries) => Object.fromEntries(new URLSearchParams(queries));

const goto = (url, { push, initialData } = {}) => {
    if (push) {
        history.pushState({}, '', url);
    }

    const [pathname, queries] = url.split('?');

   if (pathname === '/search') {
        const searchParams = getSearchParams(queries);

        routes[pathname]?.({ searchParams, initialData });
   } else if (pathname.includes('/details/')) {
        const movieId = pathname.split('/')[2];

        routes['/details/:id']?.({ movieId, initialData });
   } else {
        routes[pathname]?.({ initialData });
   }
};

const goToDetails = (e) => {
    e.stopPropagation();
    
    const movieId = e.target.dataset.id;
    
    goto(`/details/${movieId}`, { push: true });
}

const clearMovieTitleEventListeners = () => {
    const movies = document.querySelectorAll('.movie-title');

    movies.forEach((movie) => {
        movie.removeEventListener('click', goToDetails);
    })
}

const addMovieTitleEventListener = () => {
    const movies = document.querySelectorAll('.movie-title');

    movies.forEach((movie) => {
        movie.addEventListener('click', goToDetails)
    })
}


const start = (params) => {
    routes = params.routes;

    window.addEventListener('popstate', () => {
        if (location.pathname === '/search') {
            const query = location.search.replace('?', '');

            const searchParams = getSearchParams(query);

            routes[location.pathname]?.({ searchParams });
        } else if (location.pathname.includes('/details/')) {
            const movieId = location.pathname.split('/')[2];

            routes['/details/:id']?.({ movieId });
        } else {
            routes[location.pathname]?.({});
        }

        // add condition to check if the page is search page
        clearMovieTitleEventListeners();
    });

    goto(`${location.pathname}${location.search}`, {
        initialData: window.__INITIAL_DATA__
    });
};

export default start;
export { goto, addMovieTitleEventListener };