document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") return; // Ignore empty tasks

        // Create list item
        const listItem = document.createElement("li");
        const taskSpan = document.createElement("span"); // Separate text for styling
        taskSpan.textContent = taskText;
        listItem.appendChild(taskSpan);

        // Create "Complete" button
        const completeButton = document.createElement("button");
        completeButton.textContent = "✓";
        completeButton.classList.add("complete-btn");
        completeButton.addEventListener("click", function () {
            taskSpan.classList.toggle("completed"); // Toggle strike-through and gray
        });

        // Create "Delete" button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", function () {
            listItem.remove(); // Remove task
        });

        // Append buttons to list item
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);

        // Append list item to the task list
        taskList.appendChild(listItem);

        // Clear input field
        taskInput.value = "";
    });
});


function showTab(tabName) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
}

function showNotification() {
    document.getElementById('notification').style.display = 'block';
}

function closeNotification() {
    document.getElementById('notification').style.display = 'none';
}

document.getElementById("submit-choices").addEventListener("click", function () {
    let selectedLanguage = document.querySelector('input[name="language"]:checked');
    let selectedYear = document.getElementById("year-dropdown").value;

    if (selectedLanguage) {
        let result = `You selected: ${selectedLanguage.value} and ${selectedYear}`;
        document.getElementById("result-choices").textContent = result;
    } else {
        document.getElementById("result-choices").textContent = "Please select a language.";
    }
});
