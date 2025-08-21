import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL="https://elcnsueulfcyiuskjarf.supabase.co"
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsY25zdWV1bGZjeWl1c2tqYXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzkzNjMsImV4cCI6MjA3MTExNTM2M30.VrHlFH64BkDojmJZNMcfeZhPG164s3pqcVtYGwf136Y"


export const supabase = createClient(supabaseUrl, supabaseKey)