# 🏗️ Fase 2 - Backend & API - Guia Completo de Implementação

**Período:** Outubro - Dezembro 2025 (12 semanas)  
**Status:** 📋 Planejamento Detalhado  
**Prioridade:** 🔥 Crítica

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Semana 1-2: Setup Infraestrutura](#semana-1-2-setup-infraestrutura)
3. [Semana 3-4: Database & Autenticação](#semana-3-4-database--autenticação)
4. [Semana 5-6: APIs Core](#semana-5-6-apis-core)
5. [Semana 7-8: Integração Frontend](#semana-7-8-integração-frontend)
6. [Semana 9-10: Testing & Otimização](#semana-9-10-testing--otimização)
7. [Semana 11-12: Deploy & Monitoring](#semana-11-12-deploy--monitoring)
8. [Checklist Completo](#checklist-completo)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

### Objetivo da Fase 2

Migrar do LocalStorage (frontend) para um backend completo e profissional com:
- ✅ API RESTful documentada
- ✅ Database PostgreSQL com migrations
- ✅ Autenticação JWT + Refresh Tokens
- ✅ Cache com Redis
- ✅ Deploy em produção
- ✅ Monitoring e logs

### Arquitetura Final

```
┌─────────────────────────────────────────────────────────┐
│                    USUÁRIOS                              │
│   (Navegador, Mobile, Desktop)                          │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (Vite + React)                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │  - Vite Dev Server (http://localhost:5173)      │  │
│  │  - React 19 + TypeScript                         │  │
│  │  - Zustand (state)                               │  │
│  │  - Axios (HTTP client)                           │  │
│  └──────────────────────────────────────────────────┘  │
└────────────┬────────────────────────────────────────────┘
             │
             │ HTTPS (REST API)
             ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                 │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Express Server (http://localhost:3000)          │  │
│  │  ├─ Routes (API endpoints)                       │  │
│  │  ├─ Controllers (business logic)                 │  │
│  │  ├─ Services (data access)                       │  │
│  │  ├─ Middlewares (auth, validation, errors)      │  │
│  │  └─ Utils (helpers, formatters)                 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │  PostgreSQL  │  │    Redis     │  │   Logging   │  │
│  │  (Database)  │  │   (Cache)    │  │  (Winston)  │  │
│  │  Port: 5432  │  │  Port: 6379  │  │             │  │
│  └──────────────┘  └──────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│              SERVICES EXTERNOS                           │
│  ├─ SendGrid (emails)                                   │
│  ├─ Cloudinary (imagens, futuro)                        │
│  └─ Sentry (error tracking)                             │
└─────────────────────────────────────────────────────────┘
```

### Stack Tecnológico

```typescript
// Backend
{
  "runtime": "Node.js 20 LTS",
  "framework": "Express.js 4.18",
  "language": "TypeScript 5.3",
  "database": "PostgreSQL 16",
  "cache": "Redis 7.2",
  "orm": "Prisma 5.7" ou "TypeORM 0.3",
  "validation": "Zod 3.22",
  "authentication": "jsonwebtoken 9.0 + bcrypt 5.1",
  "email": "SendGrid SDK 7.7",
  "logging": "Winston 3.11",
  "testing": "Jest 29 + Supertest 6.3",
  "containerization": "Docker 24 + Docker Compose"
}
```

---

## 📅 Semana 1-2: Setup Infraestrutura

### Dia 1-2: Inicialização do Projeto Backend

#### 1. Criar estrutura de pastas

```bash
# No diretório raiz do projeto
cd "C:\Users\up739088\Desktop\aplicaçoes,sites,etc\DR_infantil"

# Criar pasta backend
mkdir backend
cd backend

# Inicializar projeto Node.js
npm init -y

# Instalar TypeScript
npm install --save-dev typescript @types/node ts-node nodemon
npx tsc --init
```

#### 2. Configurar `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

#### 3. Estrutura de pastas completa

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts       # Config PostgreSQL
│   │   ├── redis.ts          # Config Redis
│   │   └── env.ts            # Variáveis de ambiente
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── diseases.controller.ts
│   │   ├── submissions.controller.ts
│   │   ├── analytics.controller.ts
│   │   └── feedback.controller.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── diseases.service.ts
│   │   ├── submissions.service.ts
│   │   ├── email.service.ts
│   │   └── cache.service.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── diseases.routes.ts
│   │   ├── submissions.routes.ts
│   │   ├── analytics.routes.ts
│   │   └── index.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── rateLimit.middleware.ts
│   │
│   ├── models/              # Se usar TypeORM
│   │   ├── User.model.ts
│   │   ├── Disease.model.ts
│   │   └── Submission.model.ts
│   │
│   ├── prisma/              # Se usar Prisma
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   └── validators.ts
│   │
│   ├── types/
│   │   ├── express.d.ts     # Extend Express types
│   │   └── index.ts
│   │
│   ├── app.ts               # Express app config
│   └── server.ts            # Server entry point
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

#### 4. Instalar dependências principais

```bash
# Express e tipos
npm install express
npm install --save-dev @types/express

# Middleware essenciais
npm install cors helmet morgan compression cookie-parser
npm install --save-dev @types/cors @types/morgan @types/cookie-parser

# Database & ORM
npm install prisma @prisma/client
npm install --save-dev prisma

# Validação
npm install zod

# Autenticação
npm install jsonwebtoken bcrypt
npm install --save-dev @types/jsonwebtoken @types/bcrypt

# Redis
npm install redis
npm install --save-dev @types/redis

# Email
npm install @sendgrid/mail

# Logging
npm install winston winston-daily-rotate-file

# Dotenv
npm install dotenv

# Rate limiting
npm install express-rate-limit

# Testing
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest

# Utilities
npm install date-fns uuid
npm install --save-dev @types/uuid
```

#### 5. Scripts no `package.json`

```json
{
  "name": "dr-infantil-backend",
  "version": "1.0.0",
  "description": "Backend API para DR Infantil",
  "main": "dist/server.js",
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "lint": "eslint . --ext .ts",
    "format": "prettier --write \"src/**/*.ts\""
  }
}
```

### Dia 3-4: Docker & Docker Compose

#### 1. Criar `Dockerfile`

```dockerfile
# backend/Dockerfile
FROM node:20-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build TypeScript
RUN npm run build

# Expor porta
EXPOSE 3000

# Comando de start
CMD ["npm", "start"]
```

#### 2. Criar `docker-compose.yml`

```yaml
# backend/docker-compose.yml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: dr-infantil-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USER:-drinfantil}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-dev_password_123}
      POSTGRES_DB: ${DB_NAME:-drinfantil_db}
    ports:
      - "${DB_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-db.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - drinfantil-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U drinfantil"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7.2-alpine
    container_name: dr-infantil-redis
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD:-dev_redis_123}
    ports:
      - "${REDIS_PORT:-6379}:6379"
    volumes:
      - redis_data:/data
    networks:
      - drinfantil-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  # Backend API
  api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: dr-infantil-api
    restart: unless-stopped
    ports:
      - "${API_PORT:-3000}:3000"
    environment:
      NODE_ENV: ${NODE_ENV:-development}
      PORT: 3000
      DATABASE_URL: postgresql://${DB_USER:-drinfantil}:${DB_PASSWORD:-dev_password_123}@postgres:5432/${DB_NAME:-drinfantil_db}
      REDIS_URL: redis://:${REDIS_PASSWORD:-dev_redis_123}@redis:6379
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - drinfantil-network
    volumes:
      - ./src:/app/src
      - ./logs:/app/logs

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local

networks:
  drinfantil-network:
    driver: bridge
```

#### 3. Criar `.env.example`

```env
# backend/.env.example

# Server
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# Frontend (CORS)
FRONTEND_URL=http://localhost:5173

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USER=drinfantil
DB_PASSWORD=your_secure_password_here
DB_NAME=drinfantil_db
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password_here
REDIS_URL=redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# SendGrid (Email)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@drinfantil.com.br
SENDGRID_FROM_NAME=DR Infantil

# Sentry (Error Tracking - opcional)
SENTRY_DSN=your_sentry_dsn_here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
LOG_FILE_PATH=./logs
```

#### 4. Iniciar containers

```bash
# Copiar .env.example para .env
cp .env.example .env

# Editar .env com suas credenciais
# Importante: Gerar JWT secrets fortes!

# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

# Parar e limpar volumes (cuidado!)
docker-compose down -v
```

### Dia 5: Setup Básico do Express

#### Criar `src/app.ts`

```typescript
// backend/src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { config } from './config/env';
import { logger } from './utils/logger';
import { errorHandler } from './middlewares/error.middleware';
import routes from './routes';

const app: Application = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Compression
app.use(compression());

// Logging
if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim())
    }
  }));
}

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env
  });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler (deve ser o último middleware)
app.use(errorHandler);

export default app;
```

#### Criar `src/server.ts`

```typescript
// backend/src/server.ts
import app from './app';
import { config } from './config/env';
import { logger } from './utils/logger';
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';

const PORT = config.port || 3000;

async function startServer() {
  try {
    // Conectar ao banco de dados
    await connectDatabase();
    logger.info('✅ Database connected successfully');

    // Conectar ao Redis
    await connectRedis();
    logger.info('✅ Redis connected successfully');

    // Iniciar servidor
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📝 Environment: ${config.env}`);
      logger.info(`🌐 API: http://localhost:${PORT}/api`);
      logger.info(`❤️  Health: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();
```

#### Criar `src/config/env.ts`

```typescript
// backend/src/config/env.ts
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  API_URL: z.string().url(),
  FRONTEND_URL: z.string().url(),

  // Database
  DATABASE_URL: z.string().min(1),
  
  // Redis
  REDIS_URL: z.string().min(1),
  
  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  
  // SendGrid
  SENDGRID_API_KEY: z.string().optional(),
  SENDGRID_FROM_EMAIL: z.string().email().optional(),
  
  // Logging
  LOG_LEVEL: z.string().default('info'),
});

const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  console.error('❌ Invalid environment variables:');
  console.error(envValidation.error.format());
  process.exit(1);
}

export const config = {
  env: envValidation.data.NODE_ENV,
  port: envValidation.data.PORT,
  apiUrl: envValidation.data.API_URL,
  frontendUrl: envValidation.data.FRONTEND_URL,
  
  database: {
    url: envValidation.data.DATABASE_URL,
  },
  
  redis: {
    url: envValidation.data.REDIS_URL,
  },
  
  jwt: {
    secret: envValidation.data.JWT_SECRET,
    refreshSecret: envValidation.data.JWT_REFRESH_SECRET,
    expiresIn: envValidation.data.JWT_EXPIRES_IN,
    refreshExpiresIn: envValidation.data.JWT_REFRESH_EXPIRES_IN,
  },
  
  sendgrid: {
    apiKey: envValidation.data.SENDGRID_API_KEY,
    fromEmail: envValidation.data.SENDGRID_FROM_EMAIL,
  },
  
  logging: {
    level: envValidation.data.LOG_LEVEL,
  },
};
```

#### Criar `src/utils/logger.ts`

```typescript
// backend/src/utils/logger.ts
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { config } from '../config/env';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(metadata).length > 0) {
      msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
  })
);

const transports: winston.transport[] = [
  // Console
  new winston.transports.Console({
    format: consoleFormat,
  }),
];

// File logging em produção
if (config.env === 'production') {
  transports.push(
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '30d',
      format: logFormat,
    }),
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      format: logFormat,
    })
  );
}

export const logger = winston.createLogger({
  level: config.logging.level,
  format: logFormat,
  transports,
  exitOnError: false,
});
```

### Dia 6-7: Testar Setup Inicial

```bash
# Iniciar banco de dados e Redis
docker-compose up -d postgres redis

# Aguardar inicialização (30 segundos)

# Iniciar servidor em desenvolvimento
npm run dev

# Em outro terminal, testar health check
curl http://localhost:3000/health

# Deve retornar:
# {
#   "status": "OK",
#   "timestamp": "2025-10-03T...",
#   "uptime": 5.123,
#   "environment": "development"
# }
```

---

## 📅 Semana 3-4: Database & Autenticação

### Dia 8-10: Setup Prisma & Migrations

#### 1. Inicializar Prisma

```bash
npx prisma init
```

#### 2. Criar `prisma/schema.prisma`

```prisma
// backend/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========================================
// USERS & AUTHENTICATION
// ========================================

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      UserRole @default(USER)
  
  isVerified      Boolean  @default(false)
  verificationToken String?
  resetPasswordToken String?
  resetPasswordExpires DateTime?
  
  profile    UserProfile?
  tokens     RefreshToken[]
  submissions ContentSubmission[]
  feedback    Feedback[]
  analytics   UserEvent[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("users")
}

enum UserRole {
  PUBLIC
  USER
  CONTRIBUTOR
  PROFESSIONAL
  MODERATOR
  ADMIN
}

model UserProfile {
  id     String @id @default(uuid())
  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  avatar      String?
  bio         String?
  interests   String[]
  location    String?
  organization String?
  credentials  String?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("user_profiles")
}

model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  
  createdAt DateTime @default(now())
  
  @@map("refresh_tokens")
}

// ========================================
// DISEASES
// ========================================

model Disease {
  id          String          @id @default(uuid())
  name        String
  slug        String          @unique
  category    DiseaseCategory
  status      ContentStatus   @default(DRAFT)
  
  contents    DiseaseContent[]
  references  DiseaseReference[]
  
  views       Int      @default(0)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("diseases")
}

enum DiseaseCategory {
  NEUROLOGICAL
  CARDIAC
  RESPIRATORY
  METABOLIC
  IMMUNOLOGICAL
  GENETIC
  ONCOLOGICAL
  OTHER
}

enum ContentStatus {
  DRAFT
  PENDING
  APPROVED
  REJECTED
  PUBLISHED
}

model DiseaseContent {
  id         String  @id @default(uuid())
  diseaseId  String
  disease    Disease @relation(fields: [diseaseId], references: [id], onDelete: Cascade)
  
  level       ContentLevel
  description String       @db.Text
  
  authorId    String?
  reviewedBy  String?
  publishedAt DateTime?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("disease_contents")
}

enum ContentLevel {
  FOR_CHILDREN
  FOR_PARENTS
  SCIENTIFIC
}

model DiseaseReference {
  id        String  @id @default(uuid())
  diseaseId String
  disease   Disease @relation(fields: [diseaseId], references: [id], onDelete: Cascade)
  
  title String
  url   String
  type  String
  
  createdAt DateTime @default(now())
  
  @@map("disease_references")
}

// ========================================
// COMMUNITY SUBMISSIONS
// ========================================

model ContentSubmission {
  id     String            @id @default(uuid())
  type   SubmissionType
  status SubmissionStatus  @default(PENDING)
  
  submitterId String
  submitter   User   @relation(fields: [submitterId], references: [id])
  
  content Json // Conteúdo flexível (doença, história, recurso, etc.)
  
  flags QualityFlags?
  moderationActions ModerationAction[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("content_submissions")
}

enum SubmissionType {
  DISEASE_INFO
  PERSONAL_STORY
  EDUCATIONAL_RESOURCE
  VIDEO
  IMPROVEMENT_SUGGESTION
  OTHER
}

enum SubmissionStatus {
  PENDING
  UNDER_REVIEW
  APPROVED
  REJECTED
  REVISION_REQUESTED
}

model QualityFlags {
  id           String            @id @default(uuid())
  submissionId String            @unique
  submission   ContentSubmission @relation(fields: [submissionId], references: [id], onDelete: Cascade)
  
  hasScientificReferences Boolean @default(false)
  hasMultipleLevels       Boolean @default(false)
  hasSupportResources     Boolean @default(false)
  isFromVerifiedSource    Boolean @default(false)
  hasProperFormatting     Boolean @default(false)
  hasCompleteInformation  Boolean @default(false)
  
  score Int @default(0)
  
  @@map("quality_flags")
}

model ModerationAction {
  id           String            @id @default(uuid())
  submissionId String
  submission   ContentSubmission @relation(fields: [submissionId], references: [id], onDelete: Cascade)
  
  moderatorId String
  action      ModerationActionType
  reason      String?
  message     String?
  
  createdAt DateTime @default(now())
  
  @@map("moderation_actions")
}

enum ModerationActionType {
  APPROVE
  REJECT
  REQUEST_REVISION
  COMMENT
}

// ========================================
// ANALYTICS & FEEDBACK
// ========================================

model UserEvent {
  id     String @id @default(uuid())
  userId String?
  user   User?  @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  eventType String
  page      String?
  metadata  Json?
  
  sessionId String?
  ipAddress String?
  userAgent String?
  
  timestamp DateTime @default(now())
  
  @@map("user_events")
  @@index([userId, timestamp])
  @@index([eventType, timestamp])
}

model Feedback {
  id     String @id @default(uuid())
  userId String?
  user   User?  @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  type    FeedbackType
  message String       @db.Text
  rating  Int?
  page    String?
  
  status FeedbackStatus @default(PENDING)
  
  createdAt DateTime @default(now())
  
  @@map("feedback")
}

enum FeedbackType {
  BUG
  FEATURE_REQUEST
  GENERAL
  CONTENT_ISSUE
}

enum FeedbackStatus {
  PENDING
  IN_PROGRESS
  RESOLVED
  CLOSED
}
```

#### 3. Gerar migration e client

```bash
# Gerar migration
npx prisma migrate dev --name init

# Gerar Prisma Client
npx prisma generate

# Abrir Prisma Studio (GUI para database)
npx prisma studio
```

#### 4. Criar `src/config/database.ts`

```typescript
// backend/src/config/database.ts
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

// Log queries em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e: any) => {
    logger.debug(`Query: ${e.query}`);
    logger.debug(`Params: ${e.params}`);
    logger.debug(`Duration: ${e.duration}ms`);
  });
}

prisma.$on('error', (e: any) => {
  logger.error('Prisma Error:', e);
});

prisma.$on('warn', (e: any) => {
  logger.warn('Prisma Warning:', e);
});

export async function connectDatabase() {
  try {
    await prisma.$connect();
    logger.info('✅ Prisma connected to database');
  } catch (error) {
    logger.error('❌ Failed to connect to database:', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
  logger.info('Prisma disconnected from database');
}

export default prisma;
```

### Dia 11-14: Sistema de Autenticação Completo

#### 1. Utilitários de Autenticação

**Criar `src/utils/password.ts`**

```typescript
// backend/src/utils/password.ts
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Senha deve ter no mínimo 8 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra maiúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra minúscula');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Senha deve conter pelo menos um número');
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Senha deve conter pelo menos um caractere especial (!@#$%^&*)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

**Criar `src/utils/jwt.ts`**

```typescript
// backend/src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import crypto from 'crypto';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
}

export function generateRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });
}

export function verifyAccessToken(token: string): JWTPayload {
  return jwt.verify(token, config.jwt.secret) as JWTPayload;
}

export function verifyRefreshToken(token: string): JWTPayload {
  return jwt.verify(token, config.jwt.refreshSecret) as JWTPayload;
}

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function generateResetPasswordToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
```

#### 2. Middleware de Autenticação

**Criar `src/middlewares/auth.middleware.ts`**

```typescript
// backend/src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { logger } from '../utils/logger';
import prisma from '../config/database';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token não fornecido',
      });
    }
    
    const token = authHeader.substring(7);
    
    const payload = verifyAccessToken(token);
    
    // Verificar se usuário ainda existe
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true, isVerified: true },
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }
    
    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado',
        code: 'TOKEN_EXPIRED',
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido',
      });
    }
    
    logger.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro de autenticação',
    });
  }
}

