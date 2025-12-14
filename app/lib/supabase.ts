import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://erndphqhwbyqesoxbfdq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVybmRwaHFod2J5cWVzb3hiZmRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNDg2OTIsImV4cCI6MjA3NDYyNDY5Mn0._aJrHYEaWhbYFQf6c0UMGy0Eb-ZA7GeHXAKaP9UMfSQ';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
