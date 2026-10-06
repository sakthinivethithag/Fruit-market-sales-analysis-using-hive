let fruitChart = null;
let marketChart = null;
let marketAnalysisChart = null;
let analysisFruitChart = null;
let analysisMarketChart = null;


// =====================================================
// NAVIGATION
// =====================================================

function showSection(sectionId, button) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");

    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    const titles = {
        dashboard: "Dashboard",
        fruits: "Fruits",
        markets: "Markets",
        analysis: "Sales Analysis",
        transactions: "Transactions"
    };

    document.getElementById("pageTitle").innerText =
        titles[sectionId];

    loadCurrentSection(sectionId);
}


// =====================================================
// HIVE CONNECTION STATUS
// =====================================================

async function checkHiveStatus() {

    try {

        const response = await fetch("/api/status");

        const data = await response.json();

        const dot = document.getElementById("statusDot");
        const text = document.getElementById("hiveStatus");

        if (data.status === "connected") {

            dot.style.color = "#22c55e";
            text.innerText = "Hive Connected";

        } else {

            dot.style.color = "#ef4444";
            text.innerText = "Hive Error";
        }

    } catch (error) {

        document.getElementById("statusDot").style.color =
            "#ef4444";

        document.getElementById("hiveStatus").innerText =
            "Hive Offline";
    }
}


// =====================================================
// DASHBOARD SUMMARY
// =====================================================

async function loadSummary() {

    try {

        const response = await fetch("/api/summary");

        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        document.getElementById("totalQuantity").innerText =
            Number(data.total_quantity).toLocaleString("en-IN") + " kg";

        document.getElementById("totalRevenue").innerText =
            "₹" + Number(data.total_revenue).toLocaleString("en-IN");

        document.getElementById("totalTransactions").innerText =
            data.total_transactions;

        document.getElementById("topFruit").innerText =
            data.top_fruit;

    } catch (error) {

        console.error("Summary error:", error);
    }
}


// =====================================================
// FRUIT CHART
// =====================================================

async function loadFruitChart() {

    try {

        const response =
            await fetch("/api/fruit-analysis");

        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        const labels =
            data.map(item => item.fruit);

        const quantities =
            data.map(item => item.quantity);

        if (fruitChart) {
            fruitChart.destroy();
        }

        fruitChart = new Chart(
            document.getElementById("fruitChart"),
            {
                type: "bar",

                data: {
                    labels: labels,

                    datasets: [{
                        label: "Quantity (kg)",
                        data: quantities
                    }]
                },

                options: {
                    responsive: true,

                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },

                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            }
        );

    } catch (error) {

        console.error("Fruit chart error:", error);
    }
}


// =====================================================
// DASHBOARD MARKET CHART
// =====================================================

async function loadMarketChart() {

    try {

        const response =
            await fetch("/api/market-analysis");

        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        const labels =
            data.map(item => item.market);

        const quantities =
            data.map(item => item.quantity);

        if (marketChart) {
            marketChart.destroy();
        }

        marketChart = new Chart(
            document.getElementById("marketChart"),
            {
                type: "pie",

                data: {
                    labels: labels,

                    datasets: [{
                        data: quantities
                    }]
                },

                options: {
                    responsive: true
                }
            }
        );

    } catch (error) {

        console.error("Market chart error:", error);
    }
}


// =====================================================
// FRUIT TABLE
// =====================================================

async function loadFruitSales() {

    try {

        const fruit =
            document.getElementById("fruitFilter").value;

        const params = new URLSearchParams();

        if (fruit) {
            params.append("fruit", fruit);
        }

        const response =
            await fetch("/api/sales?" + params.toString());

        const data = await response.json();

        const tbody =
            document.getElementById("fruitTableBody");

        tbody.innerHTML = "";

        data.forEach(row => {

            tbody.innerHTML += `
                <tr>
                    <td>${row.id}</td>
                    <td>${row.fruit}</td>
                    <td>${row.quantity} kg</td>
                    <td>₹${row.price}</td>
                    <td>${row.market}</td>
                    <td>${row.sale_date}</td>
                </tr>
            `;
        });

    } catch (error) {

        console.error("Fruit table error:", error);
    }
}


// =====================================================
// MARKET ANALYSIS CHART
// =====================================================

async function loadMarketAnalysisChart() {

    try {

        const response =
            await fetch("/api/market-analysis");

        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        const labels =
            data.map(item => item.market);

        const quantities =
            data.map(item => item.quantity);

        if (marketAnalysisChart) {
            marketAnalysisChart.destroy();
        }

        marketAnalysisChart = new Chart(
            document.getElementById("marketAnalysisChart"),
            {
                type: "bar",

                data: {
                    labels: labels,

                    datasets: [{
                        label: "Quantity (kg)",
                        data: quantities
                    }]
                },

                options: {
                    responsive: true,

                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },

                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            }
        );

    } catch (error) {

        console.error("Market analysis chart error:", error);
    }
}


// =====================================================
// MARKET TABLE
// =====================================================

