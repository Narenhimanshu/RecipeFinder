const searchBtn=document.getElementById("searchBtn")

searchBtn.addEventListener("click",async function(){
    const searchInputBox=document.getElementById("searchInput").value;
    const recipeDiv=document.getElementById("recipes");
const notFoundDiv=document.getElementById("notFound");

// previoud data 
notFoundDiv.innerText="";
recipeDiv.innerText="";


if(searchInputBox.trim()===""){
    alert("Please Search you recipe")
    recipeDiv.style.display=""
    return;
} else{
    notFoundDiv.innerText="Searching..."
   
}
notFoundDiv.innerText="";
try {
    const response=await  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputBox}`);
    const data=await response.json();
    if(!data.meals){
        notFoundDiv.innerText="Not Found"
    } else{
        data.meals.forEach(meal => {
            const card=document.createElement("div");
            card.classList.add("recipe-card")
            card.innerHTML=`
            <img src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strCategory}</p>
            <button class="viewRecipe">View Recipe</button>
            `;
            recipeDiv.appendChild(card)
        });
    }
} catch (error) {
    recipeDiv.innerText="Somethings Error"
}
 
  
});

// enter press
document.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        searchBtn.click();
    }
});