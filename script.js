/************************************************
 *  1) GLOBAL NOTIFICATION FUNCTIONS
 *     (Needed because <img onclick="showNotification()"> is inline)
 ***********************************************/
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

/************************************************
 *  2) GLOBAL TAB SWITCHING FUNCTION
 *     (Needed because <button onclick="showTab('text')"> is inline)
 ***********************************************/
function showTab(tabName) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));

    // Show the selected tab
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

/************************************************
 *  3) MAIN LOGIC INSIDE DOMContentLoaded
 ***********************************************/
document.addEventListener("DOMContentLoaded", function () {
    
    // Optional: ensure the first <div class="content"> is active on page load.
    // If your index.html already has "active" on the first tab, you can omit this.
    // document.querySelector(".content").classList.add("active");

    /***********************************************
     * A) TO-DO LIST
     ***********************************************/
    const taskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    // Create/Reuse Export button if not present
    let exportButton = document.getElementById("export-tasks");
    if (!exportButton) {
        exportButton = document.createElement("button");
        exportButton.textContent = "Save List";
        exportButton.id = "export-tasks";
        exportButton.style.marginTop = "10px";
        // Append to the ToDo content area
        document.getElementById("todo").appendChild(exportButton);
    }

    // In-memory array to store tasks during session
    let tasks = [];

    // Helper: Add a single task to the DOM and to the tasks array
    function addTaskToDOM(text, completed = false) {
        const listItem = document.createElement("li");
        const taskSpan = document.createElement("span");
        taskSpan.textContent = text;
        listItem.appendChild(taskSpan);

        if (completed) {
            taskSpan.classList.add("completed");
        }

        // "Complete" button
        const completeButton = document.createElement("button");
        completeButton.textContent = "✓";
        completeButton.classList.add("complete-btn");
        completeButton.addEventListener("click", function () {
            taskSpan.classList.toggle("completed");

            // Update the tasks array for completion state
            tasks = tasks.map(task =>
                task.text === text
                    ? { text: task.text, completed: !task.completed }
                    : task
            );
        });

        // "Delete" button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", function () {
            listItem.remove();
            // Remove from tasks array
            tasks = tasks.filter(taskObj => taskObj.text !== text);
        });

        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);

        // Add the newly created task to our array
        tasks.push({ text, completed });
    }

    // When the user clicks the "Add" button
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") return; // ignore empty tasks

        addTaskToDOM(taskText);
        taskInput.value = ""; // clear the input
    });

    // Export tasks to a text file
    exportButton.addEventListener("click", function () {
        const taskStrings = tasks.map(task =>
            `${task.completed ? "[✓]" : "[ ]"} ${task.text}`
        );
        const blob = new Blob([taskStrings.join("\n")], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "tasks.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    /***********************************************
     * B) CHOICES TAB (CODING LANGUAGE + YEAR)
     ***********************************************/
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

    // NOTE: The tab switching is already handled by the inline onclick
    // calls in your <button class="tab" onclick="showTab('profile')"> etc.
});
