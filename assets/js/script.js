'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// page navigation logic
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    const targetPage = navLink.textContent.trim().toLowerCase();

    pages.forEach((page) => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    navigationLinks.forEach((link) => link.classList.remove("active"));
    navLink.classList.add("active");
    window.scrollTo(0, 0);
  });
});

// contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// Project filter logic
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Toggle select dropdown (mobile view)
if (select) {
  select.addEventListener("click", () => {
    elementToggleFunc(select);
  });

  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      const selected = item.textContent.trim().toLowerCase();
      selectValue.textContent = item.textContent;
      elementToggleFunc(select);
      filterProjects(selected);
    });
  });
}

// Filter projects for desktop and mobile
const filterProjects = (category) => {
  filterItems.forEach(item => {
    const itemCategory = item.dataset.category.toLowerCase();
    if (category === "all" || category === itemCategory) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Filter buttons (desktop view)
let lastClickedBtn = filterBtns[0];
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const selected = btn.textContent.trim().toLowerCase();
    selectValue.textContent = btn.textContent;
    filterProjects(selected);
    lastClickedBtn.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

