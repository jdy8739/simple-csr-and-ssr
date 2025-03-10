
const LOCAL_URL = 'http://localhost:3000';

const URL = import.meta.env.MODE === 'development' ? LOCAL_URL : '';

export { URL };