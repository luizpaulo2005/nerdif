# Formulário de Inscrição para o NerdIF

Para que o projeto possa ser executado, são necessárias as seguintes informações:

- Banco de Dados (compatibilidade conforme [documentação](https://www.prisma.io/docs/orm/overview/databases) do Prisma ORM)
- Oauth Client ID e Secret do Google (para autenticação) - [Saiba como configurar](#como-gerar-as-chaves-do-google)
- Configurações de e-mail (para envio de e-mails)

## Variáveis de Ambiente Necessárias

Para configurar o ambiente do projeto corretamente, insira as seguintes variáveis de ambiente no arquivo `.env`:

- **DATABASE_URL**  
  URL de conexão com o banco de dados. Deve ser uma URL válida que aponta para o banco usado no projeto.  
  Exemplo: `postgresql://user:password@host:port/database`

- **DIRECT_URL**  
  URL de conexão direta com o banco de dados (se aplicável). Também deve ser uma URL válida.  
  Exemplo: `postgresql://user:password@host:port/database`

- **NEXT_PUBLIC_AUTH_SECRET**  
  Um segredo utilizado para autenticação e/ou assinatura de tokens no projeto.  
  Exemplo: `supersecretstring`

- **NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID**  
  ID do cliente OAuth fornecido pelo Google. Usado para integrar autenticação via Google.  
  Exemplo: `1234567890-abcdefghij.apps.googleusercontent.com`

- **NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET**  
  Secret do cliente OAuth fornecido pelo Google. Complementa o `NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID`.  
  Exemplo: `GOCSPX-abcdefg12345`

- **NEXT_PUBLIC_MAIL_SMTP**  
  Endereço do servidor SMTP para envio de e-mails.  
  Exemplo: `smtp.gmail.com`

- **NEXT_PUBLIC_MAIL_PORT**  
  Porta usada pelo servidor SMTP. Deve ser `465` (SMTP seguro) ou `587` (STARTTLS).  
  Exemplo: `587`

- **NEXT_PUBLIC_MAIL_USER**  
  Endereço de e-mail usado para autenticação no servidor SMTP.  
  Exemplo: `seuemail@example.com`

- **NEXT_PUBLIC_MAIL_PASSWORD**  
  Senha da conta de e-mail usada para autenticação SMTP.  
  Exemplo: `senhasupersecreta`

- **NEXT_PUBLIC_IDENTIFICATION_TOKEN**  
  Token único para identificar ou validar transações/solicitações no sistema.  
  Exemplo: `uniqueidentificationtoken123`

Certifique-se de preencher todas as variáveis corretamente para garantir o funcionamento do projeto.

## Como gerar as chaves do Google

Para gerar as chaves OAuth no Google Cloud Console, siga os passos abaixo:

1. Acesse o Google Cloud Console.
2. Faça login com sua conta do Google.
3. Crie um novo projeto ou selecione um projeto existente.
4. No menu de navegação à esquerda, vá para APIs e serviços > Credenciais.
5. Clique em Criar credenciais e selecione ID do cliente OAuth.
6. Configure a tela de consentimento OAuth se ainda não tiver feito isso:
   1. Clique em Configurar tela de consentimento.
   2. Preencha as informações necessárias, como nome do aplicativo, e-mail de suporte, etc.
   3. Salve e continue.
7. Após configurar a tela de consentimento, selecione o tipo de aplicativo (por exemplo, Aplicativo Web).
8. Preencha os detalhes do aplicativo, como nome, URIs de redirecionamento autorizados, etc.
9. Clique em Criar.
10. O Google Cloud Console gerará um Client ID e um Client Secret. Esses são os valores que você precisará para configurar a autenticação OAuth no seu projeto.

## Observações

Os jogos não estão inclusos na aplicação, para adicionar, faça a criação de um arquivo JSON com o seguinte formato:

```json
[
  {
    "nome": "League of Legends",
    "maxJogadores": 5,
    "logoUrl": "https://www.mihsef.org/wp-content/uploads/2024/07/lol-square-1.jpg",
    "emailResponsavel": "email@email.com"
  }
]
```

Sendo que `nome` é o nome do jogo, `maxJogadores` é a quantidade máxima de jogadores por time, `logoUrl` é a URL da imagem do jogo e `emailResponsavel` é o e-mail do responsável pelo jogo na comissão organizadora.

O arquivo precisa ser salvo no diretório `./src/lib/games.json`

Após criar o arquivo, execute o comando `npx prisma db seed` para adicionar os jogos ao banco de dados.

## Executando o Projeto

Para executar o projeto, siga os passos abaixo:

1. Instale as dependências do projeto com o comando `npm run build`.
2. Execute o comando `npm start` para iniciar o servidor de desenvolvimento.
3. Acesse o projeto em `http://localhost:3000`.

Caso deseje executar o projeto em modo de desenvolvimento, execute o comando `npm run dev` e acesse o projeto em `http://localhost:3000`.

## Contribuidores

- [Luiz Paulo](https://github.com/luizpaulo2005)
