const express = require('express');
const expressGraphql = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');
const app = express();

const person_data = [
    {id: 10, name: 'Cedie Villanueva'},
    {id: 20, name: 'Lexis Boac'},
    {id: 30, name: 'Cedieio V.'},
    {id: 40, name: 'White Tiger'}
];
const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: 'This is the person object',
    fields: function(){
        return {
            id:{type: GraphQLNonNull(GraphQLInt)},
            name: {type: GraphQLNonNull(GraphQLString)},
            addresses: {
                type: GraphQLList(AddressType),
                resolve: function(person){
                    return address_data.filter(function(address){
                        return person.id == address.person_id;
                    })
                }
            }
            }
        
    }
});

const address_data = [
    {id: 10, street:'Makati', country:'Philippines', postcode:'1230', person_id: 10},
    {id: 10, street:'Legazpi', country:'Philippines', postcode:'1200', person_id: 10},
    {id: 10, street:'Capalaba', country:'Australia', postcode:'4597', person_id: 20},
    {id: 10, street:'Legazpi', country:'Philippines', postcode:'1200', person_id: 30},
    {id: 10, street:'Manila', country:'Philippines', postcode:'1155', person_id: 40}
];

const AddressType = new GraphQLObjectType({
    name: 'Address',
    description: 'This is the address object',
    fields: function(){
        return {
            id:{type: GraphQLNonNull(GraphQLInt)},
            street: {type: GraphQLNonNull(GraphQLString)},
            country: {type: GraphQLNonNull(GraphQLString)},
            street: {type: GraphQLNonNull(GraphQLString)},
            postcode: {type: GraphQLNonNull(GraphQLString)},
            person:{
                type: PersonType,
                resolve: function(address){
                    return person_data.find(function(person){
                        return address.person_id == person.id;
                    })
                }
            }
        }
    }
});

const dummy_person_object = new GraphQLObjectType({
    name: 'PersonType',
    description: 'PersonType',
    fields: function(){
        return {
            persons: {
                type: new GraphQLList(PersonType),
                description: 'List of Persons',
                resolve: function(){
                    return person_data;
                }
            },
            addresses: {
                type: new GraphQLList(AddressType),
                description: 'This is the list of addresses',
                resolve: function(){
                    return address_data;
                }
            }
        }
    }

});



const my_schema = new GraphQLSchema({
    query: dummy_person_object
})
app.use("/persons", expressGraphql({
    graphiql:true,
    schema: my_schema
}));
app.listen(4000, function(){
    console.log('hello');
});