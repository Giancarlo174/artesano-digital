/**
 * Modelo de Usuario
 * Implementa lógica de negocio y acceso a datos para usuarios
 */

const supabaseService = require('../services/supabase.service');

class Usuario {
  constructor(data = {}) {
    this.id_usuario = data.id_usuario || null;
    this.nombre = data.nombre || '';
    this.correo = data.correo || '';
    this.telefono = data.telefono || '';
    this.direccion = data.direccion || '';
    this.tipo_usuario = data.tipo_usuario || 'cliente';
    this.created_at = data.created_at || null;
  }

  // Métodos de acceso a datos
  static async getAll() {
    const supabase = supabaseService.getClient();
    const { data, error } = await supabase
      .from('usuarios')
      .select('*');
      
    if (error) throw error;
    return data.map(user => new Usuario(user));
  }

  static async getById(id) {
    const supabase = supabaseService.getClient();
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id_usuario', id)
      .single();
      
    if (error) throw error;
    return data ? new Usuario(data) : null;
  }

  static async getByEmail(email) {
    const supabase = supabaseService.getClient();
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', email)
      .maybeSingle(); // permite que no haya resultados sin lanzar error
  
    if (error) throw error;
    return data ? new Usuario(data) : null;
  }
  

  async save() {
    const supabase = supabaseService.getClient();
    
    if (this.id_usuario) {
      // Actualizar
      const { data, error } = await supabase
        .from('usuarios')
        .update(this.toJSON())
        .eq('id_usuario', this.id_usuario)
        .select()
        .single();
        
      if (error) throw error;
      return new Usuario(data);
    } else {
      // Crear
      const { data, error } = await supabase
        .from('usuarios')
        .insert(this.toJSON())
        .select()
        .single();
        
      if (error) throw error;
      return new Usuario(data);
    }
  }

  // Transformar a objeto simple
  toJSON() {
    return {
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono,
      direccion: this.direccion,
      tipo_usuario: this.tipo_usuario
    };
  }
}

module.exports = Usuario;
