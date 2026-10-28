# 🏠 Residents API - Exemplos de Requisições com JWT

## ⚠️ Importante: Todas as rotas exigem JWT Token!

Para chamar qualquer rota, você precisa fornecer o `Authorization: Bearer {access_token}`

Obtenha o token fazendo login em `/auth/login`

---

## 1️⃣ CRIAR RESIDENT (POST)

### Requisição
```bash
curl -X POST http://localhost:3000/residents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "João da Silva",
    "email": "joao.silva@example.com",
    "phone": "11987654321",
    "cpf": "12345678900",
    "address": "Rua das Flores, 123",
    "apartment": "Apto 401",
    "propertyId": "507f1f77bcf86cd799439011",
    "moveInDate": "2026-10-26T00:00:00Z"
  }'
```

### Resposta (201 Created)
```json
{
  "id": "507f1f77bcf86cd799439012",
  "name": "João da Silva",
  "email": "joao.silva@example.com",
  "phone": "11987654321",
  "cpf": "12345678900",
  "address": "Rua das Flores, 123",
  "apartment": "Apto 401",
  "propertyId": "507f1f77bcf86cd799439011",
  "moveInDate": "2026-10-26T00:00:00Z",
  "isActive": true,
  "createdAt": "2026-10-26T10:30:00.000Z",
  "updatedAt": "2026-10-26T10:30:00.000Z"
}
```

---

## 2️⃣ LISTAR RESIDENTS (GET)

### Requisição - Padrão (10 primeiros)
```bash
curl -X GET "http://localhost:3000/residents" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Requisição - Com Paginação
```bash
# 2ª página (20 até 30)
curl -X GET "http://localhost:3000/residents?skip=20&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 3ª página (40 até 60)
curl -X GET "http://localhost:3000/residents?skip=40&limit=20" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Resposta (200 OK)
```json
[
  {
    "id": "507f1f77bcf86cd799439012",
    "name": "João da Silva",
    "email": "joao.silva@example.com",
    "phone": "11987654321",
    "cpf": "12345678900",
    "address": "Rua das Flores, 123",
    "apartment": "Apto 401",
    "propertyId": "507f1f77bcf86cd799439011",
    "moveInDate": "2026-10-26T00:00:00Z",
    "isActive": true,
    "createdAt": "2026-10-26T10:30:00.000Z",
    "updatedAt": "2026-10-26T10:30:00.000Z"
  },
  {
    "id": "507f1f77bcf86cd799439013",
    "name": "Maria Santos",
    "email": "maria@example.com",
    "phone": "21987654321",
    "address": "Avenida Paulista, 1000",
    "apartment": "Apto 501",
    "propertyId": "507f1f77bcf86cd799439011",
    "moveInDate": "2026-09-15T00:00:00Z",
    "isActive": true,
    "createdAt": "2026-10-25T14:20:00.000Z",
    "updatedAt": "2026-10-25T14:20:00.000Z"
  }
]
```

---

## 3️⃣ OBTER RESIDENT POR ID (GET)

### Requisição
```bash
curl -X GET "http://localhost:3000/residents/507f1f77bcf86cd799439012" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Resposta (200 OK)
```json
{
  "id": "507f1f77bcf86cd799439012",
  "name": "João da Silva",
  "email": "joao.silva@example.com",
  "phone": "11987654321",
  "cpf": "12345678900",
  "address": "Rua das Flores, 123",
  "apartment": "Apto 401",
  "propertyId": "507f1f77bcf86cd799439011",
  "moveInDate": "2026-10-26T00:00:00Z",
  "isActive": true,
  "createdAt": "2026-10-26T10:30:00.000Z",
  "updatedAt": "2026-10-26T10:30:00.000Z"
}
```

---

## 4️⃣ ATUALIZAR RESIDENT (PUT)

### Requisição - Atualizar Nome
```bash
curl -X PUT "http://localhost:3000/residents/507f1f77bcf86cd799439012" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "João Silva Santos"
  }'
```

### Requisição - Atualizar Telefone e Apartamento
```bash
curl -X PUT "http://localhost:3000/residents/507f1f77bcf86cd799439012" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "phone": "11999998888",
    "apartment": "Apto 402"
  }'
```

### Requisição - Marcar como Saído
```bash
curl -X PUT "http://localhost:3000/residents/507f1f77bcf86cd799439012" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "moveOutDate": "2026-12-31T23:59:59Z"
  }'
