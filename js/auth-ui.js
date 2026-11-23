const loginTab = document.querySelector("#login-tab");
const applyTab = document.querySelector("#apply-tab");
const loginPanel = document.querySelector("#login-panel");
const applyPanel = document.querySelector("#apply-panel");
const roleButtons = document.querySelectorAll("[data-role]");
const studentApplication = document.querySelector("#student-application");
const teacherApplication = document.querySelector("#teacher-application");
const formMessage = document.querySelector("#form-message");

function showPanel(selectedTab) {
  const isLogin = selectedTab === loginTab;

  loginTab.classList.toggle("is-active", isLogin);
  loginTab.setAttribute("aria-selected", String(isLogin));
  loginTab.tabIndex = isLogin ? 0 : -1;
  loginPanel.hidden = !isLogin;

  applyTab.classList.toggle("is-active", !isLogin);
  applyTab.setAttribute("aria-selected", String(!isLogin));
  applyTab.tabIndex = isLogin ? -1 : 0;
  applyPanel.hidden = isLogin;
  formMessage.textContent = "";
}

function showRole(role) {
  const isStudent = role === "siswa";

  studentApplication.hidden = !isStudent;
  teacherApplication.hidden = isStudent;
  roleButtons.forEach((button) => {
    const selected = button.dataset.role === role;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  formMessage.textContent = "";
}

loginTab.addEventListener("click", () => showPanel(loginTab));
applyTab.addEventListener("click", () => showPanel(applyTab));
roleButtons.forEach((button) => {
  button.addEventListener("click", () => showRole(button.dataset.role));
});

document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "Pratinjau saja: login belum tersambung dan tidak ada data yang dikirim.";
});

document.querySelectorAll("[data-application]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Pratinjau saja: pengajuan belum dikirim atau disimpan.";
  });
});

document.querySelector("[data-preview-action]").addEventListener("click", () => {
  formMessage.textContent = "Pratinjau saja: Google OAuth belum tersambung.";
});
