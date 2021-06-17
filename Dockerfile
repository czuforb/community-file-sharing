FROM node:14-stretch

RUN apt-get update && apt-get install bash

RUN mkdir -p /usr/src/app

#ENV PORT 3000

WORKDIR /usr/src/app

# Install PM2 globally
# TODO: FIX IT
# RUN npm install --global pm2


COPY package.json /usr/src/app

COPY ./prisma ./prisma/

RUN npm install --force

COPY . .

#RUN npx prisma introspect

# Add wait-for-it

COPY wait-for-it.sh wait-for-it.sh 


RUN chmod +x wait-for-it.sh

#ENTRYPOINT "/bin/sh" "-c"


EXPOSE 3000

RUN npm run build

#CMD npm run start

CMD ["./wait-for-it.sh" , "db:3306" , "--strict" , "--timeout=300" , "--" , "npm", "run","ignite"]
#CMD [ "npm", "run","start"]
