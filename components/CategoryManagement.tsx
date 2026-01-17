
import React, { useState } from 'react';
import { Category } from '../types';

interface CategoryManagementProps {
  categories: Category[];
  onAdd: (cat: Category) => void;
  onDelete: (id: string) => void;
  onUpdate: (cat: Category) => void;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ categories, onAdd, onDelete, onUpdate }) => {
  const [newCat, setNewCat] = useState({ name: '', icon: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', icon: '' });

  const handleAdd = () => {
    if (!newCat.name || !newCat.icon) return;
    onAdd({
      id: newCat.name.toLowerCase().replace(/\s+/g, '-'),
      name: newCat.name,
      icon: newCat.icon
    });
    setNewCat({ name: '', icon: '' });
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditForm({ name: cat.name, icon: cat.icon });
  };

  const handleSaveEdit = (id: string) => {
    onUpdate({ id, name: editForm.name, icon: editForm.icon });
    setEditingId(null);
  };

  return (
    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 backdrop-blur-md">
      <h3 className="text-xl font-bold text-white mb-6">Gerenciar Categorias</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
        <input 
          type="text" 
          placeholder="Ícone (Emoji)" 
          className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white outline-none focus:ring-1 focus:ring-blue-500"
          value={newCat.icon}
          onChange={e => setNewCat({...newCat, icon: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Nome da Categoria" 
          className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white outline-none focus:ring-1 focus:ring-blue-500"
          value={newCat.name}
          onChange={e => setNewCat({...newCat, name: e.target.value})}
        />
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Adicionar Categoria
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-800">
              <th className="p-4">Ícone</th>
              <th className="p-4">Nome</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="p-4">
                  {editingId === cat.id ? (
                    <input 
                      className="bg-slate-800 border border-slate-700 rounded p-1 w-12 text-center text-white"
                      value={editForm.icon}
                      onChange={e => setEditForm({...editForm, icon: e.target.value})}
                    />
                  ) : (
                    <span className="text-2xl">{cat.icon}</span>
                  )}
                </td>
                <td className="p-4">
                  {editingId === cat.id ? (
                    <input 
                      className="bg-slate-800 border border-slate-700 rounded p-1 w-full text-white"
                      value={editForm.name}
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                    />
                  ) : (
                    <span className="text-slate-200 font-medium">{cat.name}</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    {editingId === cat.id ? (
                      <>
                        <button onClick={() => handleSaveEdit(cat.id)} className="text-green-400 hover:text-green-300 p-2">Salvar</button>
                        <button onClick={() => setEditingId(null)} className="text-slate-500 hover:text-slate-400 p-2">Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(cat)} className="text-blue-400 hover:text-blue-300 p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => onDelete(cat.id)} className="text-red-400 hover:text-red-300 p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManagement;
