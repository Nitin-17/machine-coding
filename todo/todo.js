/* 
Problem: Design a TODO app in Vanilla JS
*/

document.addEventListener("DOMContentLoaded", () => {
  const todoSubmit = document.querySelector(".todo-submit");
  const todoInput = document.querySelector(".todo-input");
  const todoList = document.querySelector(".todo-list");
  let editTodoMode = false;
  let currentTodoItemToEdit = null;

  document.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
      //we'll check if we're editing a todo or adding
      if (editTodoMode) {
        //assign the updated value to current selected todo item.
        currentTodoItemToEdit.firstChild.textContent = todoText;
        //change the submit button text
        todoSubmit.innerText = "Add Todo";
        editTodoMode = false;
        currentTodoItemToEdit = null;
        todoInput.value = "";
      } else {
        addTodo(todoText);
        todoInput.value = "";
      }
    } else {
      //console.log("Please enter a valid value in TODO");
      alert("Please enter a valid text in TODO");
    }
  });

  /* We can add a event handler for each todo item but that we'll decrease the performance. So we'll apply the concept
  of event delegation to make use of target */

  todoList.addEventListener("click", (e) => {
    //capture the target element
    const target = e.target;
    //check if it's a button
    if (target.tagName == "BUTTON") {
      //if its a button, then capture the parent node(todoItem)
      const todoItem = target.parentNode;
      //check for edit or delete
      if (target.innerText == "❌") {
        todoItem.remove();
      } else if (target.innerText == "✏️") {
        editTodoMode = true;
        //assign the clicked todo item to currentTodoItemToEdit
        currentTodoItemToEdit = todoItem;
        //change the button text
        todoSubmit.innerText = "Edit Todo";
        //assign the selected todo value to input, when adding todo we take li as first child in todoItem
        todoInput.value = todoItem.firstChild.textContent;
        todoInput.focus();
      }
    }
  });

  const addTodo = (todoText) => {
    const todoItem = document.createElement("li");
    const editButton = document.createElement("button");
    const removeButton = document.createElement("button");

    todoItem.innerHTML = `<span>${todoText}</span>`;
    editButton.innerText = `✏️`;
    removeButton.innerText = `❌`;

    todoItem.appendChild(editButton);
    todoItem.appendChild(removeButton);

    todoList.appendChild(todoItem);
  };
});
