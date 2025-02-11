var CustomElement = (function () {
    var element;
    var nutrition = {};
    const nutritionFields = [
        { key: 'energy', label: 'Energy', unit: 'kcal' },
        { key: 'carbohydrate', label: 'Carbohydrate', unit: 'g' },
        { key: 'protein', label: 'Protein', unit: 'g' },
        { key: 'fat', label: 'Fat', unit: 'g' },
        { key: 'fiber', label: 'Fiber', unit: 'g' },
        { key: 'vitamin_b', label: 'Vitamin B', unit: 'mg' },
        { key: 'vitamin_a', label: 'Vitamin A', unit: 'RE' },
        { key: 'sodium', label: 'Sodium', unit: 'mg' },
        { key: 'zinc', label: 'Zinc', unit: 'mg' },
        { key: 'calcium', label: 'Calcium', unit: 'mg' },
        { key: 'iron', label: 'Iron', unit: 'mg' },
        { key: 'sugar', label: 'Sugar', unit: 'g' }
    ];

    function init() {
        CustomElement.init((el) => {
            element = el;
            if (element.value) {
                nutrition = JSON.parse(element.value);
            }
            renderNutritionFacts();
            element.setHeight(600);
        });
    }

    function renderNutritionFacts() {
        const container = document.getElementById('nutrition-list');
        container.innerHTML = '';

        nutritionFields.forEach(field => {
            const fieldDiv = document.createElement('div');
            fieldDiv.className = 'nutrition-item';
            const value = nutrition[field.key]?.value || 0;

            fieldDiv.innerHTML = `
                <label>${field.label}</label>
                <input type="number" 
                       value="${value}" 
                       step="0.1" 
                       onchange="CustomElement.updateNutrition('${field.key}', this.value)">
                <span>${field.unit}</span>
            `;
            container.appendChild(fieldDiv);
        });
    }

    function updateNutrition(key, value) {
        if (!nutrition[key]) {
            nutrition[key] = {};
        }
        nutrition[key] = {
            label: nutritionFields.find(f => f.key === key).label,
            value: parseFloat(value),
            unit: nutritionFields.find(f => f.key === key).unit
        };
        updateValue();
    }

    function updateValue() {
        CustomElement.setValue(JSON.stringify(nutrition));
    }

    return {
        init: init,
        updateNutrition: updateNutrition
    };
})();

CustomElement.init();