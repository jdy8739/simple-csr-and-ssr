
const fetchAPI = async (url) => {
    const response = await fetch(url);
    return response.json();
}

const updateInnerHTML = ({ container, elements }) => {
    container.innerHTML = elements;
}

export { fetchAPI, updateInnerHTML };