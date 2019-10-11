class TodoAPI {
    constructor({ todosService }) {
        this.todosService = todosService
    }
    getTodos(req, res) {
        return this.todosService.getTodos(req.params.id)
            .then(response => response.json())
            .then(todos => {
                res.json(todos)
            })
    }
}

module.exports = function (router) {
    router.get('/:id', (req, res) => {
        // We have our scope available!
        const api = new TodoAPI(req.container.cradle) // Awilix magic!
        return api.getTodos(req, res)
    })
}

