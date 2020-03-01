const express = require('express');
const expressGraphql = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const app = express();
const dummy_schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Person',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: function(){
                    return 'I am a person'
                }
            }
        })
    })
});

app.use("/persons", expressGraphql({
    graphiql:true,
    schema: dummy_schema
}));
app.listen(4000, function(){
    console.log('hello');
});