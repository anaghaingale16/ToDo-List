var todo = [];
let title = document.getElementById("form1")
function save() {
  if (title.value != "") {
    console.log(title.value);
    todo.push(title.value);
    localStorage.setItem("todos", todo.toString());
    document.getElementById("form1").value = "";
    fetchTodos();
  } else {
    alert("Enter valid data");
  }
  console.log(todo);
};


function fetchTodos() {
  let strings = localStorage.getItem("todos");
  todo = strings.split(",");
  let table = `
    <tr>
        <th scope="col">No.</th>
        <th scope="col">Todo item</th>
        <th scope="col">Actions</th>
    </tr>
`;

  let counter = 0;
  todo.forEach(element => {
    counter++;
    table += `<tr>
  <th scope="row">${counter}</th>
  <td>${element}</td>
  <td>
      <button class="btn btn-warning" onclick="edit(${counter})"><i class="fas fa-edit"
              style="color: #fff;"></i></button>
      <button class="btn btn-danger ms-1" onclick="deleteTodo(${counter})"><i
              class="fa-solid fa-trash "></i></button>
  </td>
</tr>`;

  });
  document.getElementById("table-data").innerHTML = table;
};


function deleteTodo(counter) {
  let confirmDel = confirm("Do you want to delete?");
  if (confirmDel == true) {
    todo.splice(counter - 1, 1);

    localStorage.setItem("todos", todo.toString());
  };
  fetchTodos();
  if (todo == "") {
    remove();
  }
}

function edit(counter) {
  let edit = prompt("Do you want to change Todo item?", todo[counter - 1]);
  if (edit != "" && edit) {
    todo[counter - 1] = edit;
    localStorage.setItem("todos", todo.toString());
    fetchTodos();
  }
}

function remove() {
  localStorage.removeItem("todos");
  document.getElementById("table-data").innerHTML = "";
  todo = [];
}