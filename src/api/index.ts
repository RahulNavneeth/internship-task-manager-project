import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qspgtukcnunlahbvjein.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcGd0dWtjbnVubGFoYnZqZWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU2NTgzMzIsImV4cCI6MTk4MTIzNDMzMn0.nYDPMSWxXdXip7ixSmmCcUNFfFNLZIqnzn_GNqg0tU0';
export const supabase = createClient(supabaseUrl, supabaseKey);
