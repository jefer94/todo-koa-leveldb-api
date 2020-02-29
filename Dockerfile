FROM node:13
RUN echo a
ARG PORT

ENV PORT=5000
ENV DEV=false

WORKDIR /usr/src

COPY package.json .
COPY yarn.lock .

# RUN npm i -g yarn 
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000
CMD ["yarn", "start"]