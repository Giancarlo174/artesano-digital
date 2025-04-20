/**
 * Servicio para la conexión con Supabase
 * Centraliza la configuración y métodos para interactuar con la base de datos
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

class SupabaseService {
  constructor() {
    // Verificar que las variables de entorno estén definidas
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      console.error('Error: Variables de entorno de Supabase no definidas');
      process.exit(1);
    }

    // Inicializar cliente de Supabase
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
  }

  // Método para obtener la instancia del cliente
  getClient() {
    return this.supabase;
  }
}

// Exportar una instancia única (patrón Singleton)
module.exports = new SupabaseService();
