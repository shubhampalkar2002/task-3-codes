const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chartDataDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema and model
const chartDataSchema = new mongoose.Schema({
    createdAt: String,
    total_kwh: Number,
});

const ChartData = mongoose.model('ChartData', chartDataSchema);

// API endpoint to fetch chart data
app.get('/api/chart-data', async (req, res) => {
    try {
        const data = await ChartData.find({}, { _id: 0, __v: 0 });
        res.json(data);
    } catch (error) {
        console.error('Error fetching chart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const chartDataSchema = new mongoose.Schema({
    createdAt: String,
    total_kwh: Number,
    // Add new fields for logging access
    access_time: String,
    access_date: Date,
    employee_name: String,
    filter: String,
});

const ChartData = mongoose.model('ChartData', chartDataSchema);


app.post('/api/log-access', async (req, res) => {
    const { access_time, access_date, employee_name, filter } = req.body;

    try {
        // Update the chart data based on the filter (replace this with your logic)
        const updatedChartData = await ChartData.find({ filter });

        // Reflect the updated data in the frontend
        res.json(updatedChartData);

        // Store the log of access_time, access_date, etc., in a collection
        await ChartData.create({
            access_time,
            access_date,
            employee_name,
            filter,
        });
    } catch (error) {
        console.error('Error logging access:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

