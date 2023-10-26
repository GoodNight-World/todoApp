const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    // 새로운 아이템 객체 생성
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    }

    // 배열 처음에 아이템 추가
    todos.unshift(item);

    // 요소 생성하기
    const {itemEl, inputEl, editBtnEl, removeBtnEl} = createTodoElement(item);

    list.prepend(itemEl);
    inputEl.removeAttribute('disabled');
    inputEl.focus();
    saveTolocalStrorage();

}

function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if(item.complete){
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionEl = document.createElement('div');
    actionEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons');
    removeBtnEl.innerText ='remove';

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
        saveTolocalStrorage();
    })
    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
    })

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        if(item.complete){
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }

        saveTolocalStrorage();
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id!== item.id);
        itemEl.remove();
        saveTolocalStrorage();
    })

    actionEl.append(editBtnEl);
    actionEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionEl);

    return {itemEl, inputEl, editBtnEl, removeBtnEl};
}

function saveTolocalStrorage() {
    const data =  JSON.stringify(todos);
    localStorage.setItem('my_todos', data);
}

function loadFromlocalStrorage() {
    const data = localStorage.getItem('my_todos');
    if(data){
        todos = JSON.parse(data);
    }

    for(let item of todos){
        const {itemEl} = createTodoElement(item);
        list.append(itemEl);
    }
}

loadFromlocalStrorage();
