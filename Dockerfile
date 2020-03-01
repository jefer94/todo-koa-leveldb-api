FROM node:13
RUN echo a
ARG PORT

ENV SECRET=.`5H+C8ewL~&wat"z<-A.eHmW2M}./m)w;zbh\'aBZwshA>!M;h&dyBhnaJK{_"Y
ENV SALT_ROUNDS=10

WORKDIR /usr/src

COPY package.json .
COPY yarn.lock .

# RUN npm i -g yarn 
RUN yarn

COPY . .

RUN yarn build

EXPOSE 5000
CMD ["yarn", "start"]