let buttons = document.querySelectorAll('.btn-custome');

        // Loop through each button and add an event listener
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                alert('Button clicked: ' + button.textContent);
            });
        });