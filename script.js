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
})
document.addEventListener("keydown",(e)=>{

})

// for view recipe
//  const recipeDiv=document.getElementById("recipes");
// //  const viewRecipe=document.querySelector(".viewRecipe");
//  const title=document.getElementById("title");
//  const popupCard=document.getElementById("popupCard")
//  const paragraph=document.getElementById("paragraph")
//  recipeDiv.addEventListener("click",(e)=>{
// if(e.target.classList.contains("viewRecipe")){
//     const id=e.target.dataset.id;
//     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
//     .then(response=>response.json())
//     .then(data=>{
//         const meal=data.meals[0]
//         title.innerText=meal.strMeal;
//         paragraph.innerText=meal.strInstructions;
//         popupCard.style.display="block"
//     })
// }
//  })