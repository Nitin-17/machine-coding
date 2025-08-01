document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.querySelector(".app-container");
  let products = [];
  let page = 1;

  const fetchProducts = async () => {
    try {
      const apiResponse = await fetch(
        "https://dragonball-api.com/api/characters?limit=50"
      );
      const data = await apiResponse.json();
      products = data?.items;
      console.log(products);
      if (products?.length > 0) {
        renderUI();
      }
    } catch (error) {
      console.log("Error in fetching API data");
    }
  };

  fetchProducts();

  const renderUI = () => {
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("products");
    //creating pagination div
    let pagination = document.createElement("div");
    pagination.classList.add("pagination");

    //creating product cards
    if (products?.length > 0) {
      products?.slice(page * 10 - 10, page * 10)?.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("single-product");
        productElement.innerHTML = `
            <img src="${product?.image}"/>
            <h3 class="title">${product?.name}</h3>
            <p class="description">${product?.description?.slice(0, 200)}</p>
            `;
        productsContainer.appendChild(productElement);
      });

      //creating previous button
      if (page > 1) {
        const previous = createPaginationButton(
          "⬅️",
          () => {
            pageHandler(page - 1);
          },
          false,
          page === 1
        );
        pagination.appendChild(previous);
      }

      //display middle numbers
      for (let i = 0; i < products?.length / 10; i++) {
        const middle = createPaginationButton(
          i + 1,
          () => {
            pageHandler(i + 1);
          },
          page === i + 1
        );
        pagination.appendChild(middle);
      }

      //creating next button
      if (page < products?.length / 10) {
        const next = createPaginationButton(
          "➡️",
          () => {
            pageHandler(page + 1);
          },
          false,
          page === Math.ceil(products.length / 10)
        );
        pagination.appendChild(next);
      }
    }
    //so that previous page content doesn't get added to next page
    appContainer.innerHTML = "";
    appContainer.appendChild(productsContainer);
    appContainer.appendChild(pagination);
  };

  const createPaginationButton = (
    text,
    clickHandler,
    isActive = null,
    isDisabled = false
  ) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    if (isActive) {
      button.classList.add("active");
    }
    if (isDisabled) {
      button.disabled = true;
      button.classList.add("disabled"); // Optional: for styling
    }
    return button;
  };

  //for added new page content
  const pageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products?.length / 10 &&
      selectedPage !== page
    ) {
      page = selectedPage;
      renderUI();
    }
  };
});
