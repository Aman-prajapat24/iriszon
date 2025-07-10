$(document).ready(function () {
  // Toggle search bar
  $('.mobile_search').click(function (event) {
    event.stopPropagation();
    $('.header_input-container').toggleClass('active');
  });

  $('.header_input-container').click(function (event) {
    event.stopPropagation();
  });

  // Toggle mobile menu
  $('.mobile_menu').click(function (event) {
    event.stopPropagation();
    $('.mobile-menu').toggleClass('show');
  });

  $('.mobile-menu').click(function (event) {
    event.stopPropagation();
  });

  // Address modal open/close
  $(document).on('click', '.add-address-btn', function (e) {
    e.stopPropagation();
    $('#addressModal').fadeIn().css('display', 'flex');
  });

  $(document).on('click', '.close-modal', function (e) {
    e.stopPropagation();
    $('#addressModal').fadeOut();
  });

  $(document).on('click', '.modal-content', function (e) {
    e.stopPropagation();
  });

  // Close on outside click
  $(window).click(function (e) {
    const $target = $(e.target);

    if ($('#addressModal').is(':visible') && !$target.closest('.modal-content, .add-address-btn').length) {
      $('#addressModal').fadeOut();
    }

    if (!$target.closest('.header_input-container, .mobile_search').length) {
      $('.header_input-container').removeClass('active');
    }

    if (!$target.closest('.mobile-menu, .mobile_menu').length) {
      $('.mobile-menu').removeClass('show');
    }
  });
});

// Sidebar nav active state
document.querySelectorAll(".nav__item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav__item").forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
  });
});

// Desktop dropdown menu hover
document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.querySelector('.dropdown');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  if (dropdown && dropdownMenu) {
    dropdown.addEventListener('mouseenter', () => dropdownMenu.style.display = 'block');
    dropdown.addEventListener('mouseleave', () => dropdownMenu.style.display = 'none');
  }
});

// Main hero Swiper
 new Swiper(".mySwiper", {
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    effect: "slide",
  });

// Multiple sliders (Responsive config)
const sliders = [
  { selector: ".shop_by_categories", mobile: 3, tablet: 5, desktop: 7 },
  { selector: ".HealthConcern", mobile: 3, tablet: 5, desktop: 7 },
  { selector: ".Top-Rated-Product", mobile: 1, tablet: 3, desktop: 4 },
  { selector: ".Best-Seller-Product", mobile: 1, tablet: 3, desktop: 4 },
  { selector: ".Primary-Slider-Product", mobile: 1, tablet: 3, desktop: 4 },
  { selector: ".Secondary-Slider-Product", mobile: 1, tablet: 3, desktop: 4 },
];

sliders.forEach((conf) => {
  if (document.querySelector(conf.selector)) {
    new Swiper(conf.selector, {
      slidesPerView: conf.mobile,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: conf.mobile, spaceBetween: 10 },
        768: { slidesPerView: conf.tablet, spaceBetween: 15 },
        1024: { slidesPerView: conf.desktop, spaceBetween: 20 },
      },
    });
  }
});

// Live search functionality
function handleSearch(inputId, resultId, queryId) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultId);
  const query = document.getElementById(queryId);

  input?.addEventListener('input', () => {
    const value = input.value.trim();
    if (value) {
      query.textContent = value;
      results.style.display = 'block';
    } else {
      results.style.display = 'none';
    }
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.style.display = 'none';
    }
  });
}

handleSearch('mobile-search', 'mobile-results', 'mobile-query');
handleSearch('web-search', 'web-results', 'web-query');

// Login/Signup Modal toggle
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

document.getElementById("openLogin")?.addEventListener("click", () => loginModal.style.display = "flex");
document.getElementById("openSignup")?.addEventListener("click", () => signupModal.style.display = "flex");
document.querySelector(".close-login")?.addEventListener("click", () => loginModal.style.display = "none");
document.querySelector(".close-signup")?.addEventListener("click", () => signupModal.style.display = "none");

document.getElementById("switchToSignup")?.addEventListener("click", () => {
  loginModal.style.display = "none";
  signupModal.style.display = "flex";
});
document.getElementById("switchToLogin")?.addEventListener("click", () => {
  signupModal.style.display = "none";
  loginModal.style.display = "flex";
});

