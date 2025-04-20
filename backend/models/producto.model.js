/**
 * Modelo de Producto
 * Implementa lógica de negocio y acceso a datos para productos
 */

const supabaseService = require('../services/supabase.service');

class Producto {
  constructor(data = {}) {
    this.id_producto = data.id_producto || null;
    this.id_tienda = data.id_tienda || null;
    this.nombre = data.nombre || '';
    this.descripcion = data.descripcion || '';
    this.precio = data.precio || 0;
    this.stock = data.stock || 0;
    this.imagen = data.imagen || null;
    this.activo = data.activo || true;
    this.created_at = data.created_at || null;
  }

  // Métodos de acceso a datos
  static async getAll() {
    const supabase = supabaseService.getClient();
    const { data, error } = await supabase
      .from('productos')
      .select('*');
      
    if (error) throw error;
    return data.map(producto => new Producto(producto));
  }

  static async getById(id) {
    const supabase = supabaseService.getClient();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id_producto', id)
      .single();
      
    if (error) throw error;
    return data ? new Producto(data) : null;
  }

  static async getByTienda(idTienda) {
    const supabase = supabaseService.getClient();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id_tienda', idTienda);
      
    if (error) throw error;
    return data.map(producto => new Producto(producto));
  }

  static async getActivos() {
    const supabase = supabaseService.getClient();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('activo', true);
      
    if (error) throw error;
    return data.map(producto => new Producto(producto));
  }

  static async getPopulares() {
    const supabase = supabaseService.getClient();
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('popular', true);
  
    if (error) throw error;
    return data.map(producto => new Producto(producto));
  }  

  async save() {
    const supabase = supabaseService.getClient();
    
    if (this.id_producto) {
      // Actualizar
      const { data, error } = await supabase
        .from('productos')
        .update(this.toJSON())
        .eq('id_producto', this.id_producto)
        .select()
        .single();
        
      if (error) throw error;
      return new Producto(data);
    } else {
      // Crear
      const { data, error } = await supabase
        .from('productos')
        .insert(this.toJSON())
        .select()
        .single();
        
      if (error) throw error;
      return new Producto(data);
    }
  }

  static async delete(id) {
    const supabase = supabaseService.getClient();
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id_producto', id);
      
    if (error) throw error;
    return true;
  }

  // Transformar a objeto simple
  toJSON() {
    return {
      id_tienda: this.id_tienda,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      stock: this.stock,
      imagen: this.imagen,
      activo: this.activo
    };
  }
}

module.exports = Producto;
