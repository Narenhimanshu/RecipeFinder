function searchRecipes(){
    const searchInput=document.getElementById("searchInput").value;
    const recipesDiv=document.getElementById("recipes");
    const notFoundDiv=document.getElementById("notFound");

    // clear previous result
    recipesDiv.innerHTML='';
    notFoundDiv.style.display='none'

    if(searchInput.trim()===''){
        notFoundDiv.innerHTML="Please enter the Recipe name to search!"
        notFoundDiv.style.display='block'
        return;
    }

    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response=>response.json())
    .then(data=> {
        if(!data.meals){
            notFoundDiv.innerHTML='Recipe not found ,please try another search !'
            notFoundDiv.style.display='block';
        }
         else{
            data.meals.forEach(meal => {
                const card=document.createElement('div');
                card.classList.add('recipe-card');

                card.innerHTML=`
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strCategory}</p>
                <p>${meal.strArea}</p>
                <button onclick="viewRecipes('${meal.idMeal}')">View Recipes</button>
                `;
                recipesDiv.appendChild(card);     
            });
    }
    })
}

// view recipe

function viewRecipes(mealId){
    const popupCard = document.getElementById("popupCard");
    const recipeTitle = document.getElementById("recipeTitle");
    const recipeDetails = document.getElementById("recipeDetails");

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)

    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];

        recipeTitle.innerText = meal.strMeal;
        recipeDetails.innerText = meal.strInstructions;

        popupCard.style.display = 'block';
    })
    .catch(error => {
        console.log("Error fetching recipe:", error);
    });
}

// close btn
function closeRecipe(){
    document.getElementById("popupCard").style.display='none';
}

// enter
const searchInput=document.getElementById("searchInput");
searchInput.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        searchRecipes();
    }
})