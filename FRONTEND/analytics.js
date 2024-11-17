document.addEventListener('DOMContentLoaded', async function() {
    // Function to fetch water data from Django backend
    async function fetchWaterData() {
        try {
            const response = await fetch('/api/water-data/');  // Adjust this URL to match your Django API endpoint
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.distance;  // Assuming your API returns an object with a 'distance' property
        } catch (error) {
            console.error('Error fetching water data:', error);
            return null;
        }
    }

    // Fetch initial data
    const initialDistance = await fetchWaterData();

    // Initialize chart
    const ctx = document.getElementById('waterLevelChart').getContext('2d');
    const waterLevelChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Current'],
            datasets: [{
                label: 'Water Level (cm)',
                data: [initialDistance || 0],  // Use fetched data or 0 if fetch failed
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
                        beginAtZero: true,
                        max: 100 // Assuming max water level is 100 cm
                    }
                }]
            }
        }
    });

    // Function to update chart with new data
    async function updateChart() {
        const newDistance = await fetchWaterData();
        if (newDistance !== null) {
            waterLevelChart.data.labels.push(new Date().toLocaleTimeString());
            waterLevelChart.data.datasets[0].data.push(newDistance);
            
            // Keep only the last 10 data points
            if (waterLevelChart.data.labels.length > 10) {
                waterLevelChart.data.labels.shift();
                waterLevelChart.data.datasets[0].data.shift();
            }
            
            waterLevelChart.update();
        }
    }

    // Update chart every 5 seconds
    setInterval(updateChart, 5000);

    // Function to check water level and update status
    async function checkWaterLevel() {
        const currentLevel = await fetchWaterData();
        const statusElement = document.getElementById('waterLevelStatus');

        if (currentLevel !== null) {
            if (currentLevel <= 50) {
                statusElement.textContent = "Critical! Water level is below safe threshold.";
                statusElement.className = "text-danger"; // Red text for critical alert
                showCriticalAlert();
            } else {
                statusElement.textContent = `Current Water Level is ${currentLevel} cm`;
                statusElement.className = "text-success"; // Green text for normal levels
            }
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