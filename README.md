# Carpet Home

## Setup Instructions

### Step 1: Create Tables in Supabase

1. Go to Supabase > SQL Editor
2. Copy content from `sql/01-tables.sql`
3. Click Run
4. Wait for success message

### Step 2: Create Security Policies

1. In SQL Editor, create New Query
2. Copy content from `sql/02-policies.sql`
3. Click Run

### Step 3: Create Storage Buckets

1. Go to Storage > New Bucket
2. Create bucket: `product-images` (check Public bucket)
3. Create bucket: `gallery` (check Public bucket)

### Step 4: Storage Policies

1. In SQL Editor, create New Query
2. Copy content from `sql/03-storage-policies.sql`
3. Click Run

### Step 5: Get API Keys

1. Go to Project Settings > API
2. Copy Project URL
3. Copy anon public key

### Step 6: Deploy to Netlify

1. Upload project to GitHub
2. Connect to Netlify
3. Add Environment Variables:
   - VITE_SUPABASE_URL = your-project-url
   - VITE_SUPABASE_ANON_KEY = your-anon-key
4. Deploy

## Admin Login

- URL: https://your-site.netlify.app/admin
- Email: httmth@gmail.com
- Password: 1qaz1qazZ!

## Contact

- Phone: +90 555 020 09 11
- Email: carpethome10@gmail.com
