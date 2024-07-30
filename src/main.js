const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
});

const lazyLoader = new IntersectionObserver((entris)=>{
  entris.forEach(entry => {
    entry
    console.log({entry});
    if(entry.isIntersecting){

      const url = entry.target.getAttribute('data-img')
      entry.target.setAttribute('src', url)
    }
  });
});
//crea las pelicas 
function createMovies(movies,container, lazyloader= false){
  container.innerHTML =''

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click',()=>{
      location.hash = '#movie=' + movie.id;
    })

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      lazyloader ? 'data-img': 'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );
    movieImg.addEventListener('error',()=>{
      movieImg.setAttribute(
        'src',
        'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
      )
    })

    if(lazyloader){
      lazyLoader.observe(movieImg);
    }
    const movieTitle = document.createElement('h3');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = movie.title;

    const movieRating = document.createElement('span');
    movieRating.classList.add('movie-rating');
    movieRating.textContent = movie.vote_average;

    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieTitle);
    movieContainer.appendChild(movieRating);

    container.appendChild(movieContainer);
  })
}
//crea las categorias
function createCategories(categories,container){
  container.innerHTML = "";

  categories.forEach(category => {  
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}
//llamar  a la API 

async function getTrendingMoviesPreview(){
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  createMovies(movies,trendingMoviesPreviewList,true);
}

async function getCategegoriesPreview() {
  const { data } = await api('genre/movie/list');
  const categories = data.genres;


  createCategories(categories,categoriesPreviewList);
}

async function getMoviesByCategory(id) {
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;

  createMovies(movies,genericSection,true)

}

async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {
    params: {
      query,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);
}
//obtener todas las tendencias del momento
async function getTrendingMovies() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  createMovies(movies,genericSection);
}
//detalles de peliculas
async function getMoviesById(id) {
  const { data: movie } = await api('movie/' + id);

  const movieImgUrl = 'http://image.tmdb.org/t/p/w500' + movie.poster_path;
  console.log(movieImgUrl);
  headerSection.style.background  =` linear-gradient(
                                      180deg,rgba(0,0,0,0.35)19.27%,
                                      rgba(0,0,0,0.05)29.27%
                    ),url(${movieImgUrl})`;

  movieDetailTitle.textContent        = movie.title;
  movieDetailDescription.textContent  = movie.overview;
  movieDetailScore.textContent        = movie.vote_average;

  createCategories(movie.genres,movieDetailCategoriesList);
  getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id){
  const {data} = await api(`movie/${id}/recommendations`);

  const relatedMovies = data.results;

  createMovies(relatedMovies,relatedMoviesContainer);
}