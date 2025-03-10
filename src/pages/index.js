import { updateInnerHTML } from "../../utils";
import { goto } from "../router";

const getInintialHTML = () => {
    return `
        <h1>Search movie</h1>
        <form>
            <input type="search" name="query" required />
            <button type="submit">Search</button>
        </form>
    `
}

const renderIndex = () => {
    const app = document.querySelector('#app');

    updateInnerHTML({ container: app, elements: getInintialHTML() });

    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const url = `/search?query=${e.target.query.value}`;

        goto(url, { push: true });
    })
};

export default renderIndex;
export { getInintialHTML };