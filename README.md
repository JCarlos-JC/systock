# SyStock - Sistema de Gestão de Stock

Sistema completo de gestão de stock integrado com procurement, desenvolvido com React, TypeScript, Tailwind CSS e Supabase.

## 🚀 Funcionalidades

### Autenticação e Autorização
- ✅ Login/logout com Supabase Auth
- ✅ Sistema de roles (Admin, Operador, Gestor de Stock)
- ✅ Proteção de rotas baseada em roles

### Layout e Interface
- ✅ Sidebar fixa com navegação por módulos
- ✅ Navbar com informações do usuário e pesquisa
- ✅ Layout responsivo com Tailwind CSS
- ✅ Design limpo com cores neutras

### Funcionalidades Principais
- 🔄 **Produtos** - CRUD completo (nome, código, categoria, quantidade, preços, fornecedor)
- 🔄 **Fornecedores** - Gestão completa de fornecedores
- 🔄 **Vendas** - Carrinho de vendas com validação de stock
- 🔄 **Relatórios** - Relatórios de vendas, fornecedores e produtos
- 🔄 **Análise ABC** - Classificação de produtos com gráficos

### Funcionalidades de Vendas
- 🔄 Carrinho que não permite venda sem stock
- 🔄 Atualização automática de stock nas vendas
- 🔄 Geração de recibos em PDF
- 🔄 Histórico completo de vendas

### Relatórios
- 🔄 Relatórios filtráveis por data
- 🔄 Exportação em PDF
- 🔄 Relatórios de fornecedores
- 🔄 Lista de produtos disponíveis

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (Database, Auth, Storage)
- **Routing**: React Router DOM
- **Icons**: Heroicons
- **PDF Generation**: jsPDF (a ser implementado)
- **Charts**: Chart.js + react-chartjs-2 (a ser implementado)

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Layout.tsx       # Layout principal
│   ├── Sidebar.tsx      # Barra lateral de navegação
│   ├── Navbar.tsx       # Barra superior
│   ├── Footer.tsx       # Rodapé
│   └── ProtectedRoute.tsx # Proteção de rotas
├── pages/               # Páginas da aplicação
│   ├── Login.tsx        # Página de login
│   ├── Dashboard.tsx    # Dashboard principal
│   ├── Products.tsx     # Gestão de produtos (a implementar)
│   ├── Suppliers.tsx    # Gestão de fornecedores (a implementar)
│   ├── Sales.tsx        # Sistema de vendas (a implementar)
│   ├── Reports.tsx      # Relatórios (a implementar)
│   └── ABCAnalysis.tsx  # Análise ABC (a implementar)
├── services/            # Serviços de API
│   ├── supabase.ts      # Configuração do Supabase
│   └── auth.ts          # Serviços de autenticação
├── hooks/               # Custom hooks
│   └── useAuth.tsx      # Hook de autenticação
├── types/               # Definições de tipos TypeScript
│   └── index.ts         # Tipos principais
└── utils/               # Funções utilitárias (a implementar)
    ├── pdf.ts           # Geração de PDFs
    └── abc-analysis.ts  # Algoritmos de análise ABC
```

## ⚙️ Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/JCarlos-JC/systock.git
cd systock
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Configure no `.env`:
```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

5. Execute o projeto:
```bash
npm run dev
```

## 🗄️ Schema do Banco de Dados

O arquivo `src/services/supabase.ts` contém o schema SQL completo para configurar o Supabase:

- **profiles** - Perfis de usuários com roles
- **suppliers** - Fornecedores
- **products** - Produtos com relacionamento com fornecedores
- **sales** - Vendas realizadas
- **sale_items** - Itens de cada venda

### Configuração do Supabase

1. Crie um novo projeto no Supabase
2. Execute o SQL presente em `src/services/supabase.ts` no editor SQL
3. Configure as políticas RLS conforme necessário
4. Ative o Storage para upload de recibos

## 🚦 Sistema de Roles

### Admin
- Acesso completo a todos os módulos
- Pode gerenciar usuários, produtos, fornecedores
- Acesso a todos os relatórios

### Gestor de Stock
- Gestão de produtos e fornecedores
- Relatórios e análise ABC
- Não pode realizar vendas diretas

### Operador
- Pode realizar vendas
- Visualizar dashboard
- Acesso limitado aos relatórios

## 🎨 Design System

### Cores Principais
- **Primary**: Azul (#3b82f6)
- **Success**: Verde (#22c55e) 
- **Background**: Cinza claro (#f9fafb)
- **Text**: Cinza escuro (#111827)

### Princípio AIDA
- **Atenção**: Design limpo e organizado
- **Interesse**: Informações claras e acessíveis
- **Desejo**: Interface intuitiva e eficiente
- **Ação**: Botões destacados e calls-to-action claros

## 📊 Análise ABC

Sistema de classificação de produtos baseado em:
- **Classe A**: Baixo stock, alto valor (necessita atenção)
- **Classe B**: Médio stock e valor (monitoramento regular)
- **Classe C**: Alto stock, baixo valor (gestão simplificada)

## 🔄 Status do Desenvolvimento

- ✅ **Configuração inicial** - Vite, React, TypeScript, Tailwind
- ✅ **Sistema de autenticação** - Supabase Auth com roles
- ✅ **Layout base** - Sidebar, Navbar, Footer, Layout principal
- ✅ **Páginas principais** - Login e Dashboard funcionais
- 🔄 **CRUD de Produtos** - Em desenvolvimento
- 🔄 **CRUD de Fornecedores** - Em desenvolvimento
- 🔄 **Sistema de Vendas** - Em desenvolvimento
- 🔄 **Geração de PDFs** - Em planejamento
- 🔄 **Relatórios** - Em planejamento
- 🔄 **Análise ABC** - Em planejamento

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
