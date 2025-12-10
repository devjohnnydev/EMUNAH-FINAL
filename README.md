# EMUNHAH - Loja Evangélica

Uma loja virtual moderna para roupas e acessórios que expressam a fé com elegância e propósito.

## Sobre o Projeto

EMUNHAH (do hebraico "fé" ou "fidelidade") é uma plataforma de e-commerce voltada para o público evangélico, oferecendo produtos de qualidade que celebram a fé cristã de forma elegante e minimalista.

### Slogan
*"Fé que se veste."* / *"Vista-se com propósito."*

## Funcionalidades

### Para Clientes
- Navegação por catálogo de produtos
- Carrinho de compras
- Sistema de orçamentos personalizados
- Página institucional (Sobre)
- Design responsivo para todos os dispositivos

### Para Administradores
- Painel administrativo protegido
- Gerenciamento de produtos
- Gerenciamento de estampas/prints
- Sistema de orçamentos
- Dashboard com métricas

## Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/UI** - Componentes de interface
- **Wouter** - Roteamento
- **TanStack Query** - Gerenciamento de estado assíncrono
- **Zustand** - Gerenciamento de estado local
- **Framer Motion** - Animações
- **Lucide React** - Ícones

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Drizzle ORM** - Object-Relational Mapping
- **PostgreSQL** - Banco de dados
- **Zod** - Validação de schemas

## Estrutura do Projeto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── lib/           # Utilitários e configurações
│   │   └── hooks/         # Custom React hooks
│   └── public/            # Arquivos estáticos
├── server/                 # Backend Express
│   ├── routes.ts          # Rotas da API
│   ├── storage.ts         # Interface de armazenamento
│   └── index.ts           # Entrada do servidor
├── shared/                 # Código compartilhado
│   └── schema.ts          # Schemas do banco de dados
└── attached_assets/        # Assets anexados
```

## Páginas Principais

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial com hero e produtos em destaque |
| `/shop` | Catálogo completo de produtos |
| `/about` | Página institucional sobre a marca |
| `/cart` | Carrinho de compras |
| `/admin/login` | Login do sistema administrativo |
| `/admin/dashboard` | Dashboard administrativo |
| `/admin/products` | Gerenciamento de produtos |
| `/admin/prints` | Gerenciamento de estampas |
| `/admin/quotes` | Gerenciamento de orçamentos |

## Instalação e Execução

### Pré-requisitos
- Node.js 20+
- PostgreSQL (opcional, usa armazenamento em memória por padrão)

### Passos

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente (se usar banco de dados):
```bash
DATABASE_URL=postgresql://usuario:senha@localhost:5432/emunhah
```

3. Execute as migrações (se usar banco de dados):
```bash
npm run db:push
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse a aplicação em `http://localhost:5000`

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila para produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run db:push` | Sincroniza o schema com o banco de dados |

## Deploy

A aplicação está configurada para deploy na plataforma Replit com:
- Build: `npm run build`
- Run: `npm run start`
- Target: Autoscale

## Paleta de Cores

| Cor | Uso |
|-----|-----|
| Bordô (#722F37) | Cor primária, botões e destaques |
| Bege (#F5F1EB) | Fundos e áreas neutras |
| Dourado (#C9A962) | Acentos e detalhes premium |

## Licença

Este projeto é proprietário e todos os direitos são reservados à EMUNHAH.

---

Desenvolvido com propósito para vestir a fé.
