/* Bootstrap's bundle includes Popper for dropdowns, tooltips, and popovers. */
if (window.bootstrap) {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((element) => {
    new bootstrap.Tooltip(element);
  });
  document.querySelectorAll('[data-bs-toggle="popover"]').forEach((element) => {
    new bootstrap.Popover(element);
  });
  new bootstrap.ScrollSpy(document.body, {
    target: "#sectionNav",
    rootMargin: "-15% 0px -65%",
  });
  const toast = bootstrap.Toast.getOrCreateInstance(
    document.getElementById("demoToast"),
  );
  document
    .getElementById("showToast")
    .addEventListener("click", () => toast.show());
  // Close the mobile navigation after selecting a section.
  document.querySelectorAll('#mainNav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      bootstrap.Collapse.getInstance(
        document.getElementById("mainNav"),
      )?.hide();
    });
  });
}

const form = document.getElementById("exampleForm");
const formResult = document.getElementById("formResult");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.classList.add("was-validated");
  const valid = form.checkValidity();
  formResult.classList.toggle("d-none", !valid);
  form.querySelectorAll("[required]").forEach((input) => {
    input.setAttribute("aria-invalid", String(!input.validity.valid));
  });
  if (!valid) form.querySelector(":invalid")?.focus();
});
form.addEventListener("input", (event) => {
  formResult.classList.add("d-none");
  if (event.target.hasAttribute("aria-invalid")) {
    event.target.setAttribute(
      "aria-invalid",
      String(!event.target.validity.valid),
    );
  }
});
form.addEventListener("reset", () => {
  form.classList.remove("was-validated");
  formResult.classList.add("d-none");
  form
    .querySelectorAll("[aria-invalid]")
    .forEach((input) => input.removeAttribute("aria-invalid"));
  document.getElementById("rangeValue").value = "50";
});
document.getElementById("confidence").addEventListener("input", (event) => {
  document.getElementById("rangeValue").value = event.target.value;
});

// The pagination example changes local content without a server request.
const pageDescriptions = [
  "Start with the basics.",
  "Add your own content.",
  "Make it your own.",
];
document.getElementById("demoPagination").addEventListener("click", (event) => {
  const button = event.target.closest("[data-page]");
  if (!button) return;
  document.querySelectorAll("#demoPagination .page-link").forEach((link) => {
    link.parentElement.classList.toggle("active", link === button);
    if (link === button) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  const page = Number(button.dataset.page);
  document.getElementById("pageStatus").textContent =
    `Page ${page} — ${pageDescriptions[page - 1]}`;
});
