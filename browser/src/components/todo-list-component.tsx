import {TodoPublic} from "@shared/schemas-todo"
import {Check, Plus, Trash} from "lucide-react"
import {useState} from "react"
import {Button} from "./button-component"

type TodoListProps = {
  todos: TodoPublic[]
  isLoading: boolean
  userId: string
  onAddTodo: (title: string, userId: string) => void
  onToggleTodo: (id: string, completed: boolean) => void
  onDeleteTodo: (id: string) => void
}

export function TodoList({
  todos,
  isLoading,
  userId,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  const [newTodoTitle, setNewTodoTitle] = useState("")

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      onAddTodo(newTodoTitle.trim(), userId)
      setNewTodoTitle("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo()
    }
  }

  if (isLoading) {
    return (
      <div className="py-4 text-center">
        <div className="w-8 h-8 border-4 border-t-indigo-600 border-r-transparent border-b-indigo-600 border-l-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-gray-500">Loading todos...</p>
      </div>
    )
  }

  return (
    <div className="py-2">
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={handleAddTodo}
          disabled={!newTodoTitle.trim()}>
          Add
        </Button>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">No todos yet. Add one above!</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-100">
              <div className="flex items-center">
                <button
                  onClick={() => onToggleTodo(todo.id, !todo.completed)}
                  className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                    todo.completed
                      ? "bg-green-500 text-white"
                      : "border border-gray-300 bg-white"
                  }`}>
                  {todo.completed && <Check size={12} />}
                </button>
                <span
                  className={`${
                    todo.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-700"
                  }`}>
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-500">
                <Trash size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
