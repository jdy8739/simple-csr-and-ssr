import renderIndex, { getInintialHTML } from "./pages";
import renderSearch, { getInintialSearchHTML } from "./pages/search";
import renderDetails, { getInintialDetailsHTML } from "./pages/details";

const ROUTES = {
    '/': renderIndex,
    '/search': renderSearch,
    '/details/:id': renderDetails
};

 const INITIAL_HTML = {
    '/': getInintialHTML,
    '/search': getInintialSearchHTML,
    '/details/:id': getInintialDetailsHTML
};

export { ROUTES, INITIAL_HTML };
