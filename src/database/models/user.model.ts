// models/user.model.ts

import { Prisma } from '@prisma/client';

export const User = Prisma.validator<Prisma.UserCreateArgs>()({
  data: {
    id: 'exemple-id@124124',
    displayName: 'userName',
    user: 'user@example.com', // Exemplo de campo necessário para criar um usuário
    password: 'password',     // Exemplo de campo necessário para criar um usuário
    role: 'user',             // Define o valor padrão para "user" ou "admin"
  }
});

export type User = Prisma.UserCreateArgs;
