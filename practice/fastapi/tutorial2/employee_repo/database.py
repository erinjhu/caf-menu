# database.py
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
# load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

SUPABASE_URL='https://pcyjccgssbkfuezmqtpt.supabase.co'
SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjeWpjY2dzc2JrZnVlem1xdHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MTQ3NDQsImV4cCI6MjA2ODA5MDc0NH0.CUK1WPzASQ4HSXD6lGg7Oe16U9Fqo_gWdeXpPCBAOrY'
SUPABASE_JWT_SECRET='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjeWpjY2dzc2JrZnVlem1xdHB0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjUxNDc0NCwiZXhwIjoyMDY4MDkwNzQ0fQ.z124IQ6y1uT8XD4MsxIHe5GP1QHsYesF_Gyim5_PL9U'
SUPABASE_BUCKET='demo-bucket'

print("SUPABASE_URL:", SUPABASE_URL)
print("SUPABASE_KEY:", SUPABASE_KEY)
print("SUPABASE_JWT_SECRET:", SUPABASE_JWT_SECRET)
print("SUPABASE_BUCKET:", SUPABASE_BUCKET)

if not all([SUPABASE_URL, SUPABASE_KEY, SUPABASE_JWT_SECRET, SUPABASE_BUCKET]):
    raise EnvironmentError("One or more Supabase environment variables are missing.")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)