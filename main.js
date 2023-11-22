const btn = document.getElementById('btn-add');
const boxText = document.getElementById('box-text');
const tarefa = document.getElementById('list');
const boxTitle = document.getElementById('box-title')


btn.addEventListener('click', function(e) {
     
    const newTitle = boxTitle.value
    const newText = boxText.value;
    

    if(newText == ''){
        return alert('Campo em branco')
    }
    const newElement = document.createElement('li');
    newElement.innerHTML = `
        <h2>${newTitle}</h2>
        <span>${newText}</span>
        <i class="material-icons btns btn-del">delete_forever</i>
    `;
  tarefa.appendChild(newElement)

  const btnDel = newElement.querySelector('.btn-del')
  
  btnDel.addEventListener('click', function(){
    tarefa.removeChild(newElement);
  })

  boxText.value = ''

});
