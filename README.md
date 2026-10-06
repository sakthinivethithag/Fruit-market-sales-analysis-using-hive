# 🍎 Fruit Market Sales Analysis Using Apache Hive

![Apache Hive](https://img.shields.io/badge/Apache%20Hive-Big%20Data-yellowgreen)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![Flask](https://img.shields.io/badge/Flask-Web%20Framework-black)
![Docker](https://img.shields.io/badge/Docker-Containerization-blue)
![HTML](https://img.shields.io/badge/HTML5-orange)
![CSS](https://img.shields.io/badge/CSS3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow)

## 📌 Project Overview

**Fruit Market Sales Analysis Using Apache Hive** is a Big Data analytics project developed to store, manage, and analyze fruit market sales data using **Apache Hive**.

The project collects and processes sales information such as fruit name, quantity, price, market, and sale date. Apache Hive is used as the data warehouse for storing and querying the sales data, while a **Flask-based web application** provides a simple and user-friendly interface for interacting with the data.

The application allows users to view sales records and dynamically filter the data based on different attributes.

---

# 🎯 Objectives

The main objectives of this project are:

- To understand the fundamentals of Big Data analytics.
- To use Apache Hive for storing and processing structured data.
- To perform data analysis using HiveQL.
- To analyze fruit sales across different markets.
- To analyze quantity and price information.
- To provide a web-based interface for accessing sales data.
- To connect a Flask application with Apache Hive.
- To implement dynamic filtering of sales records.
- To demonstrate the practical use of Docker for running Big Data services.

---

# 🛠️ Technologies Used

## Backend

- **Python**
- **Flask**

## Big Data Technologies

- **Apache Hive**
- **Hadoop**
- **HiveQL**

## Frontend

- **HTML5**
- **CSS3**
- **JavaScript**

## Containerization

- **Docker**

## Development Tools

- **Visual Studio Code**
- **Command Prompt**
- **Docker Desktop**
- **Web Browser**

---

# 🏗️ System Architecture

The project follows a simple web-based Big Data architecture.

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Web Interface     │
                    │ HTML / CSS / JS     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Flask Backend    │
                    │      Python         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Apache Hive      │
                    │      HiveQL         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Sales Dataset     │
                    │  Fruit Market Data  │
                    └─────────────────────┘

### Recommended GitHub repository structure

Your GitHub repository should look like this:

```text
📦 fruit-market-sales-analysis
│
├── 📄 README.md
├── 🐍 app.py
├── 📄 requirements.txt
│
├── 📁 templates
│   └── 📄 index.html
│
├── 📁 static
│   ├── 📁 css
│   │   └── 📄 style.css
│   └── 📁 js
│       └── 📄 script.js
│
└── 📁 hive
    └── 📄 hive_queries.sql
