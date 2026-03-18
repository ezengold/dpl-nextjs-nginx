FROM node:25-alpine AS base

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

FROM base AS builder
WORKDIR /app
COPY ../../package.json ../../package-lock.json ./
RUN npm ci --omit=dev
COPY ../../ ./
RUN npm run build

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
RUN mkdir ./.next/cache
RUN chmod -R 777 ./.next/cache
RUN mkdir ./.next/cache/images
RUN chmod -R 777 ./.next/cache/images
USER nextjs
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]