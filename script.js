const addBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearAll");
let tasks = [];

addBtn.addEventListener("click", addTask);

function addTask() {
    const title = document.getElementById("titleInput").value.trim();
    const desc = document.getElementById("descInput").value.trim();
    const date = document.getElementById("dateInput").value;
    const time = document.getElementById("timeInput").value;

    if (title === "") return;

    const taskDateTime = date && time ? new Date(`${date}T${time}`) : null;

    const li = document.createElement("li");

    const header = document.createElement("div");
    header.className = "task-header";
    header.textContent = title;

    const description = document.createElement("div");
    description.className = "task-desc";
    description.textContent = desc || "(No Description)";

    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.innerHTML = `
        <span><strong>Date:</strong> ${date || "N/A"}</span><br>
        <span><strong>Time:</strong> ${time || "N/A"}</span>
    `;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = "Complete";
    completeBtn.onclick = () => li.classList.toggle("completed");

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
        li.remove();
        tasks = tasks.filter(t => t.element !== li);
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(header);
    li.appendChild(description);
    li.appendChild(meta);
    li.appendChild(actions);

    taskList.appendChild(li);

    if (taskDateTime) {
        tasks.push({ element: li, dateTime: taskDateTime });
    }

    document.getElementById("titleInput").value = "";
    document.getElementById("descInput").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("timeInput").value = "";
}

clearBtn.addEventListener("click", () => {
    taskList.innerHTML = "";
    tasks = [];
});

// Check for overdue tasks every 30 seconds
setInterval(() => {
    const now = new Date();
    tasks.forEach(task => {
        if (
            task.dateTime &&
            now > task.dateTime &&
            !task.element.classList.contains("completed")
        ) {
            task.element.classList.add("overdue");
        }
    });
}, 30000);
