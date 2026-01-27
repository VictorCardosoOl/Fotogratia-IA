# Lumina - Portfólio de Fotografia Premium

Lumina é um template de portfólio de alta performance desenvolvido para fotógrafos e artistas visuais. O projeto foca em estética minimalista, transições fluidas e uma experiência de usuário imersiva.

## 🚀 Como Hospedar no GitHub Pages

Este projeto já está configurado para deploy automático no GitHub Pages. Siga os passos abaixo:

### 1. Configuração Inicial
1. Abra o arquivo `package.json` e altere a linha `"homepage"`:
   ```json
   "homepage": "https://SEU_USUARIO.github.io/NOME_DO_SEU_REPOSITORIO",
   ```

2. Abra o arquivo `vite.config.ts` e altere a propriedade `base`:
   ```typescript
   base: '/NOME_DO_SEU_REPOSITORIO/',
   ```

### 2. Instalação
No terminal, instale as dependências:
```bash
npm install
```

### 3. Deploy
Para colocar o site no ar, execute:
```bash
npm run deploy
```
Este comando irá criar uma branch chamada `gh-pages` no seu repositório com os arquivos de produção.

### 4. Ativar no GitHub
1. Vá até as **Settings** do seu repositório no GitHub.
2. Clique em **Pages** no menu lateral.
3. Em "Build and deployment", certifique-se que a source é "Deploy from a branch".
4. Selecione a branch `gh-pages` e salve.

---

## 🛠️ Tecnologias

*   **React 19 & TypeScript**
*   **Vite** (Build Tool)
*   **Tailwind CSS**
*   **Framer Motion & GSAP**

Desenvolvido com foco em performance e design.