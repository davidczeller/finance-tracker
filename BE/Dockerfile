FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Wait for database script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copy and make entrypoint script executable
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 8000

CMD ["/docker-entrypoint.sh"]