import { URL } from '../../const.js';
import { fetchAPI, updateInnerHTML } from '../../utils.js';

const getResultHTML = (movie) => {
    return `
        <div class="movie-detail">
            <header class="movie-header">
                <div class="poster">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                </div>
                <div class="header-content">
                    <h1>${movie.title}</h1>
                    <p class="tagline">${movie.tagline}</p>
                <div class="meta">
                    ${
                        movie.certification ? `<span class="stat-item gradient">${movie.certification}</span>` : ''
                    }
                    <span class="stat-item gradient">${movie.runtime}분</span>
                    <span class="stat-item gradient">${movie.release_date}</span>
                </div>
                    <div class="genres">
                        ${movie.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                    </div>
                </div>
            </header>
            <section class="main-info">
                <div class="overview">
                    <h2>개요</h2>
                    <p>${movie.overview}</p>
                </div>
                <div class="stats">
                    <div class="stat-item gradient">
                        <span class="label">평점</span>
                        <span class="value">${movie.vote_average}</span>
                    </div>
                    <div class="stat-item gradient">
                        <span class="label">투표수</span>
                        <span class="value">${movie.vote_count}</span>
                    </div>
                    ${
                        movie.revenue ? `
                        <div class="stat-item gradient">
                            <span class="label">수익</span>
                            <span class="value">$${(movie.revenue/1000000).toFixed(1)}M</span>
                        </div>
                            ` : ''
                    }
                </div>
            </section>
            <section class="credits">
                <div class="crew">
                    <h2>제작진</h2>
                    <div class="director">
                        <h3>감독</h3>
                        ${movie.directors.map(director => `<span>${director.name}</span>`).join('')}
                    </div>
                    <div class="writers">
                        <h3>각본</h3>
                        ${movie.writers.map(writer => `<span>${writer.name}</span>`).join('')}
                    </div>
                </div>
                <div class="cast">
                    <h2>주요 출연진</h2>
                    <div class="cast-list">
                        ${movie.cast.map(actor => `
                        <div class="cast-item gradient">
                            <span class="actor-name">${actor.name}</span>
                        </div>
                        `).join('')}
                    </div>
                </div>
            </section>
            <section class="similar-movies">
                <h2>비슷한 영화</h2>
                <div class="movie-grid">
                    ${movie.similar.slice(0, 6).map(similar => `
                        <div class="similar-movie-card gradient">
                        <h3>${similar.title}</h3>
                        </div>
                    `).join('')}
                </div>
            </section>
            <footer class="social-links">
                ${movie.external_ids.imdb_id ? `
                <a href="https://www.imdb.com/title/${movie.external_ids.imdb_id}" target="_blank" class="social-link">IMDb</a>
                ` : ''}
                ${movie.external_ids.instagram_id ? `
                <a href="https://www.instagram.com/${movie.external_ids.instagram_id}" target="_blank" class="social-link">Instagram</a>
                ` : ''}
                ${movie.trailer_yt ? `
                <a href="https://www.youtube.com/watch?v=${movie.trailer_yt}" target="_blank" class="social-link">예고편 보기</a>
                ` : ''}
            </footer>
        </div>
    `
}

const getInintialDetailsHTML = (movie) => {
    return `
        ${movie ? getResultHTML(movie) : 'No movie found'}
    `
}

const renderDetails = async ({ movieId, initialData }) => {
    if (!initialData) { 
        const app = document.querySelector('#app');

        updateInnerHTML({ container: app, elements: '<p>Loading...</p>' });

        const movie = await fetchAPI(`${URL}/api/details/${movieId}`);

        updateInnerHTML({ container: app, elements: getInintialDetailsHTML(movie) });
    };
};

export default renderDetails;
export { getInintialDetailsHTML };