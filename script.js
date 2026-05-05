const searchBtn=document.getElementById("searchBtn")

searchBtn.addEventListener("click",()=>{
    const searchInputBox=document.getElementById("searchInput").value;
    const recipeDiv=document.getElementById("recipes");
const notFoundDiv=document.getElementById("notFound");

// previoud data 
notFoundDiv.innerHTML="";
recipeDiv.innerHTML="";

if(searchInputBox.trim()===""){
    alert("Please Search you recipe")
    recipeDiv.style.display=""
    return;
}
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputBox}`)
  .then(response=>response.json())
  .then(data=>{
    if(!data.meals){
        notFoundDiv.innerHTML="not found"
        notFoundDiv.style.display="block"
    } else{
        data.meals.forEach(meal => {
            const card=document.createElement("div");
            card.classList.add("recipe-card")
            card.innerHTML=`
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strCategory}</p>
            <button  class="viewRecipe" data-id="${meal.idMeal}">View Recipe</button>
            `;
            recipeDiv.appendChild(card)
        });
        
    }
  })
});

// enter press
document.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        searchBtn.click();
    }
});