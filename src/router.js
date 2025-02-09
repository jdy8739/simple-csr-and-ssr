let routes;

const goto = (url, { push, initialData } = {}) => {
    if (push) {
        history.pushState({}, '', url);
    }

    const [pathname, queries] = url.split('?');

    const searchParams = Object.fromEntries(new URLSearchParams(queries));

    routes[pathname]?.({ searchParams, initialData });
};

const start = (params) => {
    routes = params.routes;

    window.addEventListener('popstate', () => {
        routes[location.pathname]?.();
    });

    goto(`${location.pathname}${location.search}`, {
        initialData: window.__INITIAL_DATA__
    });
};

export default start;
export { goto };