window.addEventListener("click", (e) => {
  if (e.target === loginModal) loginModal.style.display = "none";
  if (e.target === signupModal) signupModal.style.display = "none";
});

// Navbar dropdown (desktop + mobile)
const navLinks = document.querySelectorAll('.nav-link');
const dropdowns = document.querySelectorAll('.dropdown-container');

function closeAllDropdowns() {
  dropdowns.forEach(d => d.style.display = 'none');
  navLinks.forEach(link => link.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    closeAllDropdowns();
    const dropdownId = link.getAttribute('data-dropdown') + '-dropdown';
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.style.display = 'block';
      link.classList.add('active');
    }
  });
});

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseleave', closeAllDropdowns);
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-link') && !e.target.closest('.dropdown-container')) {
    closeAllDropdowns();
  }
});

// Mobile navbar dropdown toggle
if (window.innerWidth < 992) {
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const dropdownId = this.getAttribute('data-dropdown') + '-dropdown';
      const dropdown = document.getElementById(dropdownId);
      if (dropdown) {
        e.preventDefault();
        if (dropdown.style.display === 'block') {
          dropdown.style.display = 'none';
          this.classList.remove('active');
        } else {
          closeAllDropdowns();
          dropdown.style.display = 'block';
          this.classList.add('active');
        }
      }
    });
  });
}

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const toggleBtn = document.getElementById("toggleBtn");

  sidebar.classList.toggle("mobile-visible");
  overlay.classList.toggle("active");

  toggleBtn.classList.toggle("hidden", sidebar.classList.contains("mobile-visible"));
}

// Sidebar submenu toggle
function toggleSubmenu(el) {
  const submenu = el.nextElementSibling;
  const arrow = el.querySelector('.arrow i');

  document.querySelectorAll(".submenu").forEach(menu => {
    if (menu !== submenu) menu.classList.remove("open");
  });

  document.querySelectorAll(".arrow i").forEach(icon => {
    if (icon !== arrow) icon.classList.remove("rotated");
  });

  submenu.classList.toggle("open");
  arrow.classList.toggle("rotated");
}

// Accordion and product image switching
function toggleAccordion(element) {
  element.classList.toggle('active');
  document.querySelectorAll('.accordion-header').forEach(header => {
    if (header !== element) header.classList.remove('active');
  });
}

function changeImage(element) {
  const mainImage = document.getElementById("mainProductImage");
  mainImage.src = element.src;
  document.querySelectorAll('.thumb').forEach(img => img.classList.remove('active'));
  element.classList.add('active');
}

// Sign-in/up switch inside modals
function showSignUpForm() {
  document.getElementById('signInForm').style.display = 'none';
  document.getElementById('signUpForm').style.display = 'block';
}
function showSignInForm() {
  document.getElementById('signInForm').style.display = 'block';
  document.getElementById('signUpForm').style.display = 'none';
}

// Profile form submission
document.getElementById("profileForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Profile updated successfully!");
});

// ===== Checkout Address Card Handling =====
function saveAddress(event) {
  event.preventDefault();

  const form = event.target;
  const apartment = form.apartment.value;
  const street = form.street.value;
  const city = form.city.value;
  const state = form.state.value;
  const postalCode = form.postalCode.value;

  const addressLine1 = `${apartment}, ${street}`;
  const addressLine2 = `${city}, ${state}, ${postalCode}`;

  const addressCard = document.createElement('div');
  addressCard.classList.add('address-card');
  addressCard.setAttribute('onclick', 'selectAddress(this)');
  addressCard.innerHTML = `
    <span class="delete-address" onclick="event.stopPropagation(); deleteAddress(this)">Delete</span>
    <p>${addressLine1}</p>
    <p>${addressLine2}</p>
  `;

  const container = document.getElementById('addressCards');
  container.appendChild(addressCard);

  document.getElementById('addressAlert').style.display = 'none';
  document.getElementById('addressModal').style.display = 'none';
  form.reset();
}

