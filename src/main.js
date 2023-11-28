// const searchButton = document.querySelector('.search-button');
// var keywordInput = document.getElementById('keywordInput');
// var categorySelect = document.getElementById('categorySelect');

// searchButton.addEventListener('click', function() {
//   var link = 'https://food-boutique.b.goit.study/api/products?';
//   if (keywordInput.value) {
//     link += 'keyword=' + keywordInput.value + '&';
//   }
  
//   if (categorySelect.value) {
//     link += 'category=' + categorySelect.value;
//   }

//   console.log(link);
// });

const webdata = {};

const BASE_URL = 'https://food-boutique.b.goit.study/api';

const BASE_SEARCH_PARAMS = {
  keyword: null,
  category: null,
  page: 1,
  limit: 6,
};

async function renderPage() {
  const search_data = JSON.parse(localStorage.getItem('search-parameters'));
  if (!search_data) {
    setLocalSearchParams(BASE_SEARCH_PARAMS);
  }

  const allProducts = await getProducts(BASE_SEARCH_PARAMS);
  document.querySelector('.product-items').innerHTML =  markupProducts(allProducts.results);
  createPagination(allProducts.totalPages);

  renderCategories();
  renderDiscountProducts();
  renderPopularProducts();
  const searchForm = document.querySelector('.search-form');
  searchForm.addEventListener('submit', renderProductsList);
}

function createPagination(pages)
{
  let pagination = document.querySelector('.product-btn-scroll');

  let buttons = [];

  for (let i = 1; i <= pages; i++) {
    buttons.push('<li><button class="change-page" data-page="' + i + '">' + i + '</button></li>')
  }

  pagination.innerHTML = buttons;

  var paginationButtons = document.querySelectorAll('.change-page');
  
  for (let i = 0; i < paginationButtons.length; i++) {
    paginationButtons[i].addEventListener("click", async function() {
    BASE_SEARCH_PARAMS.page = this.getAttribute('data-page');
    const allProducts = await getProducts(BASE_SEARCH_PARAMS);
    document.querySelector('.product-items').innerHTML =  markupProducts(allProducts.results);
    // createPagination(allProducts.totalPages);
    //   document.getElementById('page').value = this.getAttribute('data-page');
    });
  }

  // console.log(pages);
  
}



async function renderPopularProducts() {
  try {
    const popular_products = await getPopularProducts();
    const products_container = document.querySelector('.products-container');
    const markup = markupDiscountProducts(popular_products);
    console.log(markup);
    products_container.innerHTML = markup;
  } catch (error) {
    console.error('Error rendering discount products:', error);
  }
}
async function getPopularProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products/popular`);
    const popular = await response.json();
    console.log(popular);
    return popular;
  } catch (error) {
    console.error('Error fetching discount products:', error);
  }
}
function markupPopularProducts(popular_products) {
  let markup = '';
  for (let i = 0; i < 2; i++) {
    const item_markup = '';
    markup += item_markup;
  }
  return markup;
}

async function renderDiscountProducts() {
  try {
    const discount_products = await getDiscountProducts();
    const discount_list_el = document.querySelector('ul.discount-list');
    const markup = markupDiscountProducts(discount_products);
    discount_list_el.innerHTML = markup;
  } catch (error) {
    console.error('Error rendering discount products:', error);
  }
}

async function getDiscountProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products/discount`);
    const discount_products = await response.json();
    return discount_products;
  } catch (error) {
    console.error('Error fetching discount products:', error);
  }
}
function markupDiscountProducts(discount_products) {
  let markup = '';
  for (let i = 0; i < 2; i++) {
    const item_markup = `<li class="discount-card" data-id="${discount_products[i]._id}">
            <img class="discount-label" src="./img/discount.png" alt="discount">
            <div class="product-photo">
                <img class="product-img" src="${discount_products[i].img}">
            </div>
            <div class="product-details">
                <p class="product-name">${discount_products[i].name}</p>
                <div class="discount-price-flex">
                    <p class="product-price">$${discount_products[i].price}</p>
                    <a href="./cart.html" class="add-to-cart-icon">
                        <svg class="cart-icon">
                            <use href="./img/kupi-tank-sprite.svg#icon-basket"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </li>`;
    markup += item_markup;
  }
  return markup;
}

function setLocalSearchParams(params) {
  localStorage.setItem('search-parameters', JSON.stringify(params));
}
function getLocalSearchParams() {
  return JSON.parse(localStorage.getItem('search-parameters'));
}

