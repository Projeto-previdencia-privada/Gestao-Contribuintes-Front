# Estágio de build
FROM node:latest AS build

WORKDIR /app

# Copiar os arquivos de configuração do npm primeiro, para aproveitar o cache do Docker
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Garantir permissões de execução para os binários
RUN chmod +x node_modules/.bin/*

# Construir o projeto usando o caminho completo para o vite
RUN npx vite build

# Estágio de produção
FROM nginx:latest

# Copiar os arquivos construídos para o servidor nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar a pasta node_modules se necessário (geralmente não é necessário em produção)
# COPY --from=build /app/node_modules /usr/share/nginx/html/node_modules

# Copiar a configuração personalizada do nginx
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

# Expor a porta 80 para acesso HTTP
EXPOSE 80

# Iniciar o nginx em modo não daemon
CMD ["nginx", "-g", "daemon off;"]
