
  
 if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}

 function toggleMenu(source = 'main') {
  const navLinks = document.getElementById("navLinks");
  const toggleMain = document.getElementById("menuToggle");
  const toggleCompact = document.getElementById("menuToggleCompact");

  const clickedToggle = source === 'compact' ? toggleCompact : toggleMain;
  const otherToggle = source === 'compact' ? toggleMain : toggleCompact;

  otherToggle?.classList.remove("open");

  const isOpening = !clickedToggle.classList.contains("open");
  clickedToggle.classList.toggle("open", isOpening);

  navLinks.classList.toggle("active", isOpening);
  navLinks.classList.toggle("mobile-hidden", !isOpening);

  if (isOpening) {
    if (source === 'compact') {
      const rect = clickedToggle.getBoundingClientRect();
      navLinks.style.position = 'fixed';
      navLinks.style.top = `${rect.bottom}px`;
      navLinks.classList.add("prevent-scroll");
    } else {
      navLinks.style.position = ''; // reset to CSS (absolute with top: 100%)
      navLinks.style.top = '';
    }
  } else {
    
    navLinks.classList.remove("prevent-scroll");
	  // Wait for the transition (400ms) before hiding completely
    setTimeout(() => {
      navLinks.classList.add("mobile-hidden");
      navLinks.style.top = '';
      navLinks.style.position = '';
    }, 400); // Match CSS transition time

    clickedToggle.classList.remove("open");
    navLinks.classList.remove("prevent-scroll");
  }
}
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    const navLinks = document.getElementById("navLinks");
    const toggleMain = document.getElementById("menuToggle");
    const toggleCompact = document.getElementById("menuToggleCompact");

    navLinks.classList.remove("active", "prevent-scroll"); 
    navLinks.classList.add("mobile-hidden");
    navLinks.style.top = '';
    navLinks.style.position = '';

    toggleMain?.classList.remove("open");
    toggleCompact?.classList.remove("open");
  });
});

function handleContactForm(event) {
  event.preventDefault();

  const form = event.target;

  const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    const isHiddenInput = field.type === "hidden" || field.readOnly;
    const parent = field.closest('.custom-select');

    if (!field.value.trim()) {
      isValid = false;
      field.classList.add("input-error");

      // For custom dropdowns: show message inside the visible element
      if (isHiddenInput && parent) {
        const selected = parent.querySelector('.selected');
        selected.classList.add("input-error");

        const labelType = field.name.includes("class") ? "class" : "course";
        selected.textContent = `Please select your ${labelType}`;
      }
    } else {
      field.classList.remove("input-error");

      if (isHiddenInput && parent) {
        const selected = parent.querySelector('.selected');
        selected.classList.remove("input-error");

        // Restore selected label if input is valid
        selected.textContent = field.value;
      }
    }
  });

  if (!isValid) {
    return; 
  }
 const toast = document.getElementById("toast");
const toastBar = toast?.querySelector(".toast-bar");

if (toast && toastBar) {
  toast.style.display = "block";
  toast.classList.remove("fade-active", "fade-out");
  void toast.offsetWidth;
  toast.classList.add("fade-active");
  toastBar.style.animation = "none";
  void toastBar.offsetHeight; 
  toastBar.style.animation = "toast-timer 3s linear forwards";
  setTimeout(() => {
    toast.classList.remove("fade-active");
    toast.classList.add("fade-out");
    setTimeout(() => {
      toast.style.display = "none";
      toast.classList.remove("fade-out");
    }, 400); 
  }, 3200); 
}
  form.reset();
 form.querySelectorAll('.custom-select').forEach(select => {
    const selected = select.querySelector('.selected');
    const hiddenInput = select.querySelector('input[type="hidden"]');

    selected.textContent = selected.getAttribute("data-default");
    selected.classList.remove("input-error");

    hiddenInput.value = '';
    hiddenInput.classList.remove("input-error");

    select.classList.remove('has-value');
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (!scrollToTopBtn) {
    console.warn("Element with ID 'scrollToTopBtn' not found.");
    return;
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
	document.querySelectorAll('#courses .tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
      
      document.querySelectorAll('#courses .tab-item').forEach(t => t.classList.remove('active'));
      
      document.querySelectorAll('#courses .content-panel').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      // show its panel
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });
	document.addEventListener("DOMContentLoaded", () => {
  const fullHeader = document.getElementById("full-header");
  const compactHeader = document.getElementById("compact-header");

  if (fullHeader && compactHeader) {
    window.addEventListener("scroll", () => {
      const showCompact = window.scrollY > 100;
      compactHeader.classList.toggle("visible", showCompact);
      fullHeader.classList.toggle("hidden", showCompact);
    });
  }
});
const swiper = new Swiper(".myHeroSwiper", {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  speed: 800,
  effect: 'slide',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
const loginBtn = document.getElementById("loginBtn");
  const fixedLoginBtn = document.getElementById("fixedLoginBtn");
  const loginModal = document.getElementById("loginModal");
  const messageBox = document.getElementById("messageBox");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
const users = [
    { email: "durgeshpawar883@gmail.com", password: "dgp4912" },
    { email: "abhijadhav555@gmail.com", password: "abhi1526" },
    { email: "neetamore779@gmail.com", password: "neeta5716" }
  ];
 const isLoggedIn =
  localStorage.getItem("loggedIn") === "true" ||
  sessionStorage.getItem("loggedIn") === "true";
const userEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
const role = localStorage.getItem("role") || sessionStorage.getItem("role");

const cameFromDashboard = sessionStorage.getItem("visitedFromDashboard") === "true";

const loggedOut = sessionStorage.getItem("loggedOut") === "true";

if (isLoggedIn && !cameFromDashboard && !loggedOut) {
 
  sessionStorage.removeItem("visitedFromDashboard");
  if (role === "admin") {
    window.location.href = "pages/home.html";
  } else if (userEmail === "abhijadhav555@gmail.com") {
    window.location.href = "pages/student.html";
  } else if (userEmail === "neetamore779@gmail.com") {
    window.location.href = "pages/student02.html";
  }
}
sessionStorage.removeItem("loggedOut");

 function openLogin() {
    loginModal.style.display = "flex";
    messageBox.textContent = "";
  }

function closeLogin() {
    loginModal.style.display = "none";
    messageBox.textContent = "";
  }
togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isPassword ? "text" : "password");

    // Toggle the icon class
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
  });

 function showSpinnerThenLogin() {
  const loader = document.getElementById("fullscreenLoader");
  loader.classList.add("active");

  setTimeout(() => {
    loader.classList.remove("active");
    openLogin(); 
  }, 500); 
}

 loginBtn.onclick = showSpinnerThenLogin;
fixedLoginBtn.onclick = showSpinnerThenLogin;

  
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const remember = document.getElementById("rememberMe").checked;

    const user = users.find(
      user => user.email === email && user.password === password
    );

    if (user) {
  const isAdmin = email === "durgeshpawar883@gmail.com";
  const isStudent1 = email === "abhijadhav555@gmail.com";
  const isStudent2 = email === "neetamore779@gmail.com";

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("loggedIn", "true");
  storage.setItem("userEmail", email);
  storage.setItem("role", isAdmin ? "admin" : "student");

  messageBox.style.color = "green";
  messageBox.textContent = "Login successful! Redirecting...";

  setTimeout(() => {
    if (isStudent1) {
      window.location.href = "pages/student.html";
    } else if (isStudent2) {
      window.location.href = "pages/student02.html";
    } else {
      window.location.href = "pages/home.html";
    }
  }, 1000);

 } else {
      messageBox.style.color = "red";
      messageBox.textContent = "Invalid email or password.";
    }
  });

 document.getElementById("forgotPasswordLink").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".login-box").style.display = "none";
  document.getElementById("forgotPasswordBox").style.display = "block";
});

