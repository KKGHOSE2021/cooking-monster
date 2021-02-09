
// Fixed API Link
const apiBase = 'https://www.themealdb.com/api/json/v1/1/search.php';

const getMealData = meal => {
    const url = `${apiBase}?f=${meal}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayAllMenu(data));                
}


// Fetch search query text
const searchBtn = document.getElementById('search_button');
searchBtn.addEventListener('click', () => {    
    let inputMenu = document.getElementById('meal').value;
    getMealData(inputMenu);               
})


// Display All menu from API based on search query
const displayAllMenu = allMenu =>{        
    const allMenuDiv = document.getElementById('all-menu'); 
    allMenuDiv.innerHTML = '';
    document.getElementById('ingredient-container').innerHTML = '';
    allMenu.meals.forEach(singleMenu => {
        const {strMeal, strMealThumb} = singleMenu;
        const singleMenuDiv = document.createElement('div');
        singleMenuDiv.className = 'single-menu';
        singleMenuDiv.innerHTML = `
        <div class="menu-display" onclick="getIngredientsData('${strMeal}')">
        <img class="menu-img rounded" src="${strMealThumb}">
        <h5 class="menu-name text-center">${strMeal}</h5> 
        </div>         
        `;     
        allMenuDiv.appendChild(singleMenuDiv);

    });
}


// Fetch ingredients data for selected menu
const getIngredientsData = menuName =>{
    const url = `${apiBase}?s=${menuName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayMenuIngredients(data.meals[0]));
}

// List ingredients from API
const listMenuIngredients = list => {    
    let ingredients = '';
    for (let i = 1; i <= 10; i++){
        objectStr = list["strIngredient" + i];
            if (objectStr !=="" && objectStr !==null ) { 
                ingredients += `<li>${objectStr[0].toUpperCase() + objectStr.substring(1)}</li>`;  
            }  
    }  
    return ingredients;  
}

// Display ingredients on selected menu
const displayMenuIngredients = getMenu => {
    const {strMeal, strMealThumb} = getMenu;
    const menuIngredients = document.getElementById('ingredient-container');    
    menuIngredients.innerHTML = `
    <div class="meal-ingredients">
    <img class="menu-img rounded" src="${strMealThumb}">
    <div class="ingredients">
    <h3>${strMeal}</h3>
    <h5>List of Ingredients</h5>
    <ul>${listMenuIngredients(getMenu)}</ul>
    </div>
    </div>
    `;
}

