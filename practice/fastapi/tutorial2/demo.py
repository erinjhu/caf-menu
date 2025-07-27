from supabase import create_client, Client

SUPABASE_URL='https://pcyjccgssbkfuezmqtpt.supabase.co'
SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjeWpjY2dzc2JrZnVlem1xdHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MTQ3NDQsImV4cCI6MjA2ODA5MDc0NH0.CUK1WPzASQ4HSXD6lGg7Oe16U9Fqo_gWdeXpPCBAOrY'

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# insert row
# new_row = {'first_name' : 'john doe'}
# supabase.table('demo-table').insert(new_row).execute()

# update row
# new_row = {'first_name' : 'Jane Doe'}
# # eq for filtering
# supabase.table('demo-table').update(new_row).eq('id', 2).execute()

# delete row
supabase.table('demo-table').delete().eq('id',2).execute()

# get the table
# results = supabase.table('demo-table').select('*').execute()
# print(results)

# get image
response = supabase.storage.from_('demo-bucket').get_public_url('image.png')
print(response)