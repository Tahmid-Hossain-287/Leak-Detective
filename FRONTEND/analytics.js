document.addEventListener('DOMContentLoaded', function() {

    // Initialize chart
    const ctx = document.getElementById('waterLevelChart').getContext('2d');
    const waterLevelChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 10}, (_, i) => `Point ${i + 1}`),
            datasets: [{
                label: 'Water Level (cm)',
                data: Array.from({length: 10}, () => Math.floor(Math.random() * (100 - 20 + 1)) + 20), // Random data between 20 and 100 cm
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                fill: true,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: { 
                        beginAtZero:true,
                        max :100 // Assuming max water level is 100 cm
                    }
                }]
            }
        }
    });
 
    // Function to check water level and update status
    function checkWaterLevel() {
        const currentLevel = Math.floor(Math.random() * (100 - 20 + 1)) + 20; // Simulate current water level
        const statusElement = document.getElementById('waterLevelStatus');
 
        if (currentLevel <= 50) {
            statusElement.textContent = "Critical! Water level is below safe threshold.";
            statusElement.className = "text-danger"; // Red text for critical alert
            showCriticalAlert();
        } else {
            statusElement.textContent = `Current Water Level is ${currentLevel} cm`;
            statusElement.className = "text-success"; // Green text for normal levels
        }
    }
 
    // Show critical alert overlay
    function showCriticalAlert() {
        const overlay = document.getElementById('criticalAlertOverlay');
        overlay.classList.add('active'); // Add active class to show overlay
 
        // Optional auto-dismiss after a few seconds
        setTimeout(() => overlay.classList.remove('active'), 10000); // Dismiss after 10 seconds
    }
 
    // Check water level every few seconds
    setInterval(checkWaterLevel, 5000); // Check every 5 seconds
 
    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
 
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
 
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior:'smooth' });
    });
 });