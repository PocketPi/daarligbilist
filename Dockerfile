FROM node:alpine

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn

COPY prisma /app
COPY public /app
COPY src/shared /app/src/shared
COPY src/server /app/src/server
COPY src/client /app/src/client
COPY tsconfig.json /app
COPY index.html /app

ENV MONGODB_USERNAME=user
ENV MONGODB_PASSWORD=password
ENV MONGO_INITDB_DATABASE=daarligbilist
ENV DATABASE_URL="postgresql://user:password@192.168.1.9:5432/daarligbilist?schema=public"

RUN yarn prisma generate
RUN yarn build

EXPOSE 3000


CMD ["yarn", "start"]
