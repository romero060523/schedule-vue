import { supabase } from './supabase';

export const employeeService = {
    //crear
    async create(employee) {
    const { data, error } = await supabase
        .from('employees')
        .insert([{
            name: employee.name,
            active: employee.active ?? true
        }])
        .select();

        if (error) throw error;
        return data[0];
    },

    // listar
    async getAll() {
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .order('name')

        if (error) throw error;
        return data;
    },


    // listar por id
    async getById(id) {
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },


    // actualizar
    async update(id, employee) {
        const { data, error } = await supabase
            .from('employees')
            .update({
                name: employee.name,
                active: employee.active
            })
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    },


    // borrar
    async delete(id) {
        const { error } = await supabase
            .from('employees')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true
    }
}