let arrLocalStorage = JSON.parse(localStorage.getItem('info')) || [];
if (arrLocalStorage.length === 0) {
  localStorage.setItem('info', JSON.stringify(data));
  arrLocalStorage = JSON.parse(localStorage.getItem('info'));
}

showDataPerson();

function showDataPerson() {
  const container = document.querySelector('.data_block');

  for (let i = 0; i < arrLocalStorage.length; i++) {
    const elem = createElement(
      'div', 
      {'data-person': i, id: arrLocalStorage[i].id}, 
      null, 
      arrLocalStorage[i].name + ', ' + arrLocalStorage[i].age + ' years', 
      container);

    const btn_view = createElement(
      'button', 
      {'data-view': i, className: 'view btn', id: arrLocalStorage[i].id}, 
      {click: showDetails},  
      'View', 
      elem);

    const btn_edit = createElement(
      'button', 
      {'data-edit': i, className: 'edit btn'}, 
      {click: editPerson}, 
      'Edit', 
      elem);

    const btn_remove = createElement(
      'button', 
      {'data-remove': i, className: 'remove btn'}, 
      {click: removePerson}, 
      'Remove', 
      elem); 
  }
}

function removePerson(event) {
  const categoryIndex = event.target.getAttribute('data-remove');
  document.querySelector('.details').innerHTML = '';
  if (event.target.className === 'remove btn'){
    document.querySelector('#popup').classList.add('open');
    document.querySelector('#popup_delete').addEventListener ('click', function() {
      arrLocalStorage.splice(categoryIndex, 1);
      localStorage.setItem('info', JSON.stringify(arrLocalStorage));
      event.target.closest('div').remove();
      document.querySelector('#popup').classList.remove('open');
    });
    document.querySelector('#popup_cancel').addEventListener ('click', function() {
      document.querySelector('#popup').classList.remove('open');
    });
  }
}

function editPerson(event) {
  const personIndex = event.target.getAttribute('data-edit');
  document.querySelector('.details').innerHTML = '';
  document.getElementById('form_block').classList.toggle('hidden');
  document.querySelector('.data_block').classList.add('block');
  document.getElementById('show_btn').classList.add('block');
  document.getElementById('save_user').classList.toggle('hidden');

  document.querySelector('input[name="name"]').value = arrLocalStorage[personIndex].name || data[personIndex].name;
  document.querySelector('input[name="password"]').value = arrLocalStorage[personIndex].password || data[personIndex].password;
  document.querySelector('input[name="number"]').value = arrLocalStorage[personIndex].age || data[personIndex].age;
  document.querySelector('input[name="mail"]').value = arrLocalStorage[personIndex].email || data[personIndex].email;
  document.querySelector('input[name="tel"]').value = arrLocalStorage[personIndex].phone || data[personIndex].phone;
  document.querySelector('input[name="card"]').value = arrLocalStorage[personIndex].card || data[personIndex].card;
  document.getElementById('save_form').addEventListener('click', function() {
    let error = formValidate(form);
    if (error === 0) {
      let formData = editUser();
    } else {
      return false;
    }
    function editUser() {
        const newName = document.querySelector('input[name="name"]').value;
        arrLocalStorage[personIndex].name = newName;
        const newPass = document.querySelector('input[name="password"]').value;
        arrLocalStorage[personIndex].password = newPass;
        const newAge = document.querySelector('input[name="number"]').value;
        arrLocalStorage[personIndex].age = newAge;
        const newMail = document.querySelector('input[name="mail"]').value;
        arrLocalStorage[personIndex].email = newMail;
        const newTel = document.querySelector('input[name="tel"]').value;
        arrLocalStorage[personIndex].phone = newTel;
        const newCard = document.querySelector('input[name="card"]').value;
        arrLocalStorage[personIndex].card = newCard;
        localStorage.setItem('info', JSON.stringify(arrLocalStorage));
        document.location.reload();
    }
  });
}