export function authorize(...allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Não autenticado',
      });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Sem permissão',
      });
    }
    
    next();
  };
}
```

#### 3. Service de Autenticação

**Criar `src/services/auth.service.ts`**

```typescript
// backend/src/services/auth.service.ts
import prisma from '../config/database';
import { hashPassword, comparePassword, validatePasswordStrength } from '../utils/password';
import {
  generateAccessToken,
  generateRefreshToken,
  generateVerificationToken,
  verifyRefreshToken,
} from '../utils/jwt';
import { sendVerificationEmail, sendPasswordResetEmail } from './email.service';
import { addDays } from 'date-fns';

export class AuthService {
  async register(data: {
    email: string;
    password: string;
    name: string;
  }) {
    // Validar senha
    const passwordValidation = validatePasswordStrength(data.password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join(', '));
    }
    
    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }
    
    // Hash da senha
    const hashedPassword = await hashPassword(data.password);
    
    // Gerar token de verificação
    const verificationToken = generateVerificationToken();
    
    // Criar usuário
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        verificationToken,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isVerified: true,
      },
    });
    
    // Enviar email de verificação
    await sendVerificationEmail(user.email, user.name, verificationToken);
    
    return {
      user,
      message: 'Usuário criado! Verifique seu email.',
    };
  }
  
  async login(email: string, password: string) {
    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      throw new Error('Credenciais inválidas');
    }
    
    // Verificar senha
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }
    
    // Gerar tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    
    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    
    // Salvar refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: addDays(new Date(), 7),
      },
    });
    
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
      },
      accessToken,
      refreshToken,
    };
  }
  
  async refreshAccessToken(refreshToken: string) {
    // Verificar refresh token
    const payload = verifyRefreshToken(refreshToken);
    
    // Buscar token no database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });
    
    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new Error('Refresh token inválido ou expirado');
    }
    
    // Gerar novo access token
    const newAccessToken = generateAccessToken({
      userId: storedToken.user.id,
      email: storedToken.user.email,
      role: storedToken.user.role,
    });
    
    return {
      accessToken: newAccessToken,
    };
  }
  
  async logout(refreshToken: string) {
    await prisma.refreshToken.delete({
      where: { token: refreshToken },
    });
  }
  
  async verifyEmail(token: string) {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });
    
    if (!user) {
      throw new Error('Token de verificação inválido');
    }
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    });
    
    return { message: 'Email verificado com sucesso!' };
  }
}
```

#### 4. Controller de Autenticação

**Criar `src/controllers/auth.controller.ts`**

```typescript
// backend/src/controllers/auth.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { AuthService } from '../services/auth.service';
import { logger } from '../utils/logger';

