import { createClient } from '@supabase/supabase-js';

// Para o desenvolvimento inicial, se não houver variáveis de ambiente configuradas,
// vamos usar valores dummy apenas para evitar quebra do app (ou avisar no console).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bnztppcgyykjizddmhxt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'logiflowsupabase123';

if (!import.meta.env.VITE_SUPABASE_URL) {
    console.warn('⚠️ VITE_SUPABASE_URL não está configurada no .env. Usando mock url.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
