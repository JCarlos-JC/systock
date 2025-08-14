# SyStock - Sistema de Gestão de Stock

SyStock é um sistema completo de gestão de stock com foco em procurement, relatórios e emissão de recibos. Desenvolvido com tecnologias modernas para oferecer uma experiência intuitiva e eficiente.

## 🚀 Tecnologias

- **Frontend**: React + Tailwind CSS
- **Backend/Database**: Supabase (PostgreSQL + Auth)
- **PDF Generation**: jsPDF
- **Charts**: Chart.js
- **Icons**: Lucide React

## ✨ Funcionalidades

### 🔐 Autenticação e Gestão de Usuários
- Sistema de login com Supabase Auth
- Perfis de usuário com diferentes papéis:
  - **Administrador**: Acesso total ao sistema
  - **Operador de Caixa**: Vendas e gestão de caixa
  - **Gestor de Stock**: Produtos, fornecedores e relatórios
- Controle de permissões baseado em papéis

### 💰 Gestão de Caixa
- Abertura de caixa com saldo inicial
- Fecho de caixa com resumo de vendas
- Controle de sessões de caixa

### 📦 Gestão de Produtos e Fornecedores
- CRUD completo de produtos
- CRUD completo de fornecedores
- Associação obrigatória produto-fornecedor
- Controle de stock em tempo real

### 🛒 Sistema de Vendas
- Carrinho de vendas interativo
- Validação de stock disponível
- Redução automática de stock após venda
- Geração de recibos em PDF
- Armazenamento de recibos no Supabase Storage

### 📊 Relatórios e Analytics
- Relatório geral de vendas (filtros por período)
- Relatório de fornecedores
- Lista de produtos exportável em PDF
- Análise ABC do stock com gráficos:
  - **A**: Baixa quantidade, alto valor
  - **B**: Quantidade e valor moderados  
  - **C**: Alta quantidade, baixo valor

## 🎨 Design e Layout

O sistema segue uma estrutura consistente com:
- **Sidebar**: Navegação principal com ícones e nomes
- **Navbar**: Informações do usuário, pesquisa e notificações
- **Content**: Área principal dos módulos
- **Footer**: Informações da aplicação

### Design System
- Cores neutras com destaques em azul e verde
- Princípios AIDA Marketing aplicados:
  - **Atenção**: Títulos e ícones chamativos
  - **Interesse**: Gráficos e dashboards dinâmicos
  - **Desejo**: Botões destacados para ações importantes
  - **Ação**: Fluxo simples e direto

## 🏗️ Estrutura do Banco de Dados

```sql
users (extends auth.users)
├── id (PK)
├── name
├── email
├── role (admin, operador, gestor)
└── created_at

suppliers
├── id (PK)
├── name
├── contact
├── address
└── created_at

products
├── id (PK)
├── name
├── code (unique)
├── category
├── quantity
├── purchase_price
├── sale_price
├── supplier_id (FK)
└── created_at

sales
├── id (PK)
├── user_id (FK)
├── sale_date
├── total_amount
├── receipt_url
└── created_at

sale_items
├── id (PK)
├── sale_id (FK)
├── product_id (FK)
├── quantity_sold
└── price_per_unit

cash_register
├── id (PK)
├── opening_amount
├── closing_amount
├── opened_by (FK)
├── closed_by (FK)
├── opened_at
└── closed_at
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- Conta Supabase (para produção)

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
# Copie o arquivo .env e configure suas credenciais Supabase
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

4. Execute o banco de dados:
```bash
# Use o arquivo database-schema.sql no seu projeto Supabase
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### Modo Demonstração

Se as variáveis do Supabase não estiverem configuradas, o sistema rodará em modo demonstração com dados fictícios.

**Credenciais de demo:**
- Email: `demo@systock.com`
- Senha: `demo123`

## 🏗️ Build para Produção

```bash
npm run build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.jsx      # Layout principal
│   ├── Sidebar.jsx     # Barra lateral de navegação
│   ├── Navbar.jsx      # Barra superior
│   └── Footer.jsx      # Rodapé
├── pages/              # Páginas da aplicação
│   ├── LoginPage.jsx   # Página de login
│   └── DashboardPage.jsx # Dashboard principal
├── hooks/              # Hooks customizados
│   └── useAuth.jsx     # Contexto de autenticação
├── lib/                # Utilitários e configurações
│   └── supabase.js     # Configuração do Supabase
└── utils/              # Funções utilitárias
```

## 🔒 Segurança

- Row Level Security (RLS) habilitado no Supabase
- Políticas de acesso baseadas em papéis
- Validação de dados no frontend e backend
- Senhas hasheadas pelo Supabase Auth

## 📝 Próximos Passos

- [ ] Implementar módulos de vendas completos
- [ ] Adicionar gestão de produtos (CRUD)
- [ ] Criar sistema de fornecedores
- [ ] Implementar relatórios avançados
- [ ] Adicionar análise ABC com gráficos
- [ ] Geração de PDFs para recibos
- [ ] Sistema de notificações
- [ ] Testes automatizados
- [ ] Documentação da API

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

- Email: suporte@systock.com
- Documentação: [Em desenvolvimento]
- Issues: [GitHub Issues](https://github.com/JCarlos-JC/systock/issues)

---

**SyStock** - Gerencie seu stock com inteligência 📦✨
