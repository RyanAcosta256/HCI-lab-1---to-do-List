// main.js

document.addEventListener("DOMContentLoaded", function() {
    var taskInput = document.getElementById("Mtask");
    var dateInput = document.getElementById("addD");
    var addButton = document.getElementById("addT");
    var ul = document.getElementById("to-dos");

    addButton.addEventListener("click", function() {
        var taskValue = taskInput.value;
        var dateValue = dateInput.value;
        var errorMessage = document.getElementById("errorMessage"); // Get the error message paragraph

        if (taskValue && dateValue) {
            // Create a new LI element
            var li = document.createElement("li");

            // Create a span element for the task and date information
            var taskSpan = document.createElement("span");
            taskSpan.textContent = taskValue + " - " + dateValue;

            // Create a dropdown menu for changing priority
            var priorityDropdown = createPriorityDropdown(li);

            // Create buttons for marking as done, undo, and delete
            var doneButton = document.createElement("button");
            doneButton.textContent = "Done";
            doneButton.type = "button";
            doneButton.addEventListener("click", function() {
                markDone(li);
            });

            var undoButton = document.createElement("button");
            undoButton.textContent = "Undo";
            undoButton.type = "button";
            undoButton.style.display = "none";
            undoButton.addEventListener("click", function() {
                undoMarkDone(li);
            });

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.type = "button";
            deleteButton.addEventListener("click", function() {
                deleteTask(li);
            });

            // Append the span, dropdown, and buttons to the LI element
            li.appendChild(taskSpan);
            li.appendChild(priorityDropdown);
            li.appendChild(doneButton);
            li.appendChild(undoButton);
            li.appendChild(deleteButton);

            // Add event listener for double click to mark as done
            li.addEventListener("dblclick", function() {
                markDone(li);
            });

            // Append the LI element to the UL
            ul.appendChild(li);

            // Clear the input fields
            taskInput.value = "";
            dateInput.value = "";

            // Clear the error message
            errorMessage.textContent = "";
        } else {
            // Update the error message
            errorMessage.textContent = "Please enter both task and date.";
        }
    });

    // Function to create a dropdown menu for changing priority
    function createPriorityDropdown(element) {
        var priorityDropdown = document.createElement("select");
        priorityDropdown.innerHTML = `
            <option value="default">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        `;
        priorityDropdown.addEventListener("change", function() {
            changePriority(element, priorityDropdown.value);
        });

        return priorityDropdown;
    }

    // Function to change priority when the dropdown selection changes
    function changePriority(element, selectedPriority) {
        // Apply color-coding based on selected priority
        if (selectedPriority === "high") {
            element.style.color = "red";
        } else if (selectedPriority === "medium") {
            element.style.color = "orange";
        } else if (selectedPriority === "low") {
            element.style.color = "green";
        } else {
            element.style.color = "black"; // Reset color if no priority is selected
        }
    }

    // Function to mark a task as done
    function markDone(element) {
        element.style.textDecoration = "line-through";
        element.querySelector("button:nth-child(4)").style.display = "inline"; // Show Undo button
        element.querySelector("button:nth-child(3)").style.display = "none"; // Hide Done button
    }

    // Function to undo marking a task as done
    function undoMarkDone(element) {
        element.style.textDecoration = "none";
        element.querySelector("button:nth-child(4)").style.display = "none"; // Hide Undo button
        element.querySelector("button:nth-child(3)").style.display = "inline"; // Show Done button
    }

    // Function to delete a task
    function deleteTask(element) {
        ul.removeChild(element);
    }
});
