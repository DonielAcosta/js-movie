//me lleva al buscador
searchFormBtn.addEventListener("click", () =>{
    location.hash ='#search='
});
//me lleva a categorias
trendingBtn.addEventListener("click", () =>{
    location.hash ='#trends'
});
//flecha de regreso
arrowBtn.addEventListener("click", () =>{
    location.hash ='#home'
});
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  console.log({ location });
  
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }
}


function homePage() {
  console.log('Home!!');
  headerSection.classList.remove('header-container--long');
  headerSection.computedStyleMap.background ='';

  //oculta el boton 
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');

  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');

  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview();
  getCategoriesPreview();
  
}
//para que las categorias se oculten
function categoriesPage() {
  console.log('categories!!');

  headerSection.classList.remove('header-container--long');
  headerSection.computedStyleMap.background ='';

  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');

  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');

  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
}

function movieDetailsPage() {
  console.log('Movie!!');

  headerSection.classList.add('header-container--long');
//   headerSection.computedStyleMap.background ='';

  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');

  movieDetailSection.classList.remove('inactive');
}

function searchPage() {
  console.log('Search!!');

  headerSection.classList.remove('header-container--long');
  headerSection.computedStyleMap.background ='';

  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');

  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');

  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
}

function trendsPage() {
  console.log('TRENDS!!');

  headerSection.classList.remove('header-container--long');
  headerSection.computedStyleMap.background ='';

  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');

  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');

  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
}