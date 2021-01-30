FROM node:15-alpine as build
WORKDIR /build

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:15-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package.json ./
COPY --from=build /build/yarn.lock ./
COPY --from=build /build/.next ./.next
RUN yarn add next

EXPOSE 3000
CMD ["yarn", "start"]