function closeForgotPassword() {
  document.getElementById("forgotPasswordBox").style.display = "none";
  document.querySelector(".login-box").style.display = "block";
}

document.getElementById("forgotPasswordForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const emailInput = document.getElementById("forgotEmail");
  const email = emailInput.value;
  const messageBox = document.getElementById("forgotMessageBox");

  if (email.trim() === "") {
    messageBox.innerText = "Please enter an email.";
    messageBox.style.color = ""; 
  } else if (email === "durgeshpawar883@gmail.com" ||
    email === "abhijadhav555@gmail.com" || email === "neetamore779@gmail.com") {
    messageBox.innerText = "Password reset successful. Please check your email.";
    messageBox.style.color = "green";
    emailInput.value = "";

    
    setTimeout(() => {
      messageBox.innerText = "";
    }, 3000);
  } else {
    messageBox.innerText = "Email not registered";
    messageBox.style.color = "red";
    emailInput.value = ""; 
    
    setTimeout(() => {
      messageBox.innerText = "";
    }, 3000);
  }
});
window.addEventListener("pageshow", function (event) {
  const isHistoryNav = event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward";
  if (isHistoryNav) {
    window.location.reload(); 
  }
});

(function () {
  const loginBox = document.querySelector('.login-box');
  if (!loginBox) return;

  const inputs = loginBox.querySelectorAll('input');

  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (window.innerWidth <= 768) {
        loginBox.style.transform = 'translateY(-20%)';
      }
    });

    input.addEventListener('blur', () => {
      if (window.innerWidth <= 768) {
        loginBox.style.transform = 'translateY(0)';
      }
    });
  });
})();
function toggleDropdown(selectEl) {
  
  const allSelects = document.querySelectorAll('.custom-select');
  allSelects.forEach(el => {
    if (el !== selectEl) el.classList.remove('active');
  });

  selectEl.classList.toggle('active');
}

function selectItem(li, event) {
  event.stopPropagation(); 

  const customSelect = li.closest('.custom-select');
  const selected = customSelect.querySelector('.selected');
  const hiddenInput = customSelect.querySelector('input[type="hidden"]');
  const defaultText = selected.getAttribute('data-default');

  selected.textContent = li.textContent;
  hiddenInput.value = li.textContent;
  customSelect.classList.remove('active');

  selected.classList.remove('input-error');
  hiddenInput.classList.remove('input-error');

 if (li.textContent !== defaultText) {
    customSelect.classList.add('has-value');
  } else {
    customSelect.classList.remove('has-value');
  }
}

function resetCustomSelects() {
  document.querySelectorAll('.custom-select').forEach(select => {
    const selected = select.querySelector('.selected');
    const hiddenInput = select.querySelector('input[type="hidden"]');
    const defaultText = selected.getAttribute('data-default');

    selected.textContent = defaultText;
    hiddenInput.value = '';
    select.classList.remove('has-value');
  });
}

document.addEventListener('click', function (e) {
  document.querySelectorAll('.custom-select').forEach(drop => {
    if (!drop.contains(e.target)) {
      drop.classList.remove('active');
    }
  });
});

