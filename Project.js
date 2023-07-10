// Constants
const apiKey = '8e826273fdc444dcb5767971fedf8f3d';
const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';

// DOM elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const recipesContainer = document.getElementById('recipes');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('comments');

// Event listener for form submission - Search recipes
searchForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  const searchTerm = searchInput.value;
  
  // Clear previous results
  recipesContainer.innerHTML = '';
  
  // Fetch recipes
  fetchRecipes(searchTerm);
});

// Event listener for form submission - Add comment
commentForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  const commentText = commentInput.value;
  
  // Add comment
  addComment(commentText);
  
  // Clear comment input
  commentInput.value = '';
});

// Fetch recipes from the API
function fetchRecipes(searchTerm) {
  const url = `${apiUrl}?apiKey=${apiKey}&query=${searchTerm}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const recipes = data.results;
      
      // Display each recipe
      recipes.forEach(recipe => {
        displayRecipe(recipe);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Display a recipe card
function displayRecipe(recipe) {
  const recipeCard = document.createElement('div');
  recipeCard.className = 'recipe-card';
  
  const title = document.createElement('h3');
  title.textContent = recipe.title;
  
  const image = document.createElement('img');
  image.src = recipe.image;
  
  const summary = document.createElement('p');
  summary.innerHTML = recipe.summary;
  
  const link = document.createElement('a');
  link.href = recipe.sourceUrl;
  link.textContent = 'View Recipe';
  link.className = 'link';
  
  recipeCard.appendChild(title);
  recipeCard.appendChild(image);
  recipeCard.appendChild(summary);
  recipeCard.appendChild(link);
  
  recipesContainer.appendChild(recipeCard);
}

// Add a comment
function addComment(comment) {
  const commentItem = document.createElement('li');
  commentItem.textContent = comment;
  
  commentsList.appendChild(commentItem);
}
