var CustomElement = (function () {
    var element;
    var herbs = [];

    function init() {
        CustomElement.init((el) => {
            element = el;
            if (element.value) {
                herbs = JSON.parse(element.value);
            }
            renderHerbs();
            element.setHeight(400);

            document.getElementById('add-herb').addEventListener('click', addHerb);
        });
    }

    function renderHerbs() {
        const container = document.getElementById('herbs-list');
        container.innerHTML = '';

        herbs.forEach((herb, index) => {
            const herbDiv = document.createElement('div');
            herbDiv.className = 'herb-item';
            herbDiv.innerHTML = `
                <input type="text" value="${herb.herb || ''}" 
                       placeholder="Herb Name" 
                       onchange="CustomElement.updateHerb(${index}, 'herb', this.value)">
                <textarea placeholder="Benefits" 
                          onchange="CustomElement.updateHerb(${index}, 'benefit', this.value)">${herb.benefit || ''}</textarea>
                <button onclick="CustomElement.removeHerb(${index})">Remove</button>
            `;
            container.appendChild(herbDiv);
        });
    }

    function addHerb() {
        herbs.push({
            herb: '',
            benefit: ''
        });
        renderHerbs();
        updateValue();
    }

    function updateHerb(index, field, value) {
        herbs[index][field] = value;
        updateValue();
    }

    function removeHerb(index) {
        herbs.splice(index, 1);
        renderHerbs();
        updateValue();
    }

    function updateValue() {
        CustomElement.setValue(JSON.stringify(herbs));
    }

    return {
        init: init,
        addHerb: addHerb,
        updateHerb: updateHerb,
        removeHerb: removeHerb
    };
})();

CustomElement.init();