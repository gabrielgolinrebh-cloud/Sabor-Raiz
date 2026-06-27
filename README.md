# Sabor Raiz (Website de Empresa de Confeção de Presentes)

## Sobre a Empresa
Venda de cestas artesanais, produtos regionais e presentes personalizados. A marca valoriza produtores locais, alimentos artesanais e experiências afetivas, oferecendo cestas para datas comemorativas, empresas e clientes que buscam presentes diferenciados.

## Sobre a Arquitetura
`estruturação em andamento...`

## Integrantes do Grupo
* Brenon Gustavo Fossa
* Gabriel Golin
* Flávia Caroline Sentena
* Kauã Kousen

## Recursos Utilizados
* JavaScript (.js)
* React (.jsx)
* CSS (.module.CSS)
* MySQL (sql)
* GitHub (repositório)

## Repositório do Projeto (GitHub)
1. git clone https://github.com/gabrielgolinrebh-cloud/Sabor-Raiz

## Entidades
* **Cliente:** Nome, Email, CPF, Senha, Telefone, Endereço.
* **Produto:** Nome, Preço, Descrição, Estoque, Categoria.
* **Pedido:** ID Pedido, Cliente (ID Pedido), Data, Status, Valor Total.

## Endpoints
* **Clientes:**
    * `POST /clientes` - Cadastrar novo cliente.
    * `GET /clientes` - Listar todos clientes.
    * `PUT /clientes:id` - Editar cliente.
    * `PUT /clientes:id` - Excluir cliente.
* **Produtos:**
    * `GET /produtos` - Listar todos produtos disponíveis.
    * `GET /produtos:id` - Pesquisar produto.
    * `POST /produtos` - Adicionar novo produto (exclusivamente Admins).
    * `POST /produtos:id` - Remover produto (exclusivamente Admins).
* **Pedidos:**
    * `POST /pedidos:id` - Fazer pedido.
    * `POST /pedidos:id` - Cancelar pedido.

## Logo
   ![Logo Sabor Raiz](docs/imagens/logo_Sabor_Raiz.png)