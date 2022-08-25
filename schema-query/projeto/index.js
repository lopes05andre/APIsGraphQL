const { ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
    # Pontos de entrada da API!
    type Query {
        ola: String  
        horaAtual: String      
    }
`
//Resolvers retornam os dados
const resolvers = {
    Query: {
        ola() {
            return "Bom dia!"
        },
        horaAtual(){
            return `${new Date}`
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

//Continua na aula 12. Tipos básicos do graphQL