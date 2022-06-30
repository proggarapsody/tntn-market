import { simpleBar } from "./products.js";

let modal = document.querySelector(".modal");
let modalContent = document.querySelector(".modal-content");

let image = document.querySelector(".modal__img");
let title = document.querySelector(".modal__title");
let descr = document.querySelector(".modal__descr");
let description = document.querySelector(".modal__description");
let usageMethod = document.querySelector(".modal__usageMethod");
let compound = document.querySelector(".modal__compound");
let kit = document.querySelector(".modal__kit");
let links = document.querySelector(".modal__links");

let closeButt = document.querySelector(".modal__close");

function openModal(product) {
  image.innerHTML = `<img class="primary-img" alt="product-img" src="${product.primaryImg}"></img><img class="secondary-img" alt="product-img" src="${product.secondaryImg}"></img>`;
  title.textContent = product.name;
  if (product.description) {
    description.innerHTML =
      `<b class="modal__description__title">Описание: </b>` +
      `<p class="modal__description__content">${product.description}</p>`;
  } else {
    description.innerHTML =
      `<b class="modal__description__title">Описание: </b>` +
      `<img alt="product-description" src="${product.imageDescription}" class="modal__description__content"></img>`;
  }

  usageMethod.innerHTML =
    `<b class="modal__usage__title">Способ применения: </b>` +
    `<p class="modal__usage__content">${product.usageMethod}</p>`;
  compound.innerHTML =
    `<b class="modal__compound__title">Состав: </b>` +
    `<p class="modal__compound__content">${product.compound}</p>`;
  kit.innerHTML =
    `<b class="modal__kit__title">Комплектация: </b>` +
    `<p class="modal__kit__content">${product.kit}</p>`;

  links.innerHTML = "";

  if (product.ozonLink) {
    links.innerHTML += `<a target="_blank" href="${product.ozonLink}" class="ozon-link">Смотреть на Ozon ---------------------------</a>`;
  }
  if (product.wildberriesLink) {
    links.innerHTML += `<a target="_blank" href="${product.wildberriesLink}" class="wildberries-link">Смотреть на Wildberries -------------------</a>`;
  }
  if (product.orderLink) {
    links.innerHTML += `<a target="_blank" href="${product.orderLink}" class="order-link">Оформить закупку (Дешевле) ------------</a>`;
  }
  setTimeout(() => {
    modal.style.display = "block";
  }, 300);
}

// // When the user clicks on <span> (x), close the modal
if (closeButt) {
  closeButt.onclick = function () {
    cleanModal();
    simpleBar.getScrollElement().scrollTop = 0;
    modal.style.display = "none";
  };
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    cleanModal();
    simpleBar.getScrollElement().scrollTop = 0;
    modal.style.display = "none";
  }
};

function cleanModal() {
  image.innerHTML = ``;
  title.textContent = "";

  description.innerHTML = ``;

  usageMethod.innerHTML = ``;
  compound.innerHTML = ``;
  kit.innerHTML = ``;

  links.innerHTML = "";
}

function reloadScrollBars() {
  document.documentElement.style.overflow = "auto"; // firefox, chrome
  document.body.scroll = "yes"; // ie only
}

function unloadScrollBars() {
  document.documentElement.style.overflow = "hidden"; // firefox, chrome
  document.body.scroll = "no"; // ie only
}

window.openModal = openModal;
