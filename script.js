var form = {
    get element() {
      return document.getElementById('formCadastro');
    },
    submit: function(event) {
      event.preventDefault();
  
      var formData = new FormData(form.element);
      var data = {};
      formData.forEach(function(value, key) {
        data[key] = value;
      });
  
      table.add(data);
    }
  };

form.element.addEventListener('submit', form.submit);

var table = {
get element() {
    return document.getElementById('cadastros');
},
add: function(data) {

    var row = table.element.insertRow();

    var cell = row.insertCell();
    cell.style.display = 'flex'

    var deleteBtn = document.createElement('i');    
    deleteBtn.classList.add('delete-btn');    
    deleteBtn.classList.add('fa');
    deleteBtn.classList.add('fa-trash');    
    deleteBtn.title = 'Remover';
    deleteBtn.onclick = table.remove;
    cell.appendChild(deleteBtn);

    var editBtn = document.createElement('i');
    editBtn.type = 'button';
    editBtn.classList.add('delete-btn');    
    editBtn.classList.add('fa');
    editBtn.classList.add('fa-edit');  
    editBtn.title = 'Editar';     
    editBtn.onclick = table.edit; 
    cell.appendChild(editBtn);        

    for (var property in data) {
    var cell = row.insertCell();
    cell.innerHTML = data[property];
    }
},
remove: function(event) {
    var row = event.target.closest('tr');
    table.element.deleteRow(row.rowIndex);
},
edit: function(event) {
    var row = event.target.closest('tr');
    var tds = [...row.children];
     
    toggleOptionsTd(tds[0], 'editar') 

    tds[1].dataset.oldvalue = tds[1].innerText;
    tds[2].dataset.oldvalue = tds[2].innerText;

    tds[1].setAttribute("contenteditable", true);
    tds[2].setAttribute("contenteditable", true);  
},
confirmEdit: function (event) {    
    var row = event.target.closest('tr');
    var tds = [...row.children];   
    tds[0].innerHTML = "";
    
    tds[1].setAttribute("contenteditable", false);
    tds[2].setAttribute("contenteditable", false); 

    toggleOptionsTd(tds[0], '');
    alert("Sucesso! As modificações foram salvas!"); 
}, 
cancelEdit: function (event) {
    var row = event.target.closest('tr');
    var tds = [...row.children];   
    tds[0].innerHTML = "";
    
    tds[1].setAttribute("contenteditable", false);
    tds[2].setAttribute("contenteditable", false); 

    tds[1].innerText = tds[1].dataset.oldvalue;
    tds[2].innerText = tds[2].dataset.oldvalue;

    toggleOptionsTd(tds[0], '');
    alert("Alteração cancelada!"); 
}
};

function toggleOptionsTd(elemento, tipo){
    elemento.innerHTML = "";
    if (tipo === "editar") {        
        var cancelBtn = document.createElement('i');    
        cancelBtn.classList.add('delete-btn');    
        cancelBtn.classList.add('fa');
        cancelBtn.classList.add('fa-times');    
        cancelBtn.title = 'Cancelar';    
        cancelBtn.onclick = table.cancelEdit;   
        elemento.appendChild(cancelBtn);

        var confirmBtn = document.createElement('i');
        confirmBtn.type = 'button';    
        confirmBtn.classList.add('delete-btn');        
        confirmBtn.style.color = 'green';
        confirmBtn.classList.add('fa');
        confirmBtn.classList.add('fa-check');  
        confirmBtn.title = 'Confirmar';    
        confirmBtn.onclick = table.confirmEdit;      
        elemento.appendChild(confirmBtn);  
    } else {
        var deleteBtn = document.createElement('i');    
        deleteBtn.classList.add('delete-btn');    
        deleteBtn.classList.add('fa');
        deleteBtn.classList.add('fa-trash');    
        deleteBtn.title = 'Remover';
        deleteBtn.onclick = table.remove;
        elemento.appendChild(deleteBtn);

        var editBtn = document.createElement('i');
        editBtn.type = 'button';
        editBtn.classList.add('delete-btn');    
        editBtn.classList.add('fa');
        editBtn.classList.add('fa-edit');  
        editBtn.title = 'Editar';     
        editBtn.onclick = table.edit; 
        elemento.appendChild(editBtn);    
    }
}

window.onload = function() {
document.getElementsByName('nome')[0].value = 'João';
document.getElementsByName('email')[0].value = 'joao@mail.com';
};