```

### Resposta (200 OK)
```json
{
  "id": "507f1f77bcf86cd799439012",
  "name": "João Silva Santos",
  "email": "joao.silva@example.com",
  "phone": "11999998888",
  "cpf": "12345678900",
  "address": "Rua das Flores, 123",
  "apartment": "Apto 402",
  "propertyId": "507f1f77bcf86cd799439011",
  "moveInDate": "2026-10-26T00:00:00Z",
  "moveOutDate": "2026-12-31T23:59:59Z",
  "isActive": true,
  "createdAt": "2026-10-26T10:30:00.000Z",
  "updatedAt": "2026-10-26T11:45:00.000Z"
}
```

---

## 5️⃣ DELETAR RESIDENT - Soft Delete (DELETE)

### Requisição
```bash
curl -X DELETE "http://localhost:3000/residents/507f1f77bcf86cd799439012" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Resposta (200 OK)
```json
{
  "message": "Resident deletado com sucesso"
}
```

> ⚠️ **Soft Delete**: O resident não é removido do banco, apenas marcado como deletado (deletedAt != null)

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

# 2. Criar novo resident
echo ""
echo "📌 Criando novo resident..."
RESIDENT_RESPONSE=$(curl -s -X POST http://localhost:3000/residents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Novo Resident",
    "email": "resident@example.com",
    "phone": "11987654321",
    "address": "Rua Nova, 456",
    "apartment": "Apto 301",
    "propertyId": "507f1f77bcf86cd799439011",
    "moveInDate": "2026-10-26T00:00:00Z"
  }')

RESIDENT_ID=$(echo $RESIDENT_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
echo "✅ Resident criado: $RESIDENT_ID"

# 3. Listar todos
echo ""
echo "📌 Listando residents..."
curl -s -X GET "http://localhost:3000/residents" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 4. Obter um específico
echo ""
echo "📌 Obtendo resident por ID..."
curl -s -X GET "http://localhost:3000/residents/$RESIDENT_ID" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 5. Atualizar
echo ""
echo "📌 Atualizando resident..."
curl -s -X PUT "http://localhost:3000/residents/$RESIDENT_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"phone": "11999999999"}' | jq '.'

# 6. Deletar
echo ""
echo "📌 Deletando resident..."
curl -s -X DELETE "http://localhost:3000/residents/$RESIDENT_ID" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

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
  "path": "/residents"
}
```
**Motivo**: Falta JWT ou token expirado
**Solução**: Faça login novamente para obter novo token

### 400 Bad Request - Email já registrado
```json
{
  "statusCode": 400,
  "message": "Email já está registrado",
  "path": "/residents"
}
```
**Motivo**: Email já existe no banco
**Solução**: Use outro email

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Residente não encontrado",
  "path": "/residents/507f1f77bcf86cd799439999"
}
```
**Motivo**: ID do resident não existe
**Solução**: Verifique o ID e tente novamente

---

## 📝 Campos Obrigatórios

| Campo | Tipo | Min | Max | Validações |
|-------|------|-----|-----|------------|
| `name` | string | 3 | 100 | Obrigatório |
| `email` | string | - | - | Email válido, Único |
| `phone` | string | 10 | 11 | Formato: apenas dígitos |
| `cpf` | string | 11 | 11 | Opcional, formato: 11 dígitos |
| `address` | string | 5 | - | Obrigatório |
| `apartment` | string | - | - | Opcional |
| `propertyId` | string | - | - | Obrigatório, ID válido |
| `moveInDate` | date | - | - | Obrigatório, formato ISO |
| `moveOutDate` | date | - | - | Opcional, formato ISO |

---

## 🎯 Dicas

1. **Salve o token em uma variável**: `TOKEN="eyJhbGc..."`
2. **Use jq para formatar JSON**: `| jq '.'`
3. **Teste com Postman/Thunder Client**: Para melhor visualização
4. **Token expira em 3600s (1 hora)**: Faça novo login depois
5. **Refresh token**: Use `POST /auth/refresh` com o refresh_token para gerar novo access_token
6. **Filtre por propertyId**: Busque todos os residents de um imóvel
7. **Soft delete**: Residents deletados ainda estão no banco com deletedAt preenchido

---

## 📊 Cenários de Uso

### Criar múltiplos residents para uma propriedade
```bash
# Resident 1
curl -X POST http://localhost:3000/residents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Resident 1",
    "email": "resident1@example.com",
    "phone": "11987654321",
    "address": "Rua A, 100",
    "apartment": "Apto 101",
    "propertyId": "PROPERTY_ID_HERE",
    "moveInDate": "2026-10-26T00:00:00Z"
  }'

# Resident 2
curl -X POST http://localhost:3000/residents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Resident 2",
    "email": "resident2@example.com",
    "phone": "21987654321",
    "address": "Rua A, 100",
    "apartment": "Apto 102",
    "propertyId": "PROPERTY_ID_HERE",
    "moveInDate": "2026-10-26T00:00:00Z"
  }'
```

### Atualizar resident quando sai do imóvel
```bash
curl -X PUT "http://localhost:3000/residents/RESIDENT_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "moveOutDate": "2026-12-31T23:59:59Z"
  }'
```