async function loadMarketSales() {

    try {

        await loadMarketAnalysisChart();

        const market =
            document.getElementById("marketFilter").value;

        const params = new URLSearchParams();

        if (market) {
            params.append("market", market);
        }

        const response =
            await fetch("/api/sales?" + params.toString());

        const data = await response.json();

        const tbody =
            document.getElementById("marketTableBody");

        tbody.innerHTML = "";

        data.forEach(row => {

            tbody.innerHTML += `
                <tr>
                    <td>${row.id}</td>
                    <td>${row.fruit}</td>
                    <td>${row.quantity} kg</td>
                    <td>₹${row.price}</td>
                    <td>${row.market}</td>
                    <td>${row.sale_date}</td>
                </tr>
            `;
        });

    } catch (error) {

        console.error("Market table error:", error);
    }
}


// =====================================================
// SALES ANALYSIS
// =====================================================

async function loadAnalysis() {

    try {

        const fruitResponse =
            await fetch("/api/fruit-analysis");

        const fruitData =
            await fruitResponse.json();

        const marketResponse =
            await fetch("/api/market-analysis");

        const marketData =
            await marketResponse.json();


        // Fruit chart

        if (analysisFruitChart) {
            analysisFruitChart.destroy();
        }

        analysisFruitChart = new Chart(
            document.getElementById("analysisFruitChart"),
            {
                type: "bar",

                data: {
                    labels:
                        fruitData.map(item => item.fruit),

                    datasets: [{
                        label: "Quantity (kg)",

                        data:
                            fruitData.map(item => item.quantity)
                    }]
                },

                options: {
                    responsive: true,

                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }
        );


        // Market chart

        if (analysisMarketChart) {
            analysisMarketChart.destroy();
        }

        analysisMarketChart = new Chart(
            document.getElementById("analysisMarketChart"),
            {
                type: "bar",

                data: {
                    labels:
                        marketData.map(item => item.market),

                    datasets: [{
                        label: "Quantity (kg)",

                        data:
                            marketData.map(item => item.quantity)
                    }]
                },

                options: {
                    responsive: true,

                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }
        );

    } catch (error) {

        console.error("Analysis error:", error);
    }
}


// =====================================================
// ALL TRANSACTIONS
// =====================================================

async function loadTransactions() {

    try {

        const search =
            document.getElementById("searchInput").value;

        const fromDate =
            document.getElementById("fromDate").value;

        const toDate =
            document.getElementById("toDate").value;


        const params = new URLSearchParams();

        if (search) {
            params.append("search", search);
        }

        if (fromDate) {
            params.append("from_date", fromDate);
        }

        if (toDate) {
            params.append("to_date", toDate);
        }


        const response =
            await fetch("/api/sales?" + params.toString());

        const data = await response.json();

        const tbody =
            document.getElementById("transactionTableBody");

        tbody.innerHTML = "";


        data.forEach(row => {

            tbody.innerHTML += `
                <tr>
                    <td>${row.id}</td>
                    <td>${row.fruit}</td>
                    <td>${row.quantity} kg</td>
                    <td>₹${row.price}</td>
                    <td>${row.market}</td>
                    <td>${row.sale_date}</td>
                </tr>
            `;
        });

    } catch (error) {

        console.error("Transaction error:", error);
    }
}


// =====================================================
// CLEAR FILTERS
// =====================================================

function clearFilters() {

    document.getElementById("searchInput").value = "";

    document.getElementById("fromDate").value = "";

    document.getElementById("toDate").value = "";

    loadTransactions();
}


// =====================================================
// LOAD CURRENT SECTION
// =====================================================

async function loadCurrentSection(sectionId) {

    if (sectionId === "dashboard") {

        await loadSummary();
        await loadFruitChart();
        await loadMarketChart();

    }

    else if (sectionId === "fruits") {

        await loadFruitSales();

    }

    else if (sectionId === "markets") {

        await loadMarketSales();

    }

    else if (sectionId === "analysis") {

        await loadAnalysis();

    }

    else if (sectionId === "transactions") {

        await loadTransactions();

    }
}


// =====================================================
// COMPLETE WEBSITE UPDATE
// =====================================================

async function autoUpdate() {

    console.log("Updating data from Hive...");

    await checkHiveStatus();

    await loadSummary();

    await loadFruitChart();

    await loadMarketChart();

    const activeSection =
        document.querySelector(".section.active");

    if (activeSection) {

        await loadCurrentSection(
            activeSection.id
        );
    }

    console.log("Website data updated successfully.");
}


// =====================================================
// MANUAL REFRESH
// =====================================================

async function refreshData() {

    const button =
        document.querySelector(".refresh-btn");

    if (button) {

        button.innerText = "⏳ Refreshing...";

        button.disabled = true;
    }

    await autoUpdate();

    if (button) {

        button.innerText = "🔄 Refresh Data";

        button.disabled = false;
    }
}


// =====================================================
// INITIAL LOAD
// =====================================================

window.onload = async function () {

    await autoUpdate();

    // Automatically update every 30 seconds
    setInterval(autoUpdate, 30000);

};