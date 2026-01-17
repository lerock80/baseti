
import { Tool, Category } from './types';

export const categories: Category[] = [
  { id: 'pessoas', name: 'Pessoas & Identidades', icon: '👤' },
  { id: 'judicial', name: 'Justiça & Processos', icon: '⚖️' },
  { id: 'governo', name: 'Governo & Transparência', icon: '🏛️' },
  { id: 'social-br', name: 'Benefícios Sociais', icon: '🧾' },
  { id: 'geo', name: 'Mapas & Geoespacial', icon: '🗺️' },
  { id: 'telecom', name: 'Telecom & Celulares', icon: '📡' },
  { id: 'dorking', name: 'Google Hacking (Dorks)', icon: '🕵️' },
  { id: 'busca', name: 'Motores de Busca', icon: '🔍' },
];

export const tools: Tool[] = [
  // --- BENEFÍCIOS SOCIAIS ---
  { id: 'br1', name: 'Portal Bolsa Família', url: 'https://www.caixa.gov.br/programas-sociais/Paginas/default.aspx', description: 'Consulta oficial de benefícios sociais da Caixa Econômica Federal.', category: 'social-br', source: 'Brazuca' },
  { id: 'br2', name: 'Auxílio Emergencial', url: 'https://consultaauxilio.cidadania.gov.br/consulta/#/', description: 'Consulta de recebimento e situação do Auxílio Emergencial.', category: 'social-br', source: 'Brazuca' },
  { id: 'br3', name: 'Valores a Receber (BC)', url: 'https://valoresareceber.bcb.gov.br/publico/', description: 'Sistema do Banco Central para consultar valores esquecidos em bancos.', category: 'social-br', source: 'Brazuca' },
  { id: 'br4', name: 'Extrato INSS', url: 'https://meu.inss.gov.br/', description: 'Consulta de benefícios previdenciários e extratos de pagamento.', category: 'social-br', source: 'Brazuca' },

  // --- JUSTIÇA & PROCESSOS ---
  { id: 'ju1', name: 'Mandados de Prisão (BNMP)', url: 'https://portalbnmp.cnj.jus.br/#/pesquisa-peca#', description: 'Banco Nacional de Mandados de Prisão do CNJ.', category: 'judicial', source: 'Brazuca' },
  { id: 'ju2', name: 'JusBrasil', url: 'https://www.jusbrasil.com.br/', description: 'Busca unificada de processos, jurisprudência e diários oficiais.', category: 'judicial', source: 'Brazuca' },
  { id: 'ju3', name: 'Escavador', url: 'https://www.escavador.com/', description: 'Rastreamento de processos judiciais e informações de pessoas/empresas.', category: 'judicial', source: 'Brazuca' },
  { id: 'ju4', name: 'PJe Comunicações', url: 'https://comunica.pje.jus.br/', description: 'Consulta pública de comunicações processuais de tribunais.', category: 'judicial', source: 'Brazuca' },

  // --- GOVERNO & DOCUMENTOS ---
  { id: 'gov1', name: 'CPF Receita Federal', url: 'https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp', description: 'Consulta oficial da situação cadastral do CPF.', category: 'governo', source: 'Brazuca' },
  { id: 'gov2', name: 'Portal da Transparência', url: 'https://portaldatransparencia.gov.br/', description: 'Gastos federais, servidores públicos e convênios.', category: 'governo', source: 'Brazuca' },
  { id: 'gov3', name: 'CNPJ Receita Federal', url: 'https://servicos.receita.fazenda.gov.br/Servicos/CNPJ/cnpjreva/cnpjreva_solicitacao.asp', description: 'Emissão de comprovante de inscrição e situação cadastral de empresas.', category: 'governo', source: 'Brazuca' },

  // --- PESQUISA DE PESSOAS ---
  { id: 'ps1', name: 'CNA (Advogados)', url: 'https://cna.oab.org.br', description: 'Cadastro Nacional dos Advogados para verificar registros ativos na OAB.', category: 'pessoas', source: 'Brazuca' },
  { id: 'ps2', name: 'CFM (Médicos)', url: 'https://portal.cfm.org.br/busca-medicos/', description: 'Consulta ao registro profissional de médicos em todo o Brasil.', category: 'pessoas', source: 'Brazuca' },
  { id: 'ps3', name: 'TSE - Filiação Partidária', url: 'https://www.tse.jus.br/partidos/filiacao-partidaria/certidao-de-filiacao-partidaria', description: 'Verificação de filiação partidária de cidadãos.', category: 'pessoas', source: 'Brazuca' },

  // --- TELECOM ---
  { id: 'te1', name: 'IMEI Legalidade', url: 'https://www.consultaaparelhoimpedido.com.br/', description: 'Verificação se o celular possui impedimento por roubo ou furto.', category: 'telecom', source: 'Brazuca' },
  { id: 'te2', name: 'Qual Operadora', url: 'https://consultanumero.abrtelecom.com.br/', description: 'Verifica a operadora de um número e histórico de portabilidade.', category: 'telecom', source: 'Brazuca' },
  { id: 'te3', name: 'Cadastro Pré', url: 'https://cadastropre.com.br/', description: 'Consulta se há linhas pré-pagas ativas vinculadas a um CPF.', category: 'telecom', source: 'Brazuca' },

  // --- MAPAS & GEO ---
  { id: 'geo1', name: 'FlightRadar24', url: 'https://www.flightradar24.com/', description: 'Rastreamento de voos em tempo real em todo o mundo.', category: 'geo', source: 'Brazuca' },
  { id: 'geo2', name: 'MarineTraffic', url: 'https://www.marinetraffic.com/', description: 'Monitoramento de navios e tráfego marítimo global.', category: 'geo', source: 'Brazuca' },
  { id: 'geo3', name: 'InPE - Queimadas', url: 'https://queimadas.dgi.inpe.br/queimadas/portal', description: 'Monitoramento de focos de queimadas em território nacional.', category: 'geo', source: 'Brazuca' },

  // --- DORKING ---
  { id: 'dk1', name: 'Dork: SQL Leaks (.br)', url: 'https://www.google.com/search?q=site%3Acom.br+ext%3Asql+%22CREATE+TABLE%22', description: 'Busca dork para identificar vazamentos de bancos de dados SQL brasileiros.', category: 'dorking', source: 'Brazuca' },
  { id: 'dk2', name: 'Dork: Docs Confidenciais', url: 'https://www.google.com/search?q=site%3Abr+ext%3Apdf+%22confidencial%22', description: 'Busca dork para encontrar documentos PDF confidenciais expostos.', category: 'dorking', source: 'Brazuca' },

  // --- BUSCA ---
  { id: 's1', name: 'Google Advanced', url: 'https://www.google.com/advanced_search', description: 'Interface oficial para pesquisas avançadas no Google.', category: 'busca', source: '4ALL' },
  { id: 's2', name: 'DuckDuckGo', url: 'https://duckduckgo.com', description: 'Motor de busca que prioriza a privacidade do usuário.', category: 'busca', source: '4ALL' }
];
