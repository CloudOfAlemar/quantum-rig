document.addEventListener('DOMContentLoaded', function() {
    // Handle the addition of parts
    document.querySelectorAll('.pc-part-btn').forEach(button => {
        button.addEventListener('click', function() {
            const partName = this.getAttribute('data-part-name');
            const partCategory = this.getAttribute('data-part-category');
            const card = this.closest('.pc-part-card');
            const partSelected = card.querySelector('.part-selected');

            partSelected.textContent = partName;
            partSelected.setAttribute('data-part-name', partName);
            partSelected.setAttribute('data-part-category', partCategory);
        });
    });

    // Handle form submission
    document.getElementById('pc-build-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Capture form data
        const buildName = document.getElementById('build-name').value;
        const buildComments = document.getElementById('build-comments').value;
        
        // Gather selected parts
        const pcPartsList = [];
        document.querySelectorAll('.pc-part-card').forEach(card => {
            const partName = card.querySelector('.part-selected').getAttribute('data-part-name');
            const partCategory = card.querySelector('.part-selected').getAttribute('data-part-category');
            if (partName) {
                pcPartsList.push({
                    name: partName,
                    category: partCategory
                });
            }
        });

        // Construct JSON object
        const formData = {
            id: generateUniqueId(),
            name: buildName,
            email: '', // Assume you add an email field if needed
            pcPartsList: pcPartsList,
            comments: buildComments
        };

        // Send data to server
        fetch('/saveForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    // Example function to generate a unique ID
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
});