function selectAddress(cardElement) {
  document.querySelectorAll('.address-card').forEach(card => card.classList.remove('selected'));
  cardElement.classList.add('selected');
}

function deleteAddress(el) {
  const card = el.closest('.address-card');
  card.remove();
  if (!document.getElementById('addressCards').children.length) {
    document.getElementById('addressAlert').style.display = 'block';
  }
}


/* ====== Top rated products start ======= */

let productSlider;

function initProductSlider() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1025 && !productSlider) {
    productSlider = new Swiper(".productSlider", {
      slidesPerView: 4,
      spaceBetween: 32,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      speed: 800,
    });
  } else if (screenWidth < 1025 && productSlider) {
    productSlider.destroy(true, true);
    productSlider = undefined;
  }
}

window.addEventListener("load", initProductSlider);
window.addEventListener("resize", initProductSlider);

/* ====== Top rated products end ======= */



////////// Search result box  start ////////

// header 
 const toggleBtn = document.getElementById('toggleSearch');
  const searchBar = document.getElementById('mobileSearchBar');

  toggleBtn.addEventListener('click', () => {
    searchBar.classList.toggle('d-none');
  });

  
const suggestions = [
  {
    name: "PENDERM ++",
    price: "₹117.6",
    image: "./assets/product-17-1.jpg"
  },
   {
    name: "PENDERM ++",
    price: "₹117.6",
    image: "./assets/product-17-1.jpg"
  },
   {
    name: "PENDERM ++",
    price: "₹117.6",
    image: "./assets/product-17-1.jpg"
  },
   {
    name: "PENDERM ++",
    price: "₹117.6",
    image: "./assets/product-17-1.jpg"
  },
  
  {
    name: "DERMI5",
    price: "₹54.45",
    image: "./assets/product-17-1.jpg"
  }
];

const input = document.getElementById("web-search");
const box = document.getElementById("searchSuggestions");
const keywordSpan = document.getElementById("searchKeyword");
const table = document.getElementById("suggestionTable");

input.addEventListener("input", () => {
  const keyword = input.value.trim();
  if (keyword === "") {
    box.classList.add("d-none");
    return;
  }

  const filtered = suggestions.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  keywordSpan.textContent = keyword;
  table.innerHTML = filtered
    .map(
      item => `
        <tr>
          <td><img src="${item.image}" alt="${item.name}"></td>
          <td><div class="product-name">${item.name}</div></td>
          <td><div class="product-price">${item.price}</div></td>
          <td><button>Add to Cart</button></td>
        </tr>`
    )
    .join("");

  box.classList.remove("d-none");
});


/////// mobile ////////

const mobileSuggestions = [
  {
    name: "PENDERM ++",
    price: "₹117.6",
    image: "./assets/product-17-1.jpg"
  },
   {
    name: "PENDERM ++",
    price: "₹117.6",
    image: "./assets/product-17-1.jpg"
  },
   {
    name: "PENDERM ++",
    price: "₹117.6",
    image: "./assets/product-17-1.jpg"
  },
   {
    name: "PENDERM ++",
    price: "₹117.6",
    image: "./assets/product-17-1.jpg"
  },
  {
    name: "DERMI5",
    price: "₹54.45",
    image: "./assets/product-17-1.jpg"
  }
];

const mobileInput = document.getElementById("mobile-search");
const mobileBox = document.getElementById("mobileSearchSuggestions");
const mobileKeywordSpan = document.getElementById("mobileSearchKeyword");
const mobileTable = document.getElementById("mobileSuggestionTable");

mobileInput.addEventListener("input", () => {
  const keyword = mobileInput.value.trim();
  if (keyword === "") {
    mobileBox.classList.add("d-none");
    return;
  }

  const filtered = mobileSuggestions.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  mobileKeywordSpan.textContent = keyword;
  mobileTable.innerHTML = filtered
    .map(
      item => `
        <tr>
          <td><img src="${item.image}" alt="${item.name}"></td>
          <td><div class="product-name">${item.name}</div></td>
          <td><div class="product-price">${item.price}</div></td>
          <td><button>Add to Cart</button></td>
        </tr>`
    )
    .join("");

  mobileBox.classList.remove("d-none");
});

////////// Search result box  end ////////
