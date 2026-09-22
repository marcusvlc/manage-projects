# Gestão de projetos

Aplicação de gestão de projetos desenvolvida com Nuxt e Vue, focada em criar, visualizar, editar, remover e favoritar projetos de forma simples e intuitiva.

## Resumo da aplicação

Este projeto simula um painel de gerenciamento de projetos em que o usuário pode:

- cadastrar novos projetos;
- editar informações existentes;
- marcar projetos como favoritos;
- filtrar por favoritos e buscar por nome;
- ordenar a lista por diferentes critérios;
- manter os dados salvos localmente no navegador.

A aplicação foi estruturada para oferecer uma experiência limpa, responsiva e com persistência de dados sem depender de um backend externo.

## Tecnologias utilizadas

- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS
- LocalForage
- Vue 3 Toastify
- Lucide Vue Next

## Funcionalidades

### Cadastro e edição de projetos

- Criação de novos projetos com campos como nome, cliente, datas e imagem de capa.
- Edição de projetos já cadastrados.
- Navegação entre páginas de listagem, criação e edição.

### Listagem e organização

- Visualização de todos os projetos em uma lista centralizada.
- Ordenação por:
  - ordem alfabética;
  - projetos iniciados mais recentemente;
  - prazo mais próximo.

### Filtros e busca

- Busca por texto no nome dos projetos.
- Filtro para exibir apenas favoritos.
- Mensagens visuais para quando não há resultados ou quando a lista está vazia.

### Persistência local

- Os dados são armazenados localmente com IndexedDB via LocalForage.
- Isso permite que o estado dos projetos permaneça salvo mesmo após atualizar a página.

### Interações de usuário

- Marcar e desmarcar projetos como favoritos.
- Remoção com confirmação antes da exclusão.
- Feedback visual por meio de toasts de sucesso e erro.

## Estrutura do projeto

A estrutura principal está organizada em:

- app/pages: páginas da aplicação
- app/components: componentes reutilizáveis
- app/composables: lógica de estado, filtros e persistência
- app/types: tipos do domínio
- app/utils: utilitários e regras de ordenação

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- Node.js
- pnpm

## Instalação

```bash
pnpm install
```

## Executando o projeto

```bash
pnpm dev
```

A aplicação fica disponível em:

```bash
http://localhost:3000
```

## Build para produção

```bash
pnpm build
```

## Preview da build

```bash
pnpm preview
```

## Observações

Este projeto foi pensado como uma solução front-end simples e funcional para gestão de projetos, com foco em experiência de usuário, organização visual e persistência local de dados.
