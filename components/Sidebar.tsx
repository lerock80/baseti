
import React from 'react';
import { Category } from '../types';

interface SidebarProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  categories, 
  activeCategory, 
  onSelectCategory, 
  isAuthenticated,
  onLogout,
  onLoginClick
}) => {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 overflow-y-auto hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-400 flex flex-col gap-0 leading-tight">
          <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Portal OSINT</span>
          <span className="text-2xl">BASE TI</span>
        </h1>
      </div>
      
      <nav className="px-3 flex-grow">
        <button
          onClick={() => onSelectCategory('all')}
          className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-all flex items-center gap-3 ${
            activeCategory === 'all' 
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <span className="text-lg">📦</span>
          <span className="font-medium text-sm">Todas as Ferramentas</span>
        </button>

        <div className="my-4 border-t border-slate-800 mx-4"></div>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`w-full text-left px-4 py-2.5 rounded-lg mb-1 transition-all flex items-center gap-3 ${
              activeCategory === cat.id 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">{cat.icon}</span>
            <span className="font-medium text-sm">{cat.name}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        {isAuthenticated ? (
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-900/30 text-red-400 rounded-lg text-sm font-semibold transition-all border border-transparent hover:border-red-500/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        ) : (
          <button 
            onClick={onLoginClick}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-semibold transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Admin Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
