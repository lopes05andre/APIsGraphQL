const { ApolloServer, gql} = require('apollo-server')

//Array de usuários
const usuarios = [{
    id: 1,
    nome: 'João Silva',
    email: 'jsilva@email.com',
    idade: 45
},{
    id: 2,
    nome: 'Andre Luiz',
    email: 'aluiz@email.com',
    idade: 36
},{
    id: 3,
    nome: 'Daniela Moraes',
    email: 'dmoraes@email.com',
    idade: 28
}]

const typeDefs = gql`
    # Criar um novo tipo Scalar para retornar uma data
    scalar Date

    # Criando um produto
    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    # Definindo tipo para usuário
    type Usuario {
        id: ID!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    # Pontos de entrada da API!
    type Query {
        ola: String!  
        horaAtual: Date!
        usuarioLogado: Usuario   
        produtoEmDestaque: Produto  
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
    }
`
//Resolvers retornam os dados
const resolvers = {
    //Resolvendo produtos com desconto
    Produto: {
        precoComDesconto(produto){
            if(produto.desconto){
                return produto.preco - (produto.preco * produto.desconto )
            } else {
                return produto.preco
            }
        }
    },
    //resolver para tratar o diferenciador de salario
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Query: {
        ola() {
            return "Bom dia!"
        },
        horaAtual() {
            return `${new Date}`
        },
        usuarioLogado(obj) {
            console.log(obj)
            return {
                id: 1,
                nome: 'Ana da Web',
                email: 'anadaweb@email.com',
                idade: 23,
                salario_real: 1234.56,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: 'Notebook Gamer',
                preco: 4890.89,
                desconto: 0.5
            }
        },
        numerosMegaSena() {
            // return [4,8,13,27,33,54]
            const crescente = (a, b) => a - b
            return Array(6).fill(0)
            .map(n => parseInt(Math.random() * 60 + 1))
            .sort(crescente)
        },
        usuarios() {
            return usuarios
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})

//Continua na aula 20. Passando Parâmetros para as Consultas