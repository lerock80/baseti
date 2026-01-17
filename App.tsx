
import React, { useState, useMemo, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Sidebar from './components/Sidebar';
import ToolCard from './components/ToolCard';
import ManagementTable from './components/ManagementTable';
import CategoryManagement from './components/CategoryManagement';
import { tools as initialTools, categories as initialCategories } from './data';
import { Tool, Category } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'gallery' | 'manage_tools' | 'manage_categories'>('gallery');
  const [toolsList, setToolsList] = useState<Tool[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Carregar dados iniciais e do localStorage
  useEffect(() => {
    const savedTools = localStorage.getItem('osint_hub_user_tools');
    const savedCategories = localStorage.getItem('osint_hub_user_categories');
    const authStatus = localStorage.getItem('osint_hub_auth') === 'true';
    setIsAuthenticated(authStatus);

    if (savedCategories) {
      setCategoriesList(JSON.parse(savedCategories));
    } else {
      setCategoriesList(initialCategories);
    }

    if (savedTools) {
      const parsed = JSON.parse(savedTools);
      setToolsList([...initialTools, ...parsed]);
    } else {
      setToolsList(initialTools);
    }
  }, []);

  const saveTools = (newList: Tool[]) => {
    const userOnlyTools = newList.filter(t => !initialTools.some(it => it.id === t.id));
    localStorage.setItem('osint_hub_user_tools', JSON.stringify(userOnlyTools));
    setToolsList(newList);
  };

  const saveCategories = (newList: Category[]) => {
    localStorage.setItem('osint_hub_user_categories', JSON.stringify(newList));
    setCategoriesList(newList);
  };

  const handleAddTool = (newTool: Tool) => {
    if (!isAuthenticated) return;
    saveTools([newTool, ...toolsList]);
  };

  const handleDeleteTool = (id: string) => {
    if (!isAuthenticated) return;
    saveTools(toolsList.filter(t => t.id !== id));
  };

  const handleAddCategory = (newCat: Category) => {
    if (!isAuthenticated) return;
    saveCategories([...categoriesList, newCat]);
  };

  const handleDeleteCategory = (id: string) => {
    if (!isAuthenticated) return;
    saveCategories(categoriesList.filter(c => c.id !== id));
  };

  const handleUpdateCategory = (updatedCat: Category) => {
    if (!isAuthenticated) return;
    saveCategories(categoriesList.map(c => c.id === updatedCat.id ? updatedCat : c));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const admins = [
      { user: 'waurlenio', pass: 'w4url3n10' },
      { user: 'andremiranda', pass: 'andremirandabaseti' }
    ];
    const foundAdmin = admins.find(admin => admin.user === username && admin.pass === password);
    if (foundAdmin) {
      setIsAuthenticated(true);
      localStorage.setItem('osint_hub_auth', 'true');
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Usuário ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('osint_hub_auth');
    setViewMode('gallery');
  };

  const filteredTools = useMemo(() => {
    return toolsList.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, toolsList]);

  const currentCategoryName = useMemo(() => {
    if (activeCategory === 'all') return 'Todas as Ferramentas';
    return categoriesList.find(c => c.id === activeCategory)?.name || 'Categoria Removida';
  }, [activeCategory, categoriesList]);

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar 
        categories={categoriesList} 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />
      
      <main className="flex-grow p-4 md:p-10 max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Portal OSINT <span className="text-blue-500">BASE TI</span>
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-slate-400 max-w-2xl">Curadoria profissional de inteligência.</p>
                {isAuthenticated && (
                  <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button 
                      onClick={() => setViewMode('gallery')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'gallery' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
                    >
                      Galeria
                    </button>
                    <button 
                      onClick={() => setViewMode('manage_tools')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'manage_tools' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
                    >
                      Ferramentas
                    </button>
                    <button 
                      onClick={() => setViewMode('manage_categories')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'manage_categories' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
                    >
                      Categorias
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="relative w-full md:w-96">
              <input 
                type="text"
                placeholder="Pesquisar..."
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 px-5 py-3 pl-12 rounded-2xl focus:ring-2 focus:ring-blue-500/50 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500 border-b border-slate-800 pb-4">
            <span className="font-semibold uppercase tracking-widest text-[10px]">Filtro:</span>
            <span className="bg-slate-800 text-blue-400 px-3 py-1 rounded-full font-medium">{currentCategoryName}</span>
            <span className="ml-auto mono opacity-60">{filteredTools.length} ferramentas</span>
          </div>
        </header>

        {viewMode === 'gallery' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
            {filteredTools.length > 0 ? filteredTools.map(tool => <ToolCard key={tool.id} tool={tool} />) : <NoResults onClear={() => {setSearchTerm(''); setActiveCategory('all');}} />}
          </div>
        )}
        {viewMode === 'manage_tools' && (
          <ManagementTable tools={filteredTools} categories={categoriesList} onAddTool={handleAddTool} onDeleteTool={handleDeleteTool} />
        )}
        {viewMode === 'manage_categories' && (
          <CategoryManagement categories={categoriesList} onAdd={handleAddCategory} onDelete={handleDeleteCategory} onUpdate={handleUpdateCategory} />
        )}

        <footer className="mt-24 pt-10 border-t border-slate-900 flex flex-col items-center gap-6 text-slate-500 text-sm pb-10">
          <span className="font-bold text-slate-400 tracking-widest uppercase text-xs">Portal OSINT - BASE TI</span>
          <p className="text-center italic opacity-70">"A informação é a moeda mais valiosa do século XXI."</p>
        </footer>
      </main>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">Painel Admin</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="text" placeholder="Usuário" className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none" value={username} onChange={e => setUsername(e.target.value)} />
              <input type="password" placeholder="Senha" className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none" value={password} onChange={e => setPassword(e.target.value)} />
              {loginError && <p className="text-red-400 text-xs">{loginError}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowLoginModal(false)} className="flex-1 px-4 py-3 bg-slate-800 text-slate-300 rounded-xl">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl">Entrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <SpeedInsights />
    </div>
  );
};

const NoResults = ({ onClear }: { onClear: () => void }) => (
  <div className="col-span-full py-20 text-center">
    <div className="text-6xl mb-4 opacity-20">🚫</div>
    <h3 className="text-xl font-bold text-slate-400">Sem resultados</h3>
    <button onClick={onClear} className="mt-6 text-blue-400 underline">Limpar filtros</button>
  </div>
);

export default App;
