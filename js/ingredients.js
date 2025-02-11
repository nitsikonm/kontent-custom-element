// js/ingredients.js
var CustomElement;

(function() {
    var element;
    var ingredients = [];

    CustomElement = {
        init: function() {
            window.CustomElement.init((el) => {
                element = el;
                if (element.value) {
                    ingredients = JSON.parse(element.value);
                }
                renderIngredients();
                element.setHeight(400);
                
                // เพิ่ม event listener ที่นี่
                document.getElementById('add-ingredient')
                    .addEventListener('click', () => CustomElement.addIngredient());
            });
        },

        addIngredient: function() {
            ingredients.push({
                item: '',
                amount: 0,
                unit: '',
                note: ''
            });
            renderIngredients();
            updateValue();
        },

        updateIngredient: function(index, field, value) {
            ingredients[index][field] = value;
            updateValue();
        },

        removeIngredient: function(index) {
            ingredients.splice(index, 1);
            renderIngredients();
            updateValue();
        }
    };

    function renderIngredients() {
        const container = document.getElementById('ingredients-list');
        if (!container) return; // เพิ่มการตรวจสอบ
        
        container.innerHTML = '';
        
        ingredients.forEach((ingredient, index) => {
            const ingredientDiv = document.createElement('div');
            ingredientDiv.className = 'ingredient-item';
            ingredientDiv.innerHTML = `
                <input type="text" value="${ingredient.item || ''}" placeholder="Item" onchange="CustomElement.updateIngredient(${index}, 'item', this.value)">
                <input type="number" value="${ingredient.amount || 0}" placeholder="Amount" onchange="CustomElement.updateIngredient(${index}, 'amount', parseFloat(this.value))">
                <input type="text" value="${ingredient.unit || ''}" placeholder="Unit" onchange="CustomElement.updateIngredient(${index}, 'unit', this.value)">
                <input type="text" value="${ingredient.note || ''}" placeholder="Note" onchange="CustomElement.updateIngredient(${index}, 'note', this.value)">
                <button onclick="CustomElement.removeIngredient(${index})">Remove</button>
            `;
            container.appendChild(ingredientDiv);
        });
    }

    function updateValue() {
        element.setValue(JSON.stringify(ingredients));
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    CustomElement.init();
});