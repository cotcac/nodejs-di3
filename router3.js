const { makeInvoker, inject } = require('awilix-express')

function makeTodoAPI({ todosService }) {
    return {
        getTodos: (req, res) => {
            return todosService.getTodos()
                .then(response => response.json())
                .then(todos => {
                    res.json(todos)
                })
        }
    }
}
module.exports = function (router) {
    const api = makeInvoker(makeTodoAPI)
    router.get('/', api('getTodos'))
}

