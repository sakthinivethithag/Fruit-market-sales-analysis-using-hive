from flask import Flask, jsonify, render_template, request
from pyhive import hive

app = Flask(__name__)


# ----------------------------------------
# Hive Connection
# ----------------------------------------
def get_hive_connection():
    return hive.Connection(
        host="localhost",
        port=10000,
        username="hive",
        database="fruit_market"
    )


# ----------------------------------------
# Home Page
# ----------------------------------------
@app.route("/")
def home():
    return render_template("index.html")


# ----------------------------------------
# Hive Status
# ----------------------------------------
@app.route("/api/status")
def status():
    try:
        connection = get_hive_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT 1")
        cursor.fetchone()

        cursor.close()
        connection.close()

        return jsonify({
            "status": "connected",
            "message": "Apache Hive is connected"
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# ----------------------------------------
# Get All Sales
# ----------------------------------------
@app.route("/api/sales")
def get_sales():

    fruit = request.args.get("fruit", "").strip()
    market = request.args.get("market", "").strip()
    search = request.args.get("search", "").strip()
    from_date = request.args.get("from_date", "").strip()
    to_date = request.args.get("to_date", "").strip()

    try:
        connection = get_hive_connection()
        cursor = connection.cursor()

        query = """
            SELECT id, fruit, quantity, price, market, sale_date
            FROM fruit_market.fruit_sales
            WHERE 1 = 1
        """

        parameters = []

        # Fruit filter
        if fruit:
            query += " AND fruit = %s"
            parameters.append(fruit)

        # Market filter
        if market:
            query += " AND market = %s"
            parameters.append(market)

        # Search filter
        if search:
            query += """
                AND (
                    LOWER(fruit) LIKE LOWER(%s)
                    OR LOWER(market) LIKE LOWER(%s)
                )
            """

            search_value = "%" + search + "%"
            parameters.append(search_value)
            parameters.append(search_value)

        # From date filter
        if from_date:
            query += " AND sale_date >= %s"
            parameters.append(from_date)

        # To date filter
        if to_date:
            query += " AND sale_date <= %s"
            parameters.append(to_date)

        query += " ORDER BY sale_date, id"

        print("SQL QUERY:", query)
        print("PARAMETERS:", parameters)

        cursor.execute(query, parameters)

        rows = cursor.fetchall()

        sales = []

        for row in rows:
            sales.append({
                "id": row[0],
                "fruit": row[1],
                "quantity": row[2],
                "price": row[3],
                "market": row[4],
                "sale_date": row[5]
            })

        cursor.close()
        connection.close()

        return jsonify(sales)

    except Exception as e:

        print("SALES API ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 500
# ----------------------------------------
# Dashboard Summary
# ----------------------------------------
@app.route("/api/summary")
def summary():

    try:
        connection = get_hive_connection()
        cursor = connection.cursor()

        # Total quantity
        cursor.execute("""
            SELECT COALESCE(SUM(quantity), 0)
            FROM fruit_sales
        """)
        total_quantity = cursor.fetchone()[0]

        # Total revenue
        cursor.execute("""
            SELECT COALESCE(SUM(quantity * price), 0)
            FROM fruit_sales
        """)
        total_revenue = cursor.fetchone()[0]

        # Number of transactions
        cursor.execute("""
            SELECT COUNT(*)
            FROM fruit_sales
        """)
        total_transactions = cursor.fetchone()[0]

        # Top fruit
        cursor.execute("""
            SELECT fruit, SUM(quantity) AS total_quantity
            FROM fruit_sales
            GROUP BY fruit
            ORDER BY total_quantity DESC
            LIMIT 1
        """)

        top_fruit_row = cursor.fetchone()

        if top_fruit_row:
            top_fruit = top_fruit_row[0]
        else:
            top_fruit = "N/A"

        cursor.close()
        connection.close()

        return jsonify({
            "total_quantity": total_quantity,
            "total_revenue": total_revenue,
            "total_transactions": total_transactions,
            "top_fruit": top_fruit
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


# ----------------------------------------
# Fruit-wise Analysis
# ----------------------------------------
@app.route("/api/fruit-analysis")
def fruit_analysis():

    try:
        connection = get_hive_connection()
        cursor = connection.cursor()

        cursor.execute("""
            SELECT fruit, SUM(quantity) AS total_quantity
            FROM fruit_sales
            GROUP BY fruit
            ORDER BY total_quantity DESC
        """)

        rows = cursor.fetchall()

        data = []

        for row in rows:
            data.append({
                "fruit": row[0],
                "quantity": row[1]
            })

        cursor.close()
        connection.close()

        return jsonify(data)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


# ----------------------------------------
# Market-wise Analysis
# ----------------------------------------
@app.route("/api/market-analysis")
def market_analysis():

    try:
        connection = get_hive_connection()
        cursor = connection.cursor()

        cursor.execute("""
            SELECT market, SUM(quantity) AS total_quantity
            FROM fruit_sales
            GROUP BY market
            ORDER BY total_quantity DESC
        """)

        rows = cursor.fetchall()

        data = []

        for row in rows:
            data.append({
                "market": row[0],
                "quantity": row[1]
            })

        cursor.close()
        connection.close()

        return jsonify(data)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


# ----------------------------------------
# Start Flask
# ----------------------------------------
if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )