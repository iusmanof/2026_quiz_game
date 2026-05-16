# Quize game

## Stack: Node.js Nest.js TypeScript Swagger DDD CQRS PostgreSQL


02 x https://github.com/it-incubator/ed-back-sprint-1-lesson-2
03 + https://github.com/it-incubator/ed-back-sprint-1-lesson-3.git
     https://github.com/it-incubator/ed-back-sprint-1-lesson-3/blob/swagger/src/drivers/docs/drivers.swagger.yml

04  https://github.com/it-incubator/ed-back-sprint-1-lesson-4
05  https://github.com/it-incubator/ed-back-lessons-sprint-2/tree/lesson-5
06  https://github.com/it-incubator/ed-back-lessons-sprint-2/tree/lesson-6
07  null
08  null
09  null
10  https://github.com/it-incubator/ed-back-12-lesson/tree/lesson-2
11  https://github.com/it-incubator/ed-back-12-lesson/tree/lesson-2
12  https://github.com/it-incubator/ed-back-12-lesson/tree/lesson-4-ddd
13  https://github.com/it-incubator/ed-back-lessons-bloggers-nest
14  https://github.com/it-incubator/ed-back-lessons-bloggers-nest/tree/lesson-2-pipes-guards-filters-tests
15  https://github.com/it-incubator/ed-back-lessons-bloggers-nest/tree/lesson-3-usecases-cqrs
16  https://github.com/it-incubator/ed-back-lessons-bloggers-nest/tree/lesson-4-env-scopes
17  null
18  null
19  null
20  null
21  null
22  https://github.com/it-incubator/nestjs/tree/main/examples/nestjs/typeorm-postgresql-wallets-query-builder
23  https://github.com/it-incubator/ed-back-lessons-typeorm
24  null


TODO:

1. DatabaseConfig
2. Create DB in PostgresSQL
3. pnpm i typeorm
4. pnpm i @nestjs/config
5. add env files
6. dynamic config module
7. pnpm i pg
8. pnpm install @nestjs/config @nestjs/typeorm typeorm pg
9. for Windows pnpm install cross-env
10. pnpm install class-validator class-transformer
11. config-validation.utility.ts
12. architecture folder
13. pnpm install @nestjs/cqrs


src/
├── main.ts
├── app.module.ts
│
├── core/                         # global infrastructure
│   ├── config/
│   ├── database/
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   ├── decorators/
│   ├── logger/
│   ├── exceptions/
│   └── constants/
│
├── modules/
│   └── auth/
│       ├── account.module.ts
│       │
│       ├── api/                 # transport layer
│       │   ├── controllers/
│       │   │   └── auth.controller.ts
│       │   │
│       │   ├── dto/
│       │   │   ├── login.dto.ts
│       │   │   ├── register.dto.ts
│       │   │   └── refresh-token.dto.ts
│       │   │
│       │   └── presenters/
│       │
│       ├── application/         # CQRS layer
│       │   ├── commands/
│       │   │   ├── handlers/
│       │   │   │   ├── login.handler.ts
│       │   │   │   ├── register.handler.ts
│       │   │   │   └── refresh-token.handler.ts
│       │   │   │
│       │   │   ├── impl/
│       │   │   │   ├── login.command.ts
│       │   │   │   ├── register.command.ts
│       │   │   │   └── refresh-token.command.ts
│       │   │
│       │   ├── queries/
│       │   │   ├── handlers/
│       │   │   └── impl/
│       │   │
│       │   ├── events/
│       │   │   ├── handlers/
│       │   │   └── impl/
│       │   │
│       │   ├── services/
│       │   │   ├── password-hasher.service.ts
│       │   │   ├── jwt-token.service.ts
│       │   │   └── auth-policy.service.ts
│       │   │
│       │   └── sagas/
│       │
│       ├── domain/              # pure business rules
│       │   ├── entities/
│       │   │   └── user.entity.ts
│       │   │
│       │   ├── value-objects/
│       │   │   ├── email.vo.ts
│       │   │   └── password.vo.ts
│       │   │
│       │   ├── repositories/
│       │   │   └── user.repository.interface.ts
│       │   │
│       │   ├── services/
│       │   ├── events/
│       │   ├── exceptions/
│       │   └── enums/
│       │
│       ├── infrastructure/      # external implementations
│       │   ├── persistence/
│       │   │   ├── entities/
│       │   │   │   └── user.orm-entity.ts
│       │   │   │
│       │   │   ├── repositories/
│       │   │   │   └── user.repository.ts
│       │   │   │
│       │   │   └── migrations/
│       │   │
│       │   ├── adapters/
│       │   │   ├── bcrypt.adapter.ts
│       │   │   ├── jwt.adapter.ts
│       │   │   └── mailer.adapter.ts
│       │   │
│       │   └── strategies/
│       │       ├── jwt.strategy.ts
│       │       └── local.strategy.ts
│       │
│       └── tests/
│           ├── unit/
│           ├── integration/
│           └── e2e/
│
└── shared/                      # reusable cross-module utilities
├── dto/
├── utils/
├── types/
├── helpers/
└── abstractions/