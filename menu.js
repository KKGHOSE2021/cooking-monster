const apiBase = 'https://www.themealdb.com/api/json/v1/1/search.php';

const getMealData = meal => {
    const url = `${apiBase}?f=${meal}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayAllMenu(data));                
}

const searchBtn = document.getElementById('search_button');
searchBtn.addEventListener('click', () => {    
    let inputMenu = document.getElementById('meal').value;
    getMealData(inputMenu);               
})


const displayAllMenu = allMenu =>{        
    const allMenuDiv = document.getElementById('all-menu');
    allMenuDiv.innerHTML = '';
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

const getIngredientsData = menuName =>{
    const url = `${apiBase}?s=${menuName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayMenuIngredients(data.meals[0]));
}

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

const listMenuIngredients = list => {
    let ingredients = '';
    for (let i = 1; i <= 10; i++) {        
       ingredients+= `<li>${list["strIngredient" + i]}</li>`;
    }   
    return ingredients;    
}


