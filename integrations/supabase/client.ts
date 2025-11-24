// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mseyvwqwqspbwjtuyfdu.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zZXl2d3F3cXNwYndqdHV5ZmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwOTYwNjksImV4cCI6MjA2NzY3MjA2OX0.v86qZBD5Ah7if2W2wRvyDkW7AsXnSxZOUN9pyhvwLYo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
