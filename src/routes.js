import renderIndex, { getInintialHTML } from "./pages";
import renderSearch, { getInintialHTML as getInintialSearchHTML } from "./pages/search";

const ROUTES = {
    '/': renderIndex,
    '/search': renderSearch
};

 const INITIAL_HTML = {
    '/': getInintialHTML,
    '/search': getInintialSearchHTML
};

export { ROUTES, INITIAL_HTML };
