FROM oven/bun:slim AS base

FROM base AS builder

WORKDIR /app

COPY package*json tsconfig.json src ./
COPY . .


RUN bun install --frozen-lockfile

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:bunjs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:bunjs /app/package.json /app/package.json

USER hono
EXPOSE 3000

CMD ["bun", "run", "start"]
