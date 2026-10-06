from pyhive import hive

try:
    print("Connecting to Hive...")

    connection = hive.Connection(
        host="localhost",
        port=10000,
        username="hive",
        database="fruit_market"
    )

    cursor = connection.cursor()

    cursor.execute("SELECT * FROM fruit_sales")

    rows = cursor.fetchall()

    print("\nConnection successful!")
    print("Fruit Sales Data:")
    print("-" * 80)

    for row in rows:
        print(row)

    print("-" * 80)
    print(f"Total records: {len(rows)}")

    cursor.close()
    connection.close()

except Exception as e:
    print("\nConnection failed!")
    print("Error:", e)