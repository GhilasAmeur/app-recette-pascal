
// git add .
// git commit -m "Ajout de la fonction de recherche de recettes"
// git push


const recette = "chicken" //recette par défault
const boutton = document.getElementById("btn")
const container = document.getElementById("container")

container.addEventListener("click", (e) => {

if (e.target.tagName === "IMG") {
  const id = e.target.closest(".card").dataset.id;

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(data => data.json())
    .then(data => {

      const container = document.getElementById("container");
      container.innerHTML = "";

      const meal = data.meals[0];
      let navbar = document.getElementById("navbar")

      const div = document.createElement("div");
      div.classList.add("btn", "btn-success");
         
      const btnRetour = document.createElement("button");
      btnRetour.classList.add("btn", "btn-secondary", "mt-3")
      btnRetour.textContent = "Retour";

      div.textContent = `La recette de ${meal.strMeal} est :`;
      container.appendChild(div);
      div.appendChild(btnRetour);

      const ul = document.createElement("ul");
      ul.classList.add("list-group");
      container.appendChild(ul);
     

// Action du bouton
btnRetour.addEventListener("click", () => {
  appelApii(recette);
  navbar.style.display = "block";   
});


      for (let i = 1; i <= 20; i++) {

        const ingredient = meal[`strIngredient${i}`];
        const mesure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "" && mesure && mesure.trim() !== "") {
          navbar.style.display = "none"
          const li = document.createElement("li");

          li.classList.add("list-group-item");
          li.textContent = `${ingredient} : ${mesure}`;
          ul.appendChild(li);
          // container.appendChild(boutton)
        }
      }
    });
}

  
})

boutton.addEventListener("click", function (e) {
  e.preventDefault()

  const inputRecette = document.getElementById("input") //je recupère la rectete sasie par l'utilisateur
  console.log(inputRecette.value)
  appelApii(inputRecette.value)//on passe la recettte à rechercher
  inputRecette.value = ""


})

function appelApii(inputRecette) {

  const container = document.getElementById("container")
  container.innerHTML = ""

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=` + inputRecette)
    .then(data => data.json())
    .then(data => {

      if (!data.meals) { container.innerHTML = `<p class="text-danger">Aucun contenu trouvé</p>`; }

      console.log(data.meals)

      const div1 = document.createElement("div");
      div1.classList.add("row", "g-3");

      data.meals.forEach(element => {

        const div2 = document.createElement("div");
        div2.classList.add("col-4");
        const div3 = document.createElement("div");
        div3.classList.add("card");
        div3.dataset.id = element.idMeal



        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = element.strMealThumb

        const div4 = document.createElement("div")
        div4.classList.add("card-body")

        const h5 = document.createElement("h5")
        h5.classList.add("card-title")
        h5.innerText = element.strMeal

        const p1 = document.createElement("p")
        p1.classList.add("card-text")
        p1.innerText = element.strInstructions.slice(0, 150) + "..."

        const p2 = document.createElement("p")


        const a = document.createElement("a")
        a.classList.add("link-opacity-60",)
        a.innerText = "lire la suite.."

        div4.appendChild(h5)
        div4.appendChild(p1)
        div3.appendChild(img);
        div3.appendChild(div4)
        div2.appendChild(div3);
        div1.appendChild(div2);
        p2.appendChild(a)
        div3.appendChild(p2)

      })
      container.appendChild(div1);
    }).catch(err => console.error("Erreur de fetch :", err))
}



appelApii(recette)