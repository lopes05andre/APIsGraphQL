const { ApolloServer, gql} = require('apollo-server')

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

//Continua na aula 19. Retornando Array