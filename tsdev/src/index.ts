import express, { Request, Response } from 'express';

class TodoModel {
    private todos: string[] = [];

    addTodo(todo: string): void {
        this.todos.push(todo);
    }

    removeTodo(index: number): void {
        if (index >= 0 && index < this.todos.length) {
            this.todos.splice(index, 1);
        }
    }

    getTodos(): string[] {
        return this.todos;
    }
}

class TodoView {
    render(todos: string[]): string {
        const todoList = todos
            .map((todo, index) => `<li>${index + 1}. ${todo} <a href="/delete/${index}">Delete</a></li>`)
            .join('');
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Todo List</title>
            </head>
            <body>
                <h1>Todo List</h1>
                <ul>${todoList}</ul>
                <form action="/add" method="post">
                    <label for="todoInput">New Todo:</label>
                    <input type="text" id="todoInput" name="todo" required>
                    <button type="submit">Add Todo</button>
                </form>
            </body>
            </html>
        `;
    }
}

class TodoController {
    private model: TodoModel;
    private view: TodoView;

    constructor(model: TodoModel, view: TodoView) {
        this.model = model;
        this.view = view;
    }

    addTodo(todo: string): void {
        this.model.addTodo(todo);
    }

    removeTodo(index: number): void {
        this.model.removeTodo(index);
    }

    getTodos(): string[] {
        return this.model.getTodos();
    }
}

const app = express();
const model = new TodoModel();
const view = new TodoView();
const controller = new TodoController(model, view);

app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    const todos = controller.getTodos();
    const html = view.render(todos);
    res.send(html);
});

app.post('/add', (req: Request, res: Response) => {
    const newTodo = req.body.todo;
    if (newTodo) {
        controller.addTodo(newTodo);
    }
    res.redirect('/');
});

app.get('/delete/:index', (req: Request, res: Response) => {
    const index = parseInt(req.params.index, 10);
    controller.removeTodo(index);
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});