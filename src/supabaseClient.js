import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lperlhcqykowkmftoynr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZXJsaGNxeWtvd2ttZnRveW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMDAyOTYsImV4cCI6MjA1OTY3NjI5Nn0.Awxutk2EDJb09dVZkaC4rOcpii2pKpDKHKY_58L8jJU'

export const supabase = createClient(supabaseUrl, supabaseKey)