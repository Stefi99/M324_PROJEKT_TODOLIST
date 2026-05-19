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

  const handleSubmit = (event) => {
    event.preventDefault();
        if (taskdescription.trim() === "") {
      alert("Leere Todos dürfen nicht gespeichert werden.");
      return;
    }
    console.log("Sending task description to Spring-Server: "+taskdescription);
    fetch("http://localhost:8080/tasks", {  // API endpoint (the complete URL!) to save a taskdescription
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskdescription: taskdescription.trim(),
        priority: priority,
      }),
    })
      .then((response) => {
        console.log("Receiving answer after sending to Spring-Server: ");
        console.log(response);
        window.location.href = "/";
        setTaskdescription("");
        setPriority("Mittel");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    setTaskdescription(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const handleDelete = (event, taskdescription) => {
    fetch("http://localhost:8080/delete", {
      method: "POST",
      body: JSON.stringify({ taskdescription: taskdescription }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Receiving answer after deleting on Spring-Server: ");
        console.log(response);
        window.location.href = "/";
      })
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
      body: JSON.stringify({
        oldTaskdescription: editingTask,
        taskdescription: editingText.trim(),
        priority: editingPriority,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Receiving answer after updating on Spring-Server: ");
        console.log(response);
        window.location.href = "/";
      })
      .catch((error) => console.log(error));
  };

  const priorityValue = (priority) => {
    if (priority === "Hoch") return 3;
    if (priority === "Mittel") return 2;
    return 1;
  };

  const renderTasks = (todos) => {
    const sortedTodos = [...todos].sort(
      (a, b) => priorityValue(b.priority) - priorityValue(a.priority),
    );

    return (
      <ul className="todo-list">
        {sortedTodos.map((todo, index) => (
          <li key={todo.taskdescription}>
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
                  {"Task " + (index + 1) + ": " + todo.taskdescription}
                </span>

                <span
                  className={
                    "priority priority-" +
                    (todo.priority || "Mittel").toLowerCase()
                  }
                >
                  {todo.priority || "Mittel"}
                </span>

                <button onClick={() => startEdit(todo)}>Bearbeiten</button>

                <button
                  onClick={(event) => handleDelete(event, todo.taskdescription)}
                >
                  &#10004;
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>ToDo Liste</h1>

        <form onSubmit={handleSubmit} className="todo-form">
          <label htmlFor="taskdescription">Neues Todo anlegen:</label>

          <input type="text" value={taskdescription} onChange={handleChange} />

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

        <div>{renderTasks(todos)}</div>
      </header>
    </div>
  );
}

export default App;
