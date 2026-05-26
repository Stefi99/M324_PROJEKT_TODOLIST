import { useEffect, useState } from "react";
import logo from "./assets/react.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [taskdescription, setTaskdescription] = useState("");
  const [priority, setPriority] = useState("Mittel");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingPriority, setEditingPriority] = useState("Mittel");
  const [filter, setFilter] = useState("Alle");

  const loadTodos = () => {
    fetch("http://localhost:8080/")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (taskdescription.trim() === "") {
      alert("Leere Todos dürfen nicht gespeichert werden.");
      return;
    }

    fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskdescription: taskdescription.trim(),
        priority: priority,
        completed: false,
      }),
    })
      .then(() => {
        setTaskdescription("");
        setPriority("Mittel");
        loadTodos();
      })
      .catch((error) => console.log(error));
  };

  const handleDone = (todo) => {
    fetch("http://localhost:8080/done", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskdescription: todo.taskdescription,
      }),
    })
      .then(() => loadTodos())
      .catch((error) => console.log(error));
  };

  const handleDelete = (todo) => {
    fetch("http://localhost:8080/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskdescription: todo.taskdescription,
      }),
    })
      .then(() => loadTodos())
      .catch((error) => console.log(error));
  };

  const startEdit = (todo) => {
    setEditingTask(todo.taskdescription);
    setEditingText(todo.taskdescription);
    setEditingPriority(todo.priority || "Mittel");
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditingText("");
    setEditingPriority("Mittel");
  };

  const saveEdit = (event) => {
    event.preventDefault();

    if (editingText.trim() === "") {
      alert("Leere Todos dürfen nicht gespeichert werden.");
      return;
    }

    fetch("http://localhost:8080/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldTaskdescription: editingTask,
        taskdescription: editingText.trim(),
        priority: editingPriority,
      }),
    })
      .then(() => {
        cancelEdit();
        loadTodos();
      })
      .catch((error) => console.log(error));
  };

  const priorityValue = (priority) => {
    if (priority === "Hoch") return 3;
    if (priority === "Mittel") return 2;
    return 1;
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Offen") return !todo.completed;
    if (filter === "Erledigt") return todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort(
    (a, b) => priorityValue(b.priority) - priorityValue(a.priority),
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Meine ToDo Liste</h1>

        <form onSubmit={handleSubmit} className="todo-form">
          <label htmlFor="taskdescription">Neues Todo anlegen:</label>

          <input
            id="taskdescription"
            type="text"
            value={taskdescription}
            onChange={(event) => setTaskdescription(event.target.value)}
          />

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="Niedrig">Niedrig</option>
            <option value="Mittel">Mittel</option>
            <option value="Hoch">Hoch</option>
          </select>

          <button type="submit">Absenden</button>
        </form>

        <div className="filter-buttons">
          <button type="button" onClick={() => setFilter("Alle")}>
            Alle
          </button>
          <button type="button" onClick={() => setFilter("Offen")}>
            Offen
          </button>
          <button type="button" onClick={() => setFilter("Erledigt")}>
            Erledigt
          </button>
        </div>

        <ul className="todo-list">
          {sortedTodos.map((todo, index) => (
            <li
              key={todo.taskdescription}
              className={todo.completed ? "completed" : ""}
            >
              {editingTask === todo.taskdescription ? (
                <form onSubmit={saveEdit} className="edit-form">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                  />

                  <select
                    value={editingPriority}
                    onChange={(event) => setEditingPriority(event.target.value)}
                  >
                    <option value="Niedrig">Niedrig</option>
                    <option value="Mittel">Mittel</option>
                    <option value="Hoch">Hoch</option>
                  </select>

                  <button type="submit">Speichern</button>
                  <button type="button" onClick={cancelEdit}>
                    Abbrechen
                  </button>
                </form>
              ) : (
                <>
                  <span>
                    Task {index + 1}: {todo.taskdescription}
                  </span>

                  <span
                    className={
                      "priority priority-" +
                      (todo.priority || "Mittel").toLowerCase()
                    }
                  >
                    {todo.priority || "Mittel"}
                  </span>

                  <button type="button" onClick={() => startEdit(todo)}>
                    Bearbeiten
                  </button>

                  <button type="button" onClick={() => handleDone(todo)}>
                    {todo.completed ? "Offen setzen" : "Erledigt"}
                  </button>

                  <button type="button" onClick={() => handleDelete(todo)}>
                    Löschen
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
