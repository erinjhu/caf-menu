import psycopg2

conn = psycopg2.connect(
    "postgresql://postgres.pcyjccgssbkfuezmqtpt:codingissohard@aws-0-us-east-2.pooler.supabase.com:5432/postgres?sslmode=require"
)
print("Connected!")
conn.close()