import start from "./router";
import { INITIAL_HTML, ROUTES } from "./routes";

if (typeof window !== 'undefined') {
    start({ routes: ROUTES });
}

export { INITIAL_HTML };