const authService = new AuthService();

export class AuthController {
  async register(req: AuthRequest, res: Response) {
    try {
      const { email, password, name } = req.body;
      
      const result = await authService.register({ email, password, name });
      
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      logger.error('Register error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Erro ao criar usuário',
      });
    }
  }
  
  async login(req: AuthRequest, res: Response) {
    try {
      const { email, password } = req.body;
      
      const result = await authService.login(email, password);
      
      // Configurar cookie com refresh token
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      });
      
      res.status(200).json({
        success: true,
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (error: any) {
      logger.error('Login error:', error);
      res.status(401).json({
        success: false,
        message: error.message || 'Erro ao fazer login',
      });
    }
  }
  
  async refreshToken(req: AuthRequest, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
      
      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Refresh token não fornecido',
        });
      }
      
      const result = await authService.refreshAccessToken(refreshToken);
      
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      logger.error('Refresh token error:', error);
      res.status(401).json({
        success: false,
        message: error.message || 'Erro ao renovar token',
      });
    }
  }
  
  async logout(req: AuthRequest, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
      
      res.clearCookie('refreshToken');
      
      res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso',
      });
    } catch (error: any) {
      logger.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao fazer logout',
      });
    }
  }
  
  async verifyEmail(req: AuthRequest, res: Response) {
    try {
      const { token } = req.params;
      
      const result = await authService.verifyEmail(token);
      
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      logger.error('Verify email error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Erro ao verificar email',
      });
    }
  }
  
  async getCurrentUser(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Não autenticado',
        });
      }
      
      res.status(200).json({
        success: true,
        data: { user: req.user },
      });
    } catch (error: any) {
      logger.error('Get current user error:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário',
      });
    }
  }
}
```

#### 5. Rotas de Autenticação

**Criar `src/routes/auth.routes.ts`**

```typescript
// backend/src/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validation.middleware';
import { z } from 'zod';

