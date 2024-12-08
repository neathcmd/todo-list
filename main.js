(() => {
  const $addTodoForm = document.querySelector("#add-todo-form");
  const $newTodoInput = document.querySelector("#new-todo-input");
  const $todos = document.querySelector("#todos");

  const handleTodoEditClick = (event) => {
    event.stopPropagation();

    const $editButton = event.currentTarget;
    const $todo = $editButton.parentElement.parentElement;
    let $todoTitle = $todo.querySelector(".todo__title");
    let $todoInput = $todo.querySelector(".todo__input");

    if ($todoTitle) {
      $todoInput = document.createElement("input");
      $todoInput.classList.add("input", "todo__input");
      $todoInput.value = $todoTitle.textContent;

      $todo.removeChild($todoTitle);
      $todo.prepend($todoInput);
    } else {
      $todoTitle = document.createElement("span");
      $todoTitle.classList.add("todo__title");
      const title = $todoInput.value.trim();

      if (title) {
        $todoTitle.textContent = $todoInput.value;
        $todo.removeChild($todoInput);
        $todo.prepend($todoTitle);
      }
    }
  };

  const handleTodoDeleteClick = (event) => {
    event.stopPropagation();

    const $deleteButton = event.currentTarget;
    const $todo = $deleteButton.parentElement.parentElement;
    $todo.classList.add("todo--delete");

    setTimeout(() => {
      $todos.removeChild($todo);
    }, 300);
  };

  const handleTodoTitleClick = (event) => {
    const $todo = event.currentTarget;
    $todo.classList.toggle("todo__title--done");
  };

  function createTodo(value) {
    const $todoTitle = document.createElement("span");
    $todoTitle.classList.add("todo__title");
    $todoTitle.textContent = value;
    $todoTitle.addEventListener("click", handleTodoTitleClick);

    const $item = document.createElement("li");
    $item.classList.add("todo");

    const $editButton = document.createElement("button");
    $editButton.classList.add("button", "todo__button", "todo__button--edit");
    $editButton.textContent = "Edit";
    $editButton.addEventListener("click", handleTodoEditClick);

    const $deleteButton = document.createElement("button");
    $deleteButton.classList.add(
      "button",
      "todo__button",
      "todo__button--delete"
    );
    $deleteButton.textContent = "Delete";
    $deleteButton.addEventListener("click", handleTodoDeleteClick);

    const $buttonsWrapper = document.createElement("div");
    $buttonsWrapper.classList.add("todo__buttons-wrapper");
    $buttonsWrapper.append($editButton);
    $buttonsWrapper.append($deleteButton);

    $item.appendChild($todoTitle);
    $item.appendChild($buttonsWrapper);

    return $item;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const task = $newTodoInput.value.trim();

    if (!task.length) return;

    const $todo = createTodo(task);
    $todos.appendChild($todo);

    $newTodoInput.value = "";
  };

  $addTodoForm.addEventListener("submit", handleFormSubmit);
})();
