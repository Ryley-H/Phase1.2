function showNotification() {
    const notificationEl = document.getElementById('notification');
    if (notificationEl) {
        notificationEl.style.display = 'block';
    }
}

function closeNotification() {
    const notificationEl = document.getElementById('notification');
    if (notificationEl) {
        notificationEl.style.display = 'none';
    }
}

function showTab(tabName) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));

    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    
    const taskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    let tasks = []; 
    function addTaskToDOM(text, completed = false) {
        const listItem = document.createElement("li");
        const taskSpan = document.createElement("span");
        taskSpan.textContent = text;
        listItem.appendChild(taskSpan);

        if (completed) {
            taskSpan.classList.add("completed");
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = "✓";
        completeButton.classList.add("complete-btn");
        completeButton.addEventListener("click", function () {
            taskSpan.classList.toggle("completed");
            tasks = tasks.map(task =>
                task.text === text
                    ? { text: task.text, completed: !task.completed }
                    : task
            );
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", function () {
            listItem.remove();
            // Remove task from the array
            tasks = tasks.filter(taskObj => taskObj.text !== text);
        });

        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
        tasks.push({ text, completed });
    }

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") return; 

        addTaskToDOM(taskText);
        taskInput.value = ""; 
    });

    const submitChoicesBtn = document.getElementById("submit-choices");
    if (submitChoicesBtn) {
        submitChoicesBtn.addEventListener("click", function () {
            let selectedLanguage = document.querySelector('input[name="language"]:checked');
            let selectedYear = document.getElementById("year-dropdown").value;

            if (selectedLanguage) {
                let result = `You selected: ${selectedLanguage.value} and ${selectedYear}`;
                document.getElementById("result-choices").textContent = result;
            } else {
                document.getElementById("result-choices").textContent = "Please select a language.";
            }
        });
    }
});
