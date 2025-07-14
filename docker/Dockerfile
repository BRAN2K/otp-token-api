FROM node:24-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY . .

# Gerar Prisma client
RUN pnpm db:generate

# Build da aplicação
RUN pnpm build

# Copiar Prisma client gerado para dist
RUN cp -r src/infrastructure/database/prisma/generated dist/infrastructure/database/prisma/

EXPOSE 8080

CMD ["node", "dist/server.js"]