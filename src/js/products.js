import SimpleBar from "simplebar";
export const simpleBar = new SimpleBar(
  document.querySelector(".modal-content")
);

window.addEventListener("load", async () => {
  const res = await fetch("./db.json");

  const products = await res.json();
  const topProducts = document.querySelector(".top-products__content");
  const catalogProducts = document.querySelector(".products__content");

  if (topProducts) {
    for (let i = 0; i < 4; i++) {
      topProducts.innerHTML += `<div class="product-card open-modal" data-index="${i}"><div class="product-card__img-container"><img src="${products[i].primaryImg}" alt="product-img"/></div><p class="product-card__title">${products[i].name}</p>
      </div>`;
    }
  }

  if (catalogProducts) {
    products.forEach((product, index) => {
      catalogProducts.innerHTML += `<div class="product-card open-modal" data-index="${index}"><div class="product-card__img-container"><img src="${product.primaryImg}" alt="product-img"/>
        </div>
        <p class="product-card__title" >
        ${product.name}
        </p>
      </div>`;
    });
  }

  function initButtons() {
    const openButts = document.querySelectorAll(".open-modal");

    openButts.forEach((butt) => {
      butt.addEventListener("click", (e) => {
        const cardId = e.target
          .closest(".product-card")
          .getAttribute("data-index");
        openModal(products[cardId]);
        simpleBar.recalculate();
      });
    });
  }

  initButtons();
});
