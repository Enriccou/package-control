# 🧪 Guia de Testes - Package Control

## Overview

Cobertura completa de testes com **Jest** para todo o projeto. Incluindo:
- ✅ Testes Unitários (Services, Handlers, Controllers)
- ✅ Mocks de Dependências
- ✅ Testes de Casos de Erro
- ✅ Cobertura de Código (75%+)

---

## 📦 Estrutura de Testes

```
src/
├── modules/
│   ├── auth/
│   │   └── auth.service.spec.ts
│   ├── managers/
│   │   └── managers.service.spec.ts
│   ├── residents/
│   │   └── residents.service.spec.ts
│   ├── packages/
│   │   ├── packages.service.spec.ts
│   │   ├── packages.controller.spec.ts
│   │   └── handlers/commands/
│   │       ├── create-package.handler.spec.ts
│   │       └── pickup-package.handler.spec.ts
│   └── reports/
│       └── reports.service.spec.ts
```

---

## 🚀 Rodando Testes

### **Todos os Testes**
```bash
npm test
```

### **Testes com Cobertura**
```bash
npm test -- --coverage
```

### **Testes em Watch Mode** (desenvolvimento)
```bash
npm test -- --watch
```

### **Testes de um Módulo Específico**
```bash
npm test packages
npm test auth
npm test managers
npm test residents
npm test reports
```

### **Testes de um Arquivo Específico**
```bash
npm test packages.service
npm test create-package.handler
```

---

## 📊 Relatório de Cobertura

Após rodar `npm test -- --coverage`, abra:
```
coverage/lcov-report/index.html
```

**Thresholds Configurados:**
- Branches: 70%
- Functions: 75%
- Lines: 75%
- Statements: 75%

---

## 🧪 O que é Testado

### **Packages Module**
```
✅ PackagesService
   - create()
   - findAll() com paginação
   - findById()
   - findByResidentId()
   - findPending()
   - update()
   - markAsPickedUp()
   - delete() soft delete
   - incrementNotificationAttempts()
   - confirmNotification()
   - getWhatsAppLink()

✅ CreatePackageHandler
   - Criação bem-sucedida

✅ PickupPackageHandler
   - Marcar como retirado
   - Erro se não existe
   - Erro se já retirado

✅ PackagesController
   - POST /packages
   - GET /packages
   - GET /packages/:id
   - PUT /packages/:id
   - PUT /packages/:id/pickup
   - PUT /packages/:id/confirm-notification
   - GET /packages/:id/whatsapp-link
   - DELETE /packages/:id
```

### **Reports Module**
```
✅ ReportsService
   - getPendingPackages() com paginação
   - getFailedNotifications() com paginação
   - getStatistics() com agregação
```

### **Auth Module**
```
✅ AuthService
   - generateTokens()
   - validateToken()
   - Validação de tokens inválidos
```

### **Managers Module**
```
✅ ManagersService
   - create()
   - findAll()
   - findById()
   - findByEmail()
   - update()
   - delete()
```

### **Residents Module**
```
✅ ResidentsService
   - create()
   - findAll()
   - findById()
   - findByEmail()
   - findByPropertyId()
   - update()
   - delete()
```

---

## 📝 Exemplo de Teste

```typescript
describe('PackagesService', () => {
  let service: PackagesService;
  let repository: jest.Mocked<PackagesRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackagesService,
        {
          provide: PackagesRepository,
          useValue: {
            create: jest.fn(),
            // ... outros mocks
          },
        },
      ],
    }).compile();

    service = module.get<PackagesService>(PackagesService);
    repository = module.get(PackagesRepository) as jest.Mocked<PackagesRepository>;
  });

  describe('create', () => {
    it('should create a package', async () => {
      const createDto: CreatePackageDto = {
        residentId: '507f...',
        carrier: 'Sedex',
      };

      repository.create.mockResolvedValue(mockPackage);

      const result = await service.create(createDto);

      expect(result).toEqual(mockPackage);
      expect(repository.create).toHaveBeenCalledWith(createDto);
    });
  });
});
```

---

## 🎯 Casos Testados

### **Sucesso ✅**
- Criação de recursos
- Busca por ID
- Listagem com paginação
- Atualização
- Deleção soft

### **Erros ❌**
- Recurso não encontrado → `NotFoundException`
- Estado inválido → `BadRequestException`
- Token inválido → `UnauthorizedException`

---

## 📈 Cobertura Alvo

| Métrica | Mínimo | Status |
|---------|--------|--------|
| Lines | 75% | ✅ Configurado |
| Statements | 75% | ✅ Configurado |
| Functions | 75% | ✅ Configurado |
| Branches | 70% | ✅ Configurado |

---

## 🔧 Adicionar Novo Teste

### **1. Criar arquivo `.spec.ts`**
```bash
src/modules/novo-modulo/novo-modulo.service.spec.ts
```

### **2. Estrutura padrão**
```typescript
describe('NovoModuloService', () => {
  let service: NovoModuloService;
  let dependency: jest.Mocked<Dependency>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NovoModuloService, /* mocks */],
    }).compile();

    service = module.get(NovoModuloService);
  });

  describe('metodo', () => {
    it('should ...', async () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### **3. Rodar teste**
```bash
npm test novo-modulo
```

---

## 🚨 Troubleshooting

### **Erro: Cannot find module**
```bash
# Limpar node_modules e reinstalar
rm -rf node_modules
npm install
```

### **Erro: TypeScript não compila**
```bash
# Verificar tsconfig.json
# Garantir que está no raiz do projeto
```

### **Cobertura abaixo do esperado**
```bash
# Rodar com verbose
npm test -- --verbose

# Ver quais linhas não estão cobertas
npm test -- --coverage --collectCoverageFrom="src/**/*.ts"
```

---

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Jest Matchers](https://jestjs.io/docs/using-matchers)

---

## ✨ Próximos Passos

- [ ] Testes de integração E2E
- [ ] Testes de performance
- [ ] Testes de autenticação/autorização
- [ ] CI/CD com GitHub Actions

---

**Última atualização:** 2026-10-28

