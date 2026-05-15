TRUNCATE TABLE
  refresh_tokens,
  usuarios,
  links,
  tecnologias,
  projetos,
  experiencias_profissionais,
  experiencias_academicas,
  pessoas
RESTART IDENTITY CASCADE;

INSERT INTO usuarios
(nome, login, senha_hash)
VALUES
(
  'Vinícius Almeida',
  'vinicius',
  '$2a$10$YQItRMm1CoNzSMlGfcWN5OYKEQcRpuPWIh3EucZNmw2tkzW8VPj9q'
),
(
  'Lucas Martins',
  'lucas',
  '$2a$10$YQItRMm1CoNzSMlGfcWN5OYKEQcRpuPWIh3EucZNmw2tkzW8VPj9q'
);

INSERT INTO pessoas 
(nome, slug, cargo, resumo, email, cidade, estado, pais)
VALUES
(
  'Vinícius Almeida',
  'vinicius-almeida',
  'Analista de Dados Comercial | Power BI, SQL e Python',
  'Analista de Dados com atuação orientada a negócios, focado em transformar dados comerciais em informações estratégicas para tomada de decisão. Atua conectando dados, precificação, vendas e performance comercial para gerar análises claras, indicadores acionáveis e suporte à tomada de decisão.',
  'vinicius.asilva@ufpe.br',
  'Recife',
  'Pernambuco',
  'Brasil'
),
(
  'Lucas Martins',
  'lucas-martins',
  'Estudante de Administração',
  'Estudante de Administração com interesse em gestão de negócios, análise de processos, indicadores de desempenho e planejamento estratégico. Busca desenvolver experiência em rotinas administrativas, organização de projetos e apoio à tomada de decisão.',
  'lucas.martins@email.com',
  'Recife',
  'Pernambuco',
  'Brasil'
);

INSERT INTO experiencias_academicas
(pessoa_id, curso, instituicao, periodo, status, descricao)
VALUES
(
  1,
  'Sistemas para Internet',
  'Universidade Católica de Pernambuco',
  '2024 - Atual',
  'Cursando',
  'Formação em desenvolvimento de sistemas web, programação, banco de dados, interfaces, APIs e soluções digitais.'
),
(
  1,
  'Bacharelado em Engenharia de Produção',
  'Universidade Federal de Pernambuco',
  '2020 - 2025',
  'Concluído',
  'Formação com base em processos, gestão, operações, estatística, análise de desempenho e melhoria contínua.'
),
(
  2,
  'Bacharelado em Administração',
  'Universidade Exemplo',
  '2023 - Atual',
  'Cursando',
  'Formação voltada à gestão de organizações, planejamento estratégico, finanças, marketing, operações e análise de processos administrativos.'
),
(
  2,
  'Curso Técnico em Administração',
  'Escola Técnica Exemplo',
  '2021 - 2022',
  'Concluído',
  'Formação técnica com foco em rotinas administrativas, atendimento, organização de documentos, controles internos e apoio à gestão.'
);

INSERT INTO experiencias_profissionais
(pessoa_id, cargo, empresa, periodo, descricao, impacto)
VALUES
(
  1,
  'Analista de Dados Comercial Jr',
  'Home Center Ferreira Costa',
  '2025 - Atual',
  'Atuação em inteligência comercial para suporte a decisões de preço, portfólio, vendas, margem, rentabilidade e performance comercial.',
  'Apoio à gestão comercial por meio de dashboards, análises de indicadores, simulações de preço, acompanhamento de campanhas, controle de verbas e avaliação de oportunidades comerciais.'
),
(
  2,
  'Estagiário Administrativo',
  'Empresa Exemplo Serviços',
  '2024 - Atual',
  'Apoio em rotinas administrativas, organização de documentos, acompanhamento de planilhas, atendimento interno e suporte a processos operacionais.',
  'Contribuição para melhoria da organização de controles administrativos e apoio na consolidação de informações para a gestão.'
);

INSERT INTO projetos
(pessoa_id, nome, descricao, tecnologia, url)
VALUES
(
  1,
  'Portfólio Mobile',
  'Aplicativo de currículo/portfólio desenvolvido em React Native com Expo Router, navegação entre telas, visual moderno e filtro interativo de projetos por tecnologia.',
  'React Native',
  'https://github.com/vasengprod'
),
(
  1,
  'Integração com GitHub API',
  'Funcionalidade de consumo da API pública do GitHub para listagem de repositórios e filtragem por tecnologia.',
  'TypeScript',
  'https://github.com/vasengprod'
),
(
  1,
  'Currículo Express API',
  'API REST desenvolvida com Express e PostgreSQL para armazenar informações de currículo, experiências, formações, projetos, tecnologias e links.',
  'JavaScript',
  'https://github.com/vasengprod'
),
(
  2,
  'Plano de Negócios Acadêmico',
  'Projeto acadêmico para estruturação de um plano de negócios, incluindo análise de mercado, proposta de valor, custos e planejamento operacional.',
  'Gestão',
  'https://github.com'
),
(
  2,
  'Controle Administrativo em Planilhas',
  'Modelo simples de controle administrativo para acompanhamento de tarefas, documentos, prazos e indicadores internos.',
  'Excel',
  'https://github.com'
);

INSERT INTO tecnologias
(pessoa_id, nome, categoria)
VALUES
-- Vinícius Almeida | Dados & BI
(1, 'ETL', 'Dados & BI'),
(1, 'Power BI', 'Dados & BI'),
(1, 'SQL', 'Dados & BI'),
(1, 'Excel Avançado', 'Dados & BI'),
(1, 'Power Automate', 'Dados & BI'),
(1, 'Data Storytelling', 'Dados & BI'),

-- Vinícius Almeida | Negócios
(1, 'Precificação', 'Negócios'),
(1, 'Vendas', 'Negócios'),
(1, 'KPIs Comerciais', 'Negócios'),
(1, 'Rentabilidade', 'Negócios'),
(1, 'Margem', 'Negócios'),
(1, 'Portfólio', 'Negócios'),

-- Vinícius Almeida | Tecnologia
(1, 'Python', 'Tecnologia'),
(1, 'React Native', 'Tecnologia'),
(1, 'APIs', 'Tecnologia'),
(1, 'Java', 'Tecnologia'),
(1, 'JavaScript', 'Tecnologia'),
(1, 'HTML', 'Tecnologia'),
(1, 'CSS', 'Tecnologia'),

-- Lucas Martins | Administração
(2, 'Excel', 'Ferramentas Administrativas'),
(2, 'PowerPoint', 'Ferramentas Administrativas'),
(2, 'Word', 'Ferramentas Administrativas'),
(2, 'Atendimento', 'Rotinas Administrativas'),
(2, 'Organização de Documentos', 'Rotinas Administrativas'),
(2, 'Controle de Processos', 'Rotinas Administrativas'),
(2, 'Planejamento Estratégico', 'Negócios'),
(2, 'Gestão de Projetos', 'Negócios'),
(2, 'Indicadores Administrativos', 'Negócios');

INSERT INTO links
(pessoa_id, tipo, url)
VALUES
(
  1,
  'GitHub',
  'https://github.com/vasengprod'
),
(
  1,
  'LinkedIn',
  'https://www.linkedin.com/in/vinícius-almeida-3b171b295'
),
(
  2,
  'GitHub',
  'https://github.com'
),
(
  2,
  'LinkedIn',
  'https://www.linkedin.com'
);