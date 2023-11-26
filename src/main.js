//-----------------------FILTERS------------------------
async function getCategories() {
  try {
    const response = await fetch(
      'https://food-boutique.b.goit.study/api/products/categories'
    );
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

async function populateCategories() {
  const categoryList = document.getElementById('categoryList');
  categoryList.innerHTML = '';
  const categories = await getCategories();

  if (categories) {
    categories.forEach(category => {
      const listItem = document.createElement('li');
      listItem.textContent = category;
      listItem.addEventListener('click', selectCategory);
      categoryList.appendChild(listItem);
    });
  }
}

function toggleCategoryList() {
  var categoryList = document.getElementById('categoryList');
  categoryList.classList.toggle('show');
}

function selectCategory(e) {
  var selectedCategory = e.target.textContent;
  document.getElementById('categorySelect').value = selectedCategory;
  toggleCategoryList();
}

populateCategories();
//-----------------------FILTERS------------------------
