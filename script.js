document.addEventListener('DOMContentLoaded', function () {
    
    fetch('/api/chart-data')
        .then(response => response.json())
        .then(data => {
            // Extract relevant data for chart
            const labels = data.map(entry => entry.createdAt);
            const energyConsumption = data.map(entry => entry.total_kwh);

           
            createChart(labels, energyConsumption);
        })
        .catch(error => console.error('Error fetching chart data:', error));

    // Function to create a chart
    function createChart(labels, data) {
        const ctx = document.getElementById('myChart').getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Energy Consumption',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    }
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const accessForm = document.getElementById('accessForm');

    // Event listener for form submission
    accessForm.addEventListener('submit', function (event) {
        event.preventDefault();

     
        const formData = new FormData(accessForm);
        const accessData = {};
        formData.forEach((value, key) => {
            accessData[key] = value;
        });

        
        fetch('/api/log-access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accessData),
        })
            .then(response => response.json())
            .then(updatedChartData => {
                
                createChart(updatedChartData);
            })
            .catch(error => console.error('Error logging access:', error));
    });

    
    function createChart(data) {
       
    }
});
