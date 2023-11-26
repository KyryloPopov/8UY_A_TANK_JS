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

async function getProductsByCategory(categoryId) {
  try {
    const response = await fetch(
      `https://food-boutique.b.goit.study/api/products?category=${categoryId}`
    );
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

async function fetchData() {
  const categories = await getCategories();
  const categoryId = categories[0]?.id;
  const products = await getProductsByCategory(categoryId);

  console.log('Categories:', categories);
  console.log('Products in the first category:', products);
}

fetchData();
