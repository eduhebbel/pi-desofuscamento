# PI - Desofuscamento de Dados #

Projeto integrador do curso de Análise e Desenvolvimento de Sistemas
Senai - Florianópolis - Terceira fase - 2020.1

### Grupo ###
- André Hagemann Martello
- Cleber Thomaz

### link para github repositorio ###
https://github.com/eduhebbel/pi-desofuscamento


### Entregas para a disciplina de programação Web ###
A avaliação para essa disciplina será separada em algumas entregas: 

#### Trabalho 1 - Primeira entrega do PI ####
No Trabalho 1, deverá ser entregue e apresentado o código referente ao cadastro de usuários, que é parte do Projeto Integrador. Esta entrega deve apresentar as seguintes facilidades de um cadastro:

- Interface gráfica, com lista de usuários e formulários para criação e alteração de usuários;
- Deve conter as quatro ações típicas de um cadastro (CRUD);
- Deve armazenar os usuários em um banco de dados MySQL;
- Deve validar os dados fornecidos pelo usuário;
- Deve apresentar de maneira amigável mensagens de sucesso e de erro.
- O programa deverá ser desenvolvido com linguagem JavaScript, utilizando Node.js. Para desenvolvimento dos programas servidor e cliente recomenda-se o uso dos frameworks Express e React, respectivamente.

#### Trabalho 2 - Segunda entrega do PI ####
No Trabalho 2, deverá ser entregue e apresentada a implementação do algoritmo de desofuscamento de dados, assim como o código necessário para acessá-lo em uma aplicação Web. Este trabalho contempla uma parte do Projeto Integrador. Esta entrega deve atender aos seguintes requisitos:

Suportar desofuscamento de uma string;
- Receber uma string ofuscada e retornar uma string desofuscada.
Suportar desofuscamento do conteúdo de um arquivo de texto plano;
- Receber um arquivo de texto plano com conteúdo ofuscado e retornar o conteúdo desofuscado;
Deve validar os dados fornecidos pelo usuário: 
- Ou a string ou o arquivo precisa ser enviada;
- Aceitar apenas arquivos de texto plano (ex.: .txt, .log).

#### Trabalho 3 - Terceira entrega do PI ####
No Trabalho 3, deverá ser entregue e apresentada a interface de acesso ao serviço de desofuscamento. Este trabalho contempla uma parte do Projeto Integrador. Esta entrega deve atender aos seguintes requisitos:

- A aplicação deve permitir que o usuário informe uma string ofuscada na interface ou um arquivo com o conteúdo ofuscado; Pode-se utilizar uma página para cada tipo de entrada (string e arquivo) ou apresentar as duas entradas numa mesma página
- Quando o usuário informar uma string ofuscada, a aplicação deve apresentar, após efetuar o processo de desofuscamento, a string desofuscada na página; Pode ser na mesma página ou em uma nova página
- Quando o usuário informar um arquivo com conteúdo ofuscado, a aplicação pode, após efetuar o processo de desofuscamento, apresentar o conteúdo desofuscado na tela, retornar um arquivo com o conteúdo desofuscado para download, disponibilizar um link para o usuário baixar o arquivo desofuscado, entre outras alternativas que permitam ao usuário acessar o conteúdo do arquivo desofuscado
- O programa cliente deve estar integrado ao programa servidor desenvolvido no Trabalho 2 (serviço de desofuscamento)
- Deve apresentar de maneira amigável mensagens de sucesso e de erro

#### Trabalho 4 - Quarta entrega do PI ####
No Trabalho 4, deverão ser entregues e apresentadas as facilidades de autenticação e autorização de acesso à aplicação desenvolvida ao longo dos Trabalhos 1, 2 e 3. Este trabalho contempla a última parte do Projeto Integrador. Nesta entrega, os seguintes requisitos devem ser atendidos:

- O programa cliente (frontend) deverá possuir uma interface para autenticação, onde o usuário informará suas credenciais, isto é, o identificador do usuário e a senha; 
- A autenticação propriamente dita, isto é, a verificação das credenciais do usuário contra o banco de dados, deverá ser realizada no programa servidor (backend); 
- O mecanismo de autorização deverá garantir que somente usuários autenticados no sistema tenham acesso ao serviço de desofuscamento e ao CRUD de usuários; Isto implica em implementar o mecanismo de autorização tanto para as rotas do programa cliente (frontend) quanto do programa servidor (backend);
- Deve apresentar de maneira amigável mensagens de sucesso e de erro de autenticação e autorização; No caso específico de tentativa de acesso não autorizado, será considerado suficiente retornar o usuário para a interface de autenticação (tela de login).