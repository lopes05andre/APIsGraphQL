const { ApolloServer, gql} = require('apollo-server')
//Array de Perfis
const perfis = [
    {id: 1, nome: 'Comum'},
    {id: 2, nome: 'Administrador'}
]

//Array de usuários
const usuarios = [{
    id: 1,
    nome: 'João Silva',
    email: 'jsilva@email.com',
    idade: 45,
    perfil_id: 1
},{
    id: 2,
    nome: 'Andre Luiz',
    email: 'aluiz@email.com',
    idade: 36,
    perfil_id: 2
},{
    id: 3,
    nome: 'Daniela Moraes',
    email: 'dmoraes@email.com',
    idade: 28,
    perfil_id: 1
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
        id: Int!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
        perfil: Perfil
    }

    # Definindo o perfil
    type Perfil {
        id: Int
        nome: String
    }

    # Pontos de entrada da API!
    type Query {
        ola: String!  
        horaAtual: Date!
        usuarioLogado: Usuario   
        produtoEmDestaque: Produto  
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(id: Int): Usuario
        perfis: [Perfil]
        perfil(id: Int): Perfil
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
        },
        //Filtrar pelo perfil atribuido ao usuário
        perfil(usuario){
            const sels = perfis
            .filter(p => p.id === usuario.perfil_id)
            return sels ? sels[0] : null
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
        },
        usuario(_, { id }){
            const selecionados = usuarios
                .filter(u => u.id == id)
                return selecionados ? selecionados[0] : null
        },
        perfis(){
            return perfis
        },
        perfil(_, { id }){
            const selecionados = perfis
                .filter(p => p.id == id)
                return selecionados ? selecionados[0] : null
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

//Continua na aula 24. Fragment