
- [Como utilizar](#como-utilizar)
  - [API](#api)
    - [Configurar o .env](#configurar-o-env)
    - [Entrar na pasta da API](#entrar-na-pasta-da-api)
    - [Instalar as dependências](#instalar-as-depend%c3%aancias)
    - [Criar os bancos de dados](#criar-os-bancos-de-dados)
    - [Migrations e Seeds](#migrations-e-seeds)
    - [Executar a API](#executar-a-api)
  - [Frontend](#frontend)
    - [Instalar as dependências](#instalar-as-depend%c3%aancias-1)
    - [Executar](#executar)
  - [Mobile](#mobile)
    - [Instalar as dependências](#instalar-as-depend%c3%aancias-2)
    - [Configurar](#configurar)
    - [Executar](#executar-1)
# Como utilizar

```bash
git clone https://github.com/brochj/meetapp
```
## API

###  Configurar o .env

### Entrar na pasta da API
```bash
cd meetapp/backend
```

### Instalar as dependências
```bash
yarn
```

### Criar os bancos de dados

```bash
docker run --name meetappDB -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=meetapp -p 5432:5432 -d postgres
```

```bash
docker run --name mongomeetapp -p 27017:27017 -d -t mongo

```

```bash
docker run --name redismeetapp -p 6379:6379 -d -t redis:alpine

```

### Migrations e Seeds
irá executar as migrations e depois as seeds.

```bash
yarn seed
```

### Executar a API

```bash
yarn dev
```

## Frontend

```bash
cd meetapp/frontend
```

### Instalar as dependências

```bash
yarn
```

### Executar

```bash
yarn start
```

## Mobile
> OBS: foi testado apenas no **android** (8.1) utilizando o modo de debug por USB.
```bash
cd meetapp/mobile
```

### Instalar as dependências

```bash
yarn
```

### Configurar

No arquivo `src/config/appConfig.js`

```js
export const serverIP = '192.168.16.101'; // default 'localhost'
export const serverPort = '3333';

const appConfig = {
  reactotronHost: serverIP, // configure({ host: appConfig.reactotronHost })
  apiBaseURL: `http://${serverIP}:${serverPort}`, // axios
  imagesHost: serverIP, // default 'localhost'
};

export default appConfig;
```
- `serverIP` é o IP da API, se estiver utilizando um debug por USB colocar o IP da máquina
- `imagesHost` host da url das imagens, deve ser o IP da API. (Não precisa alterar)

### Executar

```bash
yarn start
```

```bash
react-native run-android
```
