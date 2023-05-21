FROM node:18-alpine
WORKDIR /app

COPY . .

RUN  npm install --production
RUN npx prisma generate
RUN chmod +x build-and-run.sh

ENV NODE_ENV production

EXPOSE 3000

ENV PORT 3000

CMD ["./build-and-run.sh"]
