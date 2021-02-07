const apiBase = 'https://www.themealdb.com/api/json/v1/1/search.php';

const getMealData = meal => {
    const url = `${apiBase}?f=${meal}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayAllMenu(data.meals));                
}

const searchBtn = document.getElementById('search_button');
searchBtn.addEventListener('click', () => {    
    let inputCity = document.getElementById('meal').value;
    getMealData(inputCity);               
})


const displayAllMenu = allMenu =>{ 
    document.getElementById('all-menu').innerHTML = "";   
    const allMenuDiv = document.getElementById('all-menu');
    allMenu.forEach(singleMenu => {
        const singleMenuDiv = document.createElement('div');
        singleMenuDiv.className = 'single-menu';
        const menuInfo = `
        <img class="menu-img rounded" src="${singleMenu.strMealThumb}">
        <h5 class="menu-name text-center">${singleMenu.strMeal}</h5>
        
        `;
        singleMenuDiv.innerHTML = menuInfo;       
        allMenuDiv.appendChild(singleMenuDiv);  
                                            
        // singleMenuDiv.onclick="displaySingleMenu()";      
    });
}

/* <button onclick="displaySingleMenu('${singleMenu.strMeal}')">Details</button> */

const displaySingleMenu = singleMenu => {
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayAllMenu(data.meals));  
}


const renderMenuInfo = menu =>{
    const menuDiv = document.getElementById('menuDetail');
    menuDiv.innerHTML = `
    <h1>${singleMenu.strMeal}</h1>
    <p>${singleMenu.strIngredient}</p>
    <img src="${singleMenu.strMealThumb}">
    `
}

