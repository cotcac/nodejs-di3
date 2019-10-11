const express = require('express');
const app = express();

const TodosService = require('./services/TodosService');
class TodoAPI {
    constructor({ todosService }) {
        this.todosService = todosService
    }
    getTodos(req, res) {
        return this.todosService.getTodos()
        .then(response => response.json())
        .then(todos=>{
            res.json(todos)
        })
    }
}
app.get('/', function (req, res) {
    const api = new TodoAPI({
        todosService: new TodosService(
            { currentUser: 1 }
        )
    })
    // invoke the method.
    return api.getTodos(req, res)
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});