
import React, { useState } from 'react';
import { Tool, Category } from '../types';

interface ManagementTableProps {
  tools: Tool[];
  categories: Category[];
  onAddTool: (tool: Tool) => void;
  onDeleteTool: (id: string) => void;
}

const ManagementTable: React.FC<ManagementTableProps> = ({ tools, categories, onAddTool, onDeleteTool }) => {
  const [newTool, setNewTool] = useState({
    category: 'pessoas',
    name: '',
    description: '',
    url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTool.name || !newTool.url) return;

    const tool: Tool = {
      id: Date.now().toString(),
      ...newTool,
      source: '4ALL', // Ferramentas manuais marcadas como 4ALL por padrão
      tags: ['Manual']
    };

    onAddTool(tool);
    setNewTool({ category: 'pessoas', name: '', description: '', url: '' });
  };

  return (
    <div className="overflow-x-auto bg-slate-900/50 rounded-2xl border border-slate-800 backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-800/50">
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Categoria</th>
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Nome</th>
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Descrição</th>
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Link</th>
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Ação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {/* Linha de Cadastro */}
          <tr className="bg-blue-500/5">
            <td className="p-3">
              <select 
                value={newTool.category}
                onChange={(e) => setNewTool({...newTool, category: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </td>
            <td className="p-3">
              <input 
                type="text" 
                placeholder="Nome..."
                value={newTool.name}
                onChange={(e) => setNewTool({...newTool, name: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </td>
            <td className="p-3">
              <input 
                type="text" 
                placeholder="Descrição breve..."
                value={newTool.description}
                onChange={(e) => setNewTool({...newTool, description: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </td>
            <td className="p-3">
              <input 
                type="text" 
                placeholder="https://..."
                value={newTool.url}
                onChange={(e) => setNewTool({...newTool, url: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </td>
            <td className="p-3">
              <button 
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
              >
                Adicionar
              </button>
            </td>
          </tr>

          {/* Lista de Ferramentas Existentes */}
          {tools.map((tool) => (
            <tr key={tool.id} className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4 text-sm text-slate-400">
                {categories.find(c => c.id === tool.category)?.name || tool.category}
              </td>
              <td className="p-4 text-sm font-semibold text-slate-200">{tool.name}</td>
              <td className="p-4 text-sm text-slate-400 max-w-xs truncate">{tool.description}</td>
              <td className="p-4 text-sm">
                <a href={tool.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline truncate inline-block max-w-[150px]">
                  {tool.url}
                </a>
              </td>
              <td className="p-4 text-sm">
                <button 
                  onClick={() => onDeleteTool(tool.id)}
                  className="text-red-400 hover:text-red-300 transition-colors p-2"
                  title="Remover ferramenta"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagementTable;
