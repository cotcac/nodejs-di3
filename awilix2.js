const express = require('express');
const app = express();
const { asValue, createContainer, Lifetime } = require('awilix');
const container = createContainer()

// The `TodosService` lives in services/TodosService
container.loadModules(['services/*.js'], {
    // we want `TodosService` to be registered as `todosService`.
    formatName: 'camelCase',
    resolverOptions: {
        // We want instances to be scoped to the Express request.
        // We need to set that up.
        lifetime: Lifetime.SCOPED
    }
})


app.use((req, res, next) => {
    // We want a new scope for each request!
    req.container = container.createScope()
    // The `TodosService` needs `currentUser`
    req.container.register({
        currentUser: asValue(1) // from auth middleware... IMAGINATION!! :D
    })
    return next()
})
//routes handles
require('./router')(app);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});