document.addEventListener('DOMContentLoaded', function() {
    // Game state
    const gameState = {
        area: '',
        technology: '',
        specialization: '',
        additionalTech: []
    };

    // Helper function to show a specific screen
    function showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show the requested screen
        document.getElementById(screenId).classList.add('active');
    }

    // Start button
    document.getElementById('start-btn').addEventListener('click', function() {
        showScreen('area-selection');
    });

    // Area selection
    document.getElementById('frontend-btn').addEventListener('click', function() {
        gameState.area = 'Front-End';
        showScreen('frontend-tech');
    });

    document.getElementById('backend-btn').addEventListener('click', function() {
        gameState.area = 'Back-End';
        showScreen('backend-tech');
    });

    // Frontend technology selection
    document.getElementById('react-btn').addEventListener('click', function() {
        gameState.technology = 'React';
        showScreen('specialization');
    });

    document.getElementById('vue-btn').addEventListener('click', function() {
        gameState.technology = 'Vue';
        showScreen('specialization');
    });

    // Backend technology selection
    document.getElementById('csharp-btn').addEventListener('click', function() {
        gameState.technology = 'C#';
        showScreen('specialization');
    });

    document.getElementById('java-btn').addEventListener('click', function() {
        gameState.technology = 'Java';
        showScreen('specialization');
    });

    // Specialization choice
    document.getElementById('specialize-btn').addEventListener('click', function() {
        gameState.specialization = 'especializarme';
        showScreen('more-tech');
    });

    document.getElementById('fullstack-btn').addEventListener('click', function() {
        gameState.specialization = 'Fullstack';
        showScreen('more-tech');
    });

    // Add technology
    document.getElementById('add-tech-btn').addEventListener('click', function() {
        const techInput = document.getElementById('new-tech');
        const techName = techInput.value.trim();
        
        if (techName) {
            gameState.additionalTech.push(techName);
            
            // Create tech item element
            const techList = document.getElementById('tech-list');
            const techItem = document.createElement('div');
            techItem.className = 'tech-item';
            
            const techNameSpan = document.createElement('span');
            techNameSpan.className = 'tech-name';
            techNameSpan.textContent = techName;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Eliminar';
            removeBtn.addEventListener('click', function() {
                // Remove from state
                const index = gameState.additionalTech.indexOf(techName);
                if (index > -1) {
                    gameState.additionalTech.splice(index, 1);
                }
                
                // Remove from DOM
                techItem.remove();
            });
            
            techItem.appendChild(techNameSpan);
            techItem.appendChild(removeBtn);
            techList.appendChild(techItem);
            
            // Clear input
            techInput.value = '';
        }
    });

    // Finish button
    document.getElementById('finish-btn').addEventListener('click', function() {
        showResults();
    });

    // Show results
    function showResults() {
        const resultContent = document.getElementById('result-content');
        let resultHTML = '';
        
        if (gameState.specialization === 'especializarme') {
            resultHTML += `<p>¡Genial! Has decidido especializarte en <strong>${gameState.technology}</strong> para ser un experto en <strong>${gameState.area}</strong>.</p>`;
        } else {
            resultHTML += `<p>¡Excelente elección! Has decidido convertirte en un desarrollador <strong>Fullstack</strong>, comenzando con <strong>${gameState.technology}</strong> en el área de <strong>${gameState.area}</strong>.</p>`;
        }
        
        if (gameState.additionalTech.length > 0) {
            resultHTML += `<p>Además, te interesa aprender las siguientes tecnologías:</p><ul>`;
            gameState.additionalTech.forEach(tech => {
                resultHTML += `<li>${tech}</li>`;
            });
            resultHTML += `</ul>`;
        }
        
        resultHTML += `<p>¡Sigue aprendiendo y creciendo en el mundo de la programación!</p>`;
        
        resultContent.innerHTML = resultHTML;
        showScreen('result');
    }

    // Restart button
    document.getElementById('restart-btn').addEventListener('click', function() {
        // Reset game state
        gameState.area = '';
        gameState.technology = '';
        gameState.specialization = '';
        gameState.additionalTech = [];
        
        // Clear tech list
        document.getElementById('tech-list').innerHTML = '';
        
        // Go back to start
        showScreen('welcome-screen');
    });

    // Enter key for adding technology
    document.getElementById('new-tech').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('add-tech-btn').click();
        }
    });
});