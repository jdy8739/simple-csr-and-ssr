let routes;

const getSearchParams = (queries) => Object.fromEntries(new URLSearchParams(queries));

const goto = (url, { push, initialData } = {}) => {
    if (push) {
        history.pushState({}, '', url);
    }

    const [pathname, queries] = url.split('?');

    const searchParams = getSearchParams(queries);

    routes[pathname]?.({ searchParams, initialData });
};

const start = (params) => {
    routes = params.routes;

    window.addEventListener('popstate', () => {
        const query = location.search.replace('?', '');

        const searchParams = getSearchParams(query);

        routes[location.pathname]?.({ searchParams });
    });

    goto(`${location.pathname}${location.search}`, {
        initialData: window.__INITIAL_DATA__
    });
};

export default start;
export { goto };