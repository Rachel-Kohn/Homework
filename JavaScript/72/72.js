'use strict';

(async function () {
    const recipeSelect = document.getElementById('recipeSelect');
    const recipeDiv = document.getElementById('recipe');
    const recipeName = document.getElementById('recipeName');
    const recipeImage = document.getElementById('recipeImage');
    const ingredientsList = document.getElementById('ingredients');
    const directions = document.getElementById('directions');

    //Get the recipe list
    async function getRecipeList() {
        try {
            const response = await fetch('72.json');
            if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error('Error getting recipe list:', error);
            return [];
        }
    }

    //Get recipe
    async function getRecipe(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error('Error getting recipe:', error);
            return null;
        }
    }

    //Dropdown with recipes
    const recipeList = await getRecipeList();
    recipeList.forEach(r => { 
        const option = document.createElement('option');
        option.value = r.file; 
        option.textContent = r.name;
        recipeSelect.appendChild(option);
    });

    //When selected recipe
    recipeSelect.addEventListener('change', async function () {
        const selectedFile = recipeSelect.value; 
        if (!selectedFile) {
            recipeDiv.style.display = 'none';
            return;
        }

        const recipeData = await getRecipe(selectedFile);
        if (!recipeData) return;

        recipeName.textContent = recipeData.name;
        recipeImage.src = recipeData.image;
        recipeImage.alt = recipeData.name;

        ingredientsList.innerHTML = '';
        recipeData.ingredients.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ingredientsList.appendChild(li);
        });

        directions.textContent = recipeData.directions;
        recipeDiv.style.display = 'block';
    });
})();