const fetch = require('node-fetch');
module.exports = class TodosService {
    getTodos(id) {
        // use your imagination ;)
        console.log('[request]', id);
        return fetch('https://jsonplaceholder.typicode.com/todos/' + id)
    };
    getAll() {
        return fetch('https://jsonplaceholder.typicode.com/todos/')
    };
    insert(body) {
        return fetch('https://jsonplaceholder.typicode.com/posts/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }
}