const router = Router();
const authController = new AuthController();

// Schemas de validação
const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
    name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'Senha é obrigatória'),
  }),
});

// Rotas públicas
router.post('/register', validateRequest(registerSchema), authController.register.bind(authController));
router.post('/login', validateRequest(loginSchema), authController.login.bind(authController));
router.post('/refresh', authController.refreshToken.bind(authController));
router.get('/verify-email/:token', authController.verifyEmail.bind(authController));

// Rotas protegidas
router.post('/logout', authenticate, authController.logout.bind(authController));
router.get('/me', authenticate, authController.getCurrentUser.bind(authController));

export default router;
```

---

## 📅 Semana 5-6: APIs Core

*(Documentação das APIs principais será adicionada em seguida...)*

---

## ✅ Checklist Semana 1-2

### Setup Infraestrutura

- [ ] Criar pasta `backend/`
- [ ] Inicializar Node.js + TypeScript
- [ ] Configurar `tsconfig.json`
- [ ] Criar estrutura de pastas completa
- [ ] Instalar todas as dependências
- [ ] Configurar scripts no `package.json`
- [ ] Criar `Dockerfile`
- [ ] Criar `docker-compose.yml`
- [ ] Criar `.env.example`
- [ ] Copiar para `.env` e configurar
- [ ] Gerar JWT secrets fortes
- [ ] Criar `src/app.ts`
- [ ] Criar `src/server.ts`
- [ ] Criar `src/config/env.ts`
- [ ] Criar `src/utils/logger.ts`
- [ ] Iniciar containers Docker
- [ ] Testar conexão PostgreSQL
- [ ] Testar conexão Redis
- [ ] Iniciar servidor dev
- [ ] Testar endpoint `/health`
- [ ] Commit inicial do backend

### Verificações

```bash
# Verificar Docker containers
docker ps

