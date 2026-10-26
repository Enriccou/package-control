# 🏢 Sistema de Controle de Encomendas - Backend NestJS

Backend para gerenciamento de encomendas em condomínios residenciais, com notificação via WhatsApp (wa.me).

## 📋 Sobre

Sistema desenvolvido com **NestJS + CQRS** para:
- ✅ Autenticação JWT com roles (ADMIN/MANAGER)
- ✅ Gestão de moradores (residents)
- ✅ Gestão de encomendas (packages)
- ✅ Notificação via WhatsApp (links wa.me - sem custos)
- ✅ Relatórios de pendências
- ✅ Soft delete para auditoria

## 🚀 Quick Start

### Pré-requisitos
```
Node.js 16+
MongoDB 6+
npm ou yarn
```

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais MongoDB

# 3. Iniciar servidor em desenvolvimento
npm run start:dev
```

### Variáveis de Ambiente

Veja `.env.example` para referência completa:

```env
MONGODB_URI=mongodb://localhost:27017/package-system
JWT_SECRET=seu-secret-super-seguro
JWT_EXPIRATION=3600
NODE_ENV=development
PORT=3000
```

## 📁 Estrutura do Projeto

```
src/
├── modules/              # Features/Domains (adicione seus módulos aqui)
├── common/               # Filtros, Guards, Decoradores compartilhados
├── config/               # Configurações (database, jwt, etc)
├── app.module.ts         # Módulo raiz
└── main.ts              # Entry point
```

## 🏛️ Padrão CQRS

O projeto segue o padrão **CQRS** (Command Query Responsibility Segregation):

- **Commands** - Modificam estado (Create, Update, Delete)
- **Queries** - Leem dados (Get, List)
- **Handlers** - Orquestram services e controlam regra de negócio
- **Controllers** - Apenas roteamento HTTP
- **Services** - Lógica isolada e reutilizável
- **Repositories** - Abstração de dados (MongoDB)

## 📚 Stack Tecnológico

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| NestJS | 12.x | Framework |
| NestJS CQRS | 10.x | Padrão CQRS |
| TypeScript | 6.x | Linguagem |
| MongoDB | 6.x+ | Banco de dados |
| Mongoose | 8.x | ODM |
| JWT | 12.x | Autenticação |
| bcryptjs | 2.x | Hash de senhas |
| class-validator | 0.14.x | Validação |

## 🔧 Scripts

```bash
# Desenvolvimento
npm run start:dev          # Inicia com watch mode
npm run start:debug        # Inicia com debug

# Produção
npm run build             # Build para produção
npm run start:prod        # Inicia build de produção

# Testes
npm test
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Observability

In production applications, observability is essential for understanding how your system behaves, detecting issues early, and maintaining reliable performance.

[NestJS Observe](https://observe.nestjs.com) automatically instruments your NestJS application, giving you deep visibility into your system with minimal setup:

- **Distributed tracing:** Follow requests across services and understand how they flow through your system.
- **Waterfall analysis:** Visualize request execution and identify slow operations, bottlenecks, and unexpected delays.
- **Performance analysis:** Analyze application performance in real time and quickly pinpoint areas that need optimization.
- **Metrics:** Track key application and infrastructure metrics to understand system health and performance trends.
- **Logging:** Centralize and correlate logs with traces and other telemetry to make debugging easier.
- **Error tracking:** Detect errors quickly and investigate their root causes with the surrounding context.
- **SLA monitoring:** Track service-level objectives and identify when your application is approaching or exceeding defined thresholds.
- **Alarms and alerts:** Set up alerts for critical errors, performance degradation, SLA violations, and other anomalies so your team can react quickly.

To add it to this project, run this and approve the code it prints at [observe.nestjs.com/link](https://observe.nestjs.com/link) - signing up for free if you have no account:

```bash
$ npx @nestjs/observe link
```

It installs `@nestjs/observe`, wires it into `AppModule` and `main.ts`, and writes the app key and secret into `.env`, which every `nest start` script (`start`, `start:dev`, `start:debug`) then loads. In production, set `OBSERVE_APP_KEY` and `OBSERVE_APP_SECRET` in the environment instead.

Or do it by hand:

```bash
$ pnpm install @nestjs/observe
```

Then follow the [setup guide](https://docs.nestjs.com/observability/sdk) - it takes a single import and an app key.

The free plan needs no payment details and covers 300,000 events a month. You can also browse the [live demo](https://www.observe-demo.nestjs.com/dashboard) first - the whole dashboard over a busy service's data, with nothing to install.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Auto-instrument your application with [NestJS Observe](https://observe.nestjs.com). Distributed tracing, metrics, and logging made easy. Error tracking and performance monitoring for your NestJS applications.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
