import renderIndex from "./pages";
import renderSearch from "./pages/search";

const ROUTES = {
    '/': renderIndex,
    '/search': renderSearch
};

export default ROUTES;
