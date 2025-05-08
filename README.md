# Pengtoshi Boilerplate

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?color=green&labelColor=#5D5D5D)](https://github.com/toss/suspensive/blob/main/LICENSE)

> TS-based boilerplate for development including client, server, and shared libraries.
> <br>

<br/>

## 🛠 Tech Stack

This boilerplate is built with [NX](https://nx.dev/), a smart, fast and extensible build system with first class monorepo support and powerful integrations.

<table>
  <tr>
    <td><strong>Common</strong></td>
    <td><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white"/> <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"/> <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/></td>
  </tr>
  <tr>
    <td><strong>Repository & Styling</strong></td>
    <td><img src="https://img.shields.io/badge/workspace-143157?style=for-the-badge&logo=NX&logoColor=white"/> <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E"/> <img src="https://img.shields.io/badge/Commitlint-000000?style=for-the-badge&logo=commitlint&logoColor=white" alt="Commitlint"></td>
  </tr>
  <tr>
    <td><strong>Applications</strong></td>
    <td><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"> <img src="https://img.shields.io/badge/Nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="Nest.js"></td>
  </tr>
  <tr>
  <td><strong>UI & Design</strong></td>
  <td><img src="https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white" alt="Storybook">
  <img src="https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge" alt="Shadcn UI">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  </td>
  </tr>
  <tr>
    <td><strong>Database & ORM</strong></td>
    <td>
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma"/>
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"> <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"></td>
  </tr>
</table>

<br/>

## 📁 Folder Structure

```
📁 pengtoshi-boilerplate
├── 📁 apps
│   ├── 📁 client-next        # Next.js client app example
│   ├── 📁 server-nest        # NestJS server app example
│   └── 📁 server-nest-e2e    # E2E tests for NestJS server
├── 📁 libs                   # Shared libraries
├── 📁 tools                  # Tools for development
└── 📁 docs                   # Documentation
```

<br/>

## 🚀 Getting Started

### Installation

```bash
yarn install
```

### Start Applications

Start all applications in development mode:

```bash
yarn start:all
```

**Only for the first time**: This command will start the docker containers first, run the migrations, and start the applications. After that, you can start the applications by running `yarn start:all`.

```bash
yarn docker:up
yarn db-migrate:dev
yarn start:all
```

Start a specific application:

```bash
yarn start <app-name>
```

### Testing

Run all tests:

```bash
yarn test:all
```

Run tests for a specific application:

```bash
yarn test <app-name>
```

### Linting

Run linting for all applications:

```bash
yarn lint:all
```

Run linting for a specific application:

```bash
yarn lint <app-name>
```

### Database

Generates Prisma Client and synchronizes the database schema:

```bash
yarn prepare:prisma
```

Run database migrations:

```bash
yarn db-migrate:dev
```

### Storybook

Start Storybook:

```bash
yarn storybook
```

Build only:

```bash
yarn build-storybook
```
