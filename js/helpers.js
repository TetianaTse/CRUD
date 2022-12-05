'use strict';
// create element

function createElement(tagName, attributes, handlers, content, parent) {
  const elem = document.createElement(tagName);
  if (attributes) {
    for (let key in attributes) {
      if (key === "className") {
        elem.setAttribute("class", attributes[key]);
      } else {
        elem.setAttribute(key, attributes[key]);
      }
    }
  }
  if (handlers) {
    for (let key in handlers) {
      elem.addEventListener(key, handlers[key]);
    }
  }

  elem.textContent = content;
  parent.appendChild(elem);

  return elem;
}

function updateButton() {
  const button = document.getElementById("show_btn");
  if (button.value === "Add") {
    button.value = "Cancel";
    document.querySelector(".data_block").classList.add("block");
    document.querySelector(".details").innerHTML = "";
  } else {
    button.value = "Add";
    document.querySelector(".data_block").classList.remove("block");
    let fielError = document.querySelectorAll(".field");
    for (let i = 0; i < fielError.length; i++) {
      const input = fielError[i];
      formAddRemove(input);
    }
  }
  function formAddRemove(input) {
    input.classList.remove("error");
    message.classList.remove("show_message");
    messagePass.classList.remove("show_message");
  }
}
