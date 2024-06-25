# Processo-Seletivo-eNUBE

Esta é uma aplicação full stack desenvolvida em Go e React para um processo seletivo. A API fornece endpoints para gerenciar usuários, parceiros, clientes e produtos utilizando MongoDB como banco de dados e arquivos Excel para leitura de dados. O frontend em React permite a interação com a API.

## Requisitos

- Go 1.16 ou superior
- Node.js 14.0 ou superior
- MongoDB 4.4 ou superior
- Git
## Instalação

Siga os passos abaixo para configurar e executar o projeto:

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/processo-seletivo-fullstack.git
cd processo-seletivo-fullstack
```

## 2. Configuração de Ambiente
Crie um arquivo .env na raiz da pasta api com a seguinte configuração:
MONGO_URI='mongodb+srv://victor-schmoegel:victor-schmoegel@cluster0.y53ooes.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

SECRET_KEY='sahdfuiashdiaskljfujah'

### 3. Instale as dependências

Na raiz do projeto, instale as dependências do Go:
```bash
go mod tidy
```
Navegue até a pasta client e instale as dependências do Node.js:
```bash
npm install
```

#### 4. Executando a aplicação
Para iniciar a API, execute o comando abaixo na pasta api:
```bash
go run main.go
```
Para iniciar o frontend, execute o comando abaixo na pasta client:
```bash
npm start
```