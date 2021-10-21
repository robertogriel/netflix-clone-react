const API_KEY = '760918019ec79b19ea0490d64b5d892c';
const API_BASE = 'https://api.themoviedb.org/3';
const language= 'pt-BR';

/*
- Originais Netflix
- Recomendados
- Em alta (mais votados)
- Filmes de Ação
- Filmes de Terror
- Filmes de Romance
- Filmes de Documentário
*/

const basicFetch = async (endpoint)=>{

    const req = await fetch(`${API_BASE}${endpoint}`);

    const json = await req.json();
    
    return json;

}

export default {
    getHomeList: async ()=>{
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv/?with_network=213&language=${language}&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=${language}&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=${language}&api_key=${API_KEY}`)
            },
            
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=${language}&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=${language}&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=${language}&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=${language}&api_key=${API_KEY}`)
            },
            {
                slug: 'drama',
                title: 'Drama',
                items: await basicFetch(`/discover/movie?with_genres=18&language=${language}&api_key=${API_KEY}`)
            },

        ];
    },

    getMovieInfo: async (movieId,  type)=>{
        let info = {};

        if (movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=${language}&api_key=${API_KEY}`)
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=${language}&api_key=${API_KEY}`)
                break;
                default:
                    info = null;
                break;
            }
        }

        return info;
    }
}