function showDetails(event) {
  const categoryId = Number(event.target.getAttribute('id'));
  const container = document.querySelector('.details');

  for (let i = 0; i < arrLocalStorage.length; i++) {
    if (arrLocalStorage[i].id === categoryId) {
      container.innerHTML = '';
      const elem = createElement(
        'div', 
        {className: 'details-text'}, 
        null, 
        null, 
        container);
        elem.innerHTML= `<p><b>Name:</b> ${arrLocalStorage[i].name}</p><p><b>Password:</b> ${arrLocalStorage[i].password}</p><p><b>Age:</b> ${arrLocalStorage[i].age}</p><p><b>Email:</b> ${arrLocalStorage[i].email}</p><p><b>Phone number:</b> ${arrLocalStorage[i].phone}</p><p><b>Card number:</b> ${arrLocalStorage[i].card}</p>`; 
    }
  }
}

document.getElementById('show_btn').addEventListener('click', function() {
    document.getElementById('form_block').classList.toggle('hidden');
    document.getElementById('save_form').classList.toggle('hidden');
    
    updateButton();
    sendform();
});

const form = document.querySelector('.form');
const message = document.querySelector('.message');
const messagePass = document.querySelector('.message_pass');

function sendform() {
  document.getElementById('save_user').addEventListener('click', function() {
      
    let error = formValidate(form);

    if (error === 0) {
      let formData = getDataForm();
    } else {
      return false;
    }

    function getDataForm(){
      const divForm = document.querySelector('.form');
      const name = document.forms[0].elements.name.value;
      const pass = document.forms[0].password.value;
      const age = document.forms[0].number.value;
      const mail = document.forms[0].mail.value;
      const tel = document.forms[0].tel.value;
      const card = document.forms[0].card.value;
      divForm.innerHTML = '';

      const userSave = {name: name, password: pass, age: age, email: mail, phone: tel, card: card, id: Date.now()};
      arrLocalStorage.push(userSave);
      localStorage.setItem('info', JSON.stringify(arrLocalStorage));
      document.location.reload();
    } 
  });
}

function formValidate(form) {
  let error = 0;
  let fielError = document.querySelectorAll('.field');

  for(i=0; i < fielError.length; i++) {
    const input = fielError[i];
    formAddRemove(input);

    if(input.classList.contains('name')) {
      if (validName(input) === false) {
        formAddError(input);
        error++;
      }     
    } else if (input.classList.contains('mail')) {
      if (validEmail(input) === false) {
        formAddError(input);
        error++;
      }
    } else if (input.classList.contains('pass')) {
      if (validPass(input) === false) {
        formAddErrorPass(input);
        error++;
      }
    } else if (input.classList.contains('number')) {
      if (validAge(input) === false) {
        formAddError(input);
        error++;
      }
    } else if (input.classList.contains('tel')) {
      if (validTel(input) === false) {
        formAddError(input);
        error++;
      }
    } else if (input.classList.contains('card')) {
      if (validCard(input) === false) {
        formAddError(input);
        error++;
      }
    }
  }
  return error;

  function formAddError(input) {
      input.classList.add('error');
      message.classList.add('show_message');
  }
  function formAddRemove(input) {
    input.classList.remove('error');
    message.classList.remove('show_message');
  }
  function formAddErrorPass(input) {
    input.classList.add('error');
    messagePass.classList.add('show_message');
  } 
  // valid email
  function validEmail(input) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  } 
  // valid name
  function validName(input) {
    return /^[A-Z][a-z]{1,} [A-Z][a-z]{1,}$/.test(input.value);
  }
  // valid name
  function validPass(input) {
    return /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g.test(input.value);
  }
  // valid age
  function validAge(input) {
    return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/.test(input.value);
  }
  // valid phone
  function validTel(input) {
    return /^(\s*)?(\+)?([- ()+]?\d[- ()+]?){10,14}(\s*)?$/.test(input.value);
  }
  // valid card
  function validCard(input) {
    return /^[0-9]{16}$/.test(input.value);
  }
}



