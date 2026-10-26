# 🔐 Manager API - Exemplos de Requisições com JWT

## ⚠️ Importante: Todas as rotas exigem JWT Token!

Para chamar qualquer rota (exceto login), você precisa fornecer o `Authorization: Bearer {access_token}`

---

## 1️⃣ LOGIN (Obter Tokens)

### Requisição
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "Senha123"
  }'
```

### Resposta (200 OK)
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YWRmMDk3MDhmYjg0ZDUxYTVkMTliOWUiLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzkzMDAzMzEzLCJleHAiOjE3OTMwMDY5MTN9.aGYSymT0kk_ZqX2slxEkDKpVVSoDm3P5pZS_zbIj3j8",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YWRmMDk3MDhmYjg0ZDUxYTVkMTliOWUiLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzkzMDAzMzEzLCJleHAiOjE3OTM2MDgxMTN9.mYAqQIIhbaOgNM0KG5nAsW7zVhM8csGsMfMtUZdBwYI",
  "manager": {
    "id": "6adf09708fb84d51a5d19b9e",
    "name": "Admin User",
    "email": "admin@test.com",
    "role": "ADMIN"
  }
}
```

> **Salve o `access_token` para usar nas próximas requisições!**

---

## 2️⃣ CRIAR MANAGER (POST)

### Requisição
```bash
curl -X POST http://localhost:3000/managers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "Senha123",
    "role": "MANAGER"
  }'
```

### Resposta (201 Created)
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "MANAGER",
  "isActive": true,
  "createdAt": "2026-10-26T09:00:00.000Z",
  "updatedAt": "2026-10-26T09:00:00.000Z"
}
```

---

## 3️⃣ LISTAR MANAGERS (GET)

### Requisição - Padrão (10 primeiros)
```bash
curl -X GET "http://localhost:3000/managers" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Requisição - Com Paginação
```bash
# 2ª página (20 até 30)
curl -X GET "http://localhost:3000/managers?skip=20&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 3ª página (40 até 60)
curl -X GET "http://localhost:3000/managers?skip=40&limit=20" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Resposta (200 OK)
```json
[
  {
    "id": "6adf09708fb84d51a5d19b9e",
    "name": "Admin User",
    "email": "admin@test.com",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2026-10-26T08:04:00.012Z",
    "updatedAt": "2026-10-26T08:04:00.012Z"
  },
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "MANAGER",
    "isActive": true,
    "createdAt": "2026-10-26T09:00:00.000Z",
    "updatedAt": "2026-10-26T09:00:00.000Z"
  }
]
```

---

## 4️⃣ OBTER MANAGER POR ID (GET)

### Requisição
```bash
curl -X GET "http://localhost:3000/managers/6adf09708fb84d51a5d19b9e" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Resposta (200 OK)
```json
{
  "id": "6adf09708fb84d51a5d19b9e",
  "name": "Admin User",
  "email": "admin@test.com",
  "role": "ADMIN",
  "isActive": true,
  "createdAt": "2026-10-26T08:04:00.012Z",
  "updatedAt": "2026-10-26T08:04:00.012Z"
}
```

---

## 5️⃣ ATUALIZAR MANAGER (PUT)

### Requisição - Atualizar Nome
```bash
curl -X PUT "http://localhost:3000/managers/6adf09708fb84d51a5d19b9e" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "Admin User Updated"
  }'
```

### Requisição - Atualizar Senha
```bash
curl -X PUT "http://localhost:3000/managers/6adf09708fb84d51a5d19b9e" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "password": "NovaSenha123"
  }'
```

### Requisição - Atualizar Múltiplos Campos
```bash
curl -X PUT "http://localhost:3000/managers/6adf09708fb84d51a5d19b9e" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "Admin Updated",
    "role": "ADMIN",
    "password": "NovaSenha123"
  }'
```

### Resposta (200 OK)
```json
{
  "id": "6adf09708fb84d51a5d19b9e",
  "name": "Admin User Updated",
  "email": "admin@test.com",
  "role": "ADMIN",
  "isActive": true,
  "createdAt": "2026-10-26T08:04:00.012Z",
  "updatedAt": "2026-10-26T09:05:00.000Z"
}
```

---

## 6️⃣ DELETAR MANAGER - Soft Delete (DELETE)

### Requisição
```bash
curl -X DELETE "http://localhost:3000/managers/6adf09708fb84d51a5d19b9e" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Resposta (200 OK)
```json
{
  "message": "Manager deletado com sucesso"
}
```

> ⚠️ **Soft Delete**: O manager não é removido do banco, apenas marcado como deletado (deletedAt != null)

---

## 🔧 Script Bash - Automatizar Fluxo Completo

```bash
#!/bin/bash

# 1. Login e obter token
echo "📌 Fazendo login..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"Senha123"}')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
echo "✅ Token obtido: ${TOKEN:0:50}..."

# 2. Criar novo manager
echo ""
echo "📌 Criando novo manager..."
curl -s -X POST http://localhost:3000/managers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Novo Manager",
    "email": "novo@example.com",
    "password": "Senha123",
    "role": "MANAGER"
  }' | jq '.'

# 3. Listar todos
echo ""
echo "📌 Listando managers..."
curl -s -X GET "http://localhost:3000/managers" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 4. Obter um específico
echo ""
echo "📌 Obtendo manager por ID..."
MANAGER_ID="6adf09708fb84d51a5d19b9e"
curl -s -X GET "http://localhost:3000/managers/$MANAGER_ID" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 5. Atualizar
echo ""
echo "📌 Atualizando manager..."
curl -s -X PUT "http://localhost:3000/managers/$MANAGER_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name": "Admin Updated"}' | jq '.'

echo ""
echo "✅ Fluxo completo finalizado!"
```

---

## ⚠️ Erros Comuns

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "path": "/managers"
}
```
**Motivo**: Falta JWT ou token expirado
**Solução**: Faça login novamente para obter novo token

### 400 Bad Request - Email já registrado
```json
{
  "statusCode": 400,
  "message": "Email já está registrado",
  "path": "/managers"
}
```
**Motivo**: Email já existe no banco
**Solução**: Use outro email

### 400 Bad Request - Validação
```json
{
  "statusCode": 400,
  "message": "Email inválido",
  "path": "/managers"
}
```
**Motivo**: Dados não passaram na validação
**Solução**: Verifique campos obrigatórios e formatos

---

## 📝 Campos Obrigatórios

| Campo | Tipo | Min | Max | Validações |
|-------|------|-----|-----|------------|
| `name` | string | 3 | 100 | Obrigatório |
| `email` | string | - | - | Email válido, Único |
| `password` | string | 8 | - | Maiúscula + Minúscula + Número |
| `role` | enum | - | - | ADMIN ou MANAGER |

---

## 🎯 Dicas

1. **Salve o token em uma variável**: `TOKEN="eyJhbGc..."`
2. **Use jq para formatar JSON**: `| jq '.'`
3. **Teste com Postman/Thunder Client**: Para melhor visualização
4. **Token expira em 3600s (1 hora)**: Faça novo login depois
5. **Refresh token**: Use `POST /auth/refresh` com o refresh_token para gerar novo access_token
