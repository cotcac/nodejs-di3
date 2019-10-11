const { makeInvoker } = require('awilix-express')

function makeTodoAPI({ todosService }) {
    return {
        getTodos: (req, res) => {
            return todosService.getTodos(req.params.id)
                .then(response => response.json())
                .then(todos => {
                    res.json(todos)
                })
        },
        getAll: (req, res) => {
            return todosService.getAll()
                .then(response => response.json())
                .then(todos => {
                    res.json(todos)
                })
        },
        insert: (req, res) => {
            return todosService.insert(req.body)
                .then(response => response.json())
                .then(todos => {
                    res.json(todos)
                })
        }
    }
}
const api = makeInvoker(makeTodoAPI)
module.exports = function (router) {
    router.get('/:id', api('getTodos'));
    router.get('/', api('getAll'));
    router.post('/', api('insert'));
}

