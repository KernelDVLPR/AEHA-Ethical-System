// ============================================================
// Configuración de variables de entorno
// Principio de Responsabilidad Única: solo gestiona env vars
// ============================================================
const dotenv = require('dotenv');
const path = require('path');

// Cargar .env desde la raíz del backend
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Validar que todas las variables de entorno requeridas estén presentes
 */
function validarVariablesEntorno() {
  const requeridas = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'];
  const faltantes = requeridas.filter((v) => !process.env[v]);

  if (faltantes.length > 0) {
    console.error(`❌ Variables de entorno faltantes: ${faltantes.join(', ')}`);
    console.error('   Crea un archivo .env basándote en .env.example');
    process.exit(1);
  }
}

validarVariablesEntorno();

module.exports = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  PORT: process.env.PORT || 3001,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};
