# Events API

API simples para gerenciamento de eventos usando Express.js, TypeScript e TypeORM com PostgreSQL.

## Endpoints

- `POST /events` - Cadastrar um evento (nome, descrição, data)
- `POST /participants` - Cadastrar um participante (nome, e-mail, telefone)
- `POST /events/:eventId/participants` - Inscrever um participante em um evento
- `GET /events/:eventId/participants` - Listar participantes de um evento

## Como Rodar o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js instalado

### Configuração

1. Clone o repositório
2. Crie um arquivo `.env` na raiz do projeto:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=events_db
```

### Executando a Aplicação

#### Usando Docker (Recomendado)
1. Construa e inicie os containers:
```bash
docker-compose up -d
```

2. Execute as migrações:
```bash
npm run typeorm migration:run -- -d src/config/typeorm.config.ts
```

Pronto! A aplicação já estará rodando em http://localhost

#### Desenvolvimento Local
Se você preferir rodar localmente para desenvolvimento:

1. Certifique-se que tem um PostgreSQL rodando (pode usar Docker):
```bash
docker-compose up -d postgres
```

2. Instale as dependências:
```bash
npm install --legacy-peer-deps
```

3. Execute as migrações:
```bash
npm run typeorm migration:run -- -d src/config/typeorm.config.ts
```

4. Inicie a aplicação em modo desenvolvimento:
```bash
npm run dev
```

A API estará disponível em http://localhost

### Exemplos de Uso

#### Criar um evento
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"name": "Workshop TypeScript", "description": "Introdução ao TypeScript", "date": "2025-08-15T14:00:00Z"}' \
  http://localhost/events
```

#### Criar um participante
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"name": "João Silva", "email": "joao@email.com", "phone": "11999999999"}' \
  http://localhost/participants
```

#### Inscrever participante em evento
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"participantId": 1}' \
  http://localhost/events/1/participants
```

#### Listar participantes de um evento
```bash
curl http://localhost/events/1/participants
```

