const allProduct = (query) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            .then((res) =>res.json())
            .then((data) => {
                if(data.meals){
                    serialProduct(data);
                }
                else{
                    noResult();
                }
            });
};
const serialProduct = (product) => {
    const container = document.getElementById("content");
    container.innerHTML="";
    
    product.meals.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("element");

        div.innerHTML = `
            <img class="food-img" src="${element.strMealThumb}"/>
            <h3>${element.strMeal}</h3>
            <h5>${element.strArea}</h5>
            <p>${element.strInstructions.slice(0,45)}</p>
            `;
        div.addEventListener("click",() => food(element.idMeal));
        container.appendChild(div); 
    });
};

const noResult = () => {
    document.getElementById("content").innerHTML = "<h3>No meals found</h3>";
};

document.getElementById("btn").addEventListener("click", () => {
    const query = document.getElementById("search-box").value
    if(query){
        allProduct(query);
    }
    else{
        document.getElementById("content").innerHTML = "<p>Please enter a search term.</p>";
    }
});

const food = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) =>res.json())
    .then((element) => {
        console.log(element)
        const food_details = document.getElementById("details")
        food_details.innerHTML = "";
        const div = document.createElement("div");
        div.classList.add("details-content");

        div.innerHTML = `
            <img class="food-img" src="${element.meals[0].strMealThumb}"/>
            <h3>${element.meals[0].strMeal}</h3>
            <h5>${element.meals[0].strArea}</h5>
            <p>${element.meals[0].strInstructions.slice(0,100)}</p>
            `;
        food_details.appendChild(div);    
    });
}
