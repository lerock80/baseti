
import React from 'react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-xl hover:border-blue-500/50 transition-all group flex flex-col h-full backdrop-blur-sm">
      <div className="flex justify-end items-start mb-3">
        <div className="flex gap-1">
          {tool.tags?.map(tag => (
            <span key={tag} className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded border border-slate-600/50">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors mb-2">
        {tool.name}
      </h3>
      
      <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">
        {tool.description}
      </p>
      
      <a 
        href={tool.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-blue-600 text-slate-200 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all w-full border border-slate-600 group-hover:border-transparent"
      >
        Acessar Ferramenta
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
};

export default ToolCard;
