## Este guia fornece instruções para configurar um ambiente de trabalho utilizando Docker, incluindo a criação de containers para um banco de dados, Node.js e PHP. Será configurada a persistência de dados, a criação de um banco de dados e uma tabela, além de populá-la com dados. O Node.js será programado para buscar esses dados e o PHP será utilizado para expor o conteúdo em uma página web.

# Requisitos:

Docker instalado no ambiente de trabalho. instalar um .env com as seguintes credenciais:

    MYSQL_ROOT_PASSWORD=(senha)
    MYSQL_DATABASE=(nome do banco)

# Clone o Repositório:

git clone https://github.com/seu-usuario/seu-projeto.git cd seu-projeto

## Configuração do Docker Compose:

Crie um arquivo docker-compose.yml no diretório do projeto e adicione as seguintes configurações:

```yaml
version: '3'
services:
  mysql-container:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: sua_senha_root
      MYSQL_DATABASE: nome_do_banco
      MYSQL_USER: seu_usuario
      MYSQL_PASSWORD: sua_senha_usuario
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  node-container:
    image: node:latest
    volumes:
      - ./app:/app
    depends_on:
      - mysql-container

  php-container:
    image: php:apache
    volumes:
      - ./app:/var/www/html
    depends_on:
      - mysql-container
      volumes:
        mysql_data:
```

- Criação da Aplicação Node.js: Dentro do diretório app, crie um arquivo index.js e adicione o código para conectar ao banco e buscar dados.

- Criação da Página PHP: Crie uma página index.php também no diretório app para exibir os dados obtidos pelo Node.js.

- Persistência de Dados: A persistência de dados está configurada no volume mysql_data, garantindo que os dados do MySQL sejam mantidos mesmo após a parada dos containers.

## Execute o seguinte comando no terminal para iniciar os containers:

    docker-compose up -d

## Acesso à Aplicação Web:

Acesse a aplicação web em http://localhost:80 para visualizar os dados expostos pela página PHP.
Acesse a aplicação node em http://localhost:3000/produtos para visualizar os dados em formato JSON.

# Observações:
Certifique-se de substituir sua_senha_root, nome_do_banco, seu_usuario e sua_senha_usuario por informações adequadas no arquivo docker-compose.yml.
Modifique o código do Node.js conforme necessário para se conectar ao banco e buscar os dados específicos.
Personalize a página PHP para exibir os dados de acordo com suas necessidades.
Não esqueça de criar uma rede para conectar os seus containers.
