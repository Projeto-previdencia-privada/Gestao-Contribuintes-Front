# Use a imagem oficial do Node.js como base
FROM node:latest AS build

# Configure o diretório de trabalho no container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Construa o aplicativo React
RUN npm run build

# Stage de produção
FROM nginx:latest

# Copie os arquivos de build do React para o diretório padrão do NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copie a configuração customizada do NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponha a porta 80 para o servidor NGINX
EXPOSE 80

# Comando para iniciar o servidor NGINX
CMD ["nginx", "-g", "daemon off;"]