# Deve mostrar 3 containers:
# - dr-infantil-postgres (running)
# - dr-infantil-redis (running)
# - dr-infantil-api (running - se iniciado)

# Testar PostgreSQL
docker exec -it dr-infantil-postgres psql -U drinfantil -d drinfantil_db -c "SELECT version();"

# Testar Redis
docker exec -it dr-infantil-redis redis-cli -a dev_redis_123 ping
# Deve retornar: PONG

# Testar API
curl http://localhost:3000/health
```

---

## 🚨 Troubleshooting Comum

### Erro: "Port already in use"

```bash
# Windows (PowerShell)
# Ver processo na porta 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess

# Matar processo
Stop-Process -Id PROCESS_ID -Force

# Ou mudar porta no .env
PORT=3001
```

### Erro: "Cannot connect to PostgreSQL"

```bash
# Verificar se container está rodando
docker ps | grep postgres

# Ver logs
docker logs dr-infantil-postgres

# Reiniciar container
docker-compose restart postgres

# Verificar credenciais no .env
```

### Erro: "Prisma Client not generated"

```bash
# Gerar client novamente
npx prisma generate

# Se persistir, limpar e regenerar
rm -rf node_modules/.prisma
npx prisma generate
```

---

**Próximas seções:**
- Semana 3-4: Autenticação completa (JWT, refresh tokens, email verification)
- Semana 5-6: APIs (Diseases, Submissions, Analytics, Feedback)
- Semana 7-8: Integração com Frontend
- Semana 9-10: Testing completo
- Semana 11-12: Deploy & Monitoring

**Status:** ✅ Semana 1-2 documentada completamente  
**Próximo:** Continuar com Semana 3-4 em detalhes?