async function getProducts(params) {
  try {
    let queryUrl = `${BASE_URL}/products?`;
    console.log(params.keyword);
    if (params.keyword) {
      queryUrl += `keyword=${params.keyword}&`;
    }
    if (params.category) {
      queryUrl += `category=${params.category}&`;
    }
    queryUrl += `page=${params.page}&limit=6`;
    const response = await fetch(queryUrl);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

async function renderCategories() {
  try {
    const filter = document.querySelector('.categorySelect');
    const categories = await getCategories();
    const markup = markupCategories(categories);
    filter.innerHTML = markup;
  } catch (error) {
    console.error('Error rendering categories:', error);
  }
}

async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

function markupCategories(categories) {
  let markup = categories
    .map(category => {
      return `<option value="${category}">${category.replaceAll(
        '_',
        ' '
      )}</option>`;
    })
    .join('');
  markup += `<option value="" selected>Show All</option>`;
  return markup;
}

renderPage();

async function renderProductsList(event) {
  try {
    event.preventDefault();
    const search_params = {
      keyword: event.target.elements.keyword.value,
      category: event.target.elements.category.value,
      page:  BASE_SEARCH_PARAMS.page,
      limit: 6,
    };
    if (!compareLocalSearchParams(search_params)) {
      setLocalSearchParams(search_params);
    }
    const productsList = document.querySelector('.product-items');
    const products = await getProducts(search_params);
    console.log(products.results);
    const markup_products = markupProducts(products.results);
    createPagination(products.totalPages);
    console.log(markup_products);
    productsList.innerHTML = markup_products;
  } catch (error) {}
}


function markupProducts(products) {
  const markup = products
    .map(
      ({
        _id,
        name,
        img,
        category,
        size,
        popularity,
        is10PercentOff,
        price,
      }) => {
        return `<li class="product-card list" data-id="${_id}">

            <div class="product-card-img">
                <img src="${img}">
            </div>
            <h2 class="product-name">${name}</h2>
            <div class="category-list">
                <p class="product-category">Category: <span class="category-value">${category.replaceAll(
                  '_',
                  ' '
                )}</span></p>
                <p class="product-category">Size: <span class="category-value">${size}</span></p>
                <p class="product-category">Popularity: <span class="category-value">${popularity}</span></p>
            </div>
            <div class="add-to-cart">
                <p class="product-price">$${price}</p>
                <button type="button" class="add-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M2.69999 0.899994C2.46129 0.899994 2.23237 0.994815 2.06359 1.1636C1.89481 1.33238 1.79999 1.5613 1.79999 1.79999C1.79999 2.03869 1.89481 2.26761 2.06359 2.43639C2.23237 2.60517 2.46129 2.69999 2.69999 2.69999H3.79799L4.07249 3.79979C4.07521 3.81246 4.07822 3.82506 4.08149 3.83759L5.30369 8.72459L4.49999 9.52739C3.36599 10.6614 4.16879 12.6 5.77259 12.6H13.5C13.7387 12.6 13.9676 12.5052 14.1364 12.3364C14.3052 12.1676 14.4 11.9387 14.4 11.7C14.4 11.4613 14.3052 11.2324 14.1364 11.0636C13.9676 10.8948 13.7387 10.8 13.5 10.8H5.77259L6.67259 9.89999H12.6C12.7671 9.8999 12.9309 9.8533 13.073 9.7654C13.2151 9.67749 13.3299 9.55177 13.4046 9.40229L16.1046 4.00229C16.1731 3.86512 16.2055 3.7127 16.1986 3.5595C16.1917 3.4063 16.1458 3.25741 16.0652 3.12695C15.9846 2.99649 15.872 2.88879 15.738 2.81406C15.6041 2.73934 15.4533 2.70008 15.3 2.69999H5.65199L5.37299 1.58129C5.32423 1.38667 5.21184 1.21392 5.05367 1.09048C4.8955 0.967046 4.70062 0.899999 4.49999 0.899994H2.69999ZM14.4 14.85C14.4 15.208 14.2578 15.5514 14.0046 15.8046C13.7514 16.0578 13.408 16.2 13.05 16.2C12.6919 16.2 12.3486 16.0578 12.0954 15.8046C11.8422 15.5514 11.7 15.208 11.7 14.85C11.7 14.492 11.8422 14.1486 12.0954 13.8954C12.3486 13.6422 12.6919 13.5 13.05 13.5C13.408 13.5 13.7514 13.6422 14.0046 13.8954C14.2578 14.1486 14.4 14.492 14.4 14.85ZM5.84999 16.2C6.20803 16.2 6.55141 16.0578 6.80458 15.8046C7.05776 15.5514 7.19999 15.208 7.19999 14.85C7.19999 14.492 7.05776 14.1486 6.80458 13.8954C6.55141 13.6422 6.20803 13.5 5.84999 13.5C5.49195 13.5 5.14857 13.6422 4.89539 13.8954C4.64222 14.1486 4.49999 14.492 4.49999 14.85C4.49999 15.208 4.64222 15.5514 4.89539 15.8046C5.14857 16.0578 5.49195 16.2 5.84999 16.2Z"
                            fill="#E8E8E2" />
                    </svg>
                </button>
            </div>
        </li>`;
      }
    )
    .join('');
  return markup;
}

function compareLocalSearchParams(search_params) {
  const keys = Object.keys(search_params);
  const local_search_params = getLocalSearchParams();
  for (const key of keys) {
    if (search_params[key] !== local_search_params[key]) {
      return false;
    }
  }
  return true;
}
