var CustomElement = (function () {
    var element;
    var ingredients = [];

    function init(element) {
        // Initialize Custom Element
        CustomElement.init((el) => {
            element = el;
            // Load any value that is already saved
            if (element.value) {
                ingredients = JSON.parse(element.value);
                renderIngredients();
            }
            // Initialize the UI
            element.setHeight(400);
        });
    }

    function renderIngredients() {
        const container = document.getElementById('ingredients-list');
        container.innerHTML = '';

        ingredients.forEach((ingredient, index) => {
            const ingredientDiv = document.createElement('div');
            ingredientDiv.className = 'ingredient-item';
            ingredientDiv.innerHTML = `
                <input type="text" value="${ingredient.item}" placeholder="Item" onchange="updateIngredient(${index}, 'item', this.value)">
                <input type="number" value="${ingredient.amount}" placeholder="Amount" onchange="updateIngredient(${index}, 'amount', this.value)">
                <input type="text" value="${ingredient.unit}" placeholder="Unit" onchange="updateIngredient(${index}, 'unit', this.value)">
                <input type="text" value="${ingredient.note}" placeholder="Note" onchange="updateIngredient(${index}, 'note', this.value)">
                <button onclick="removeIngredient(${index})">Remove</button>
            `;
            container.appendChild(ingredientDiv);
        });
    }

    function addIngredient() {
        ingredients.push({
            item: '',
            amount: 0,
            unit: '',
            note: ''
        });
        renderIngredients();
        updateValue();
    }

    function updateIngredient(index, field, value) {
        ingredients[index][field] = value;
        updateValue();
    }

    function removeIngredient(index) {
        ingredients.splice(index, 1);
        renderIngredients();
        updateValue();
    }

    function updateValue() {
        CustomElement.setValue(JSON.stringify(ingredients));
    }

    return {
        init: init,
        addIngredient: addIngredient,
        updateIngredient: updateIngredient,
        removeIngredient: removeIngredient
    };
})();

// Initialize when the page loads
CustomElement.init();