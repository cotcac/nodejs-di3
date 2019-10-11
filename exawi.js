const express = require('express');
const app = express();
const { createContainer, Lifetime } = require('awilix');
const { scopePerRequest } = require('awilix-express')
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

// Woah!
app.use(scopePerRequest(container))
app.use((req, res, next) => {
    // We want a new scope for each request!
    req.container = container.createScope()
    return next()
})
//routes handles
require('./router1')(app);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});