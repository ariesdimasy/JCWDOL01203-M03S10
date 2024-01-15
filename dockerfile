FROM node:16

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3500
VOLUME [ "/app/node_modules" ]
CMD ["npm","run","dev"]