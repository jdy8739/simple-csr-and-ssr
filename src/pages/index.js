import { goto } from "../router";

const getInintialHTML = () => {
    return `
        <h1>Search movie</h1>
        <form>
            <input type="search" name="query" />
            <button type="submit">Search</button>
        </form>
    `
}

const renderIndex = () => {
    document.querySelector('#app').innerHTML = getInintialHTML();

    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const url = `/search?query=${e.target.query.value}`;

        goto(url, { push: true });
    })
};

export default renderIndex;
export { getInintialHTML };