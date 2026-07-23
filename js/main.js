(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Wire B2B portal login links from config
  const portalUrl =
    (window.EMD_CONFIG && window.EMD_CONFIG.b2bPortalUrl) ||
    "https://portal.elitemedicaldistributions.com.au";
  document.querySelectorAll("[data-b2b-login]").forEach(function (el) {
    el.setAttribute("href", portalUrl);
  });

  function showStatus(statusEl, text, type) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.className = "form-status " + type;
  }

  function submitViaEndpointOrMailto(form, statusEl, subjectLabel, fields) {
    const action = form.getAttribute("action") || "";
    if (
      action.includes("formspree.io") ||
      action.includes("web3forms.com") ||
      action.includes("getform.io")
    ) {
      const data = new FormData(form);
      fetch(action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            showStatus(statusEl, "Thank you. Your submission has been sent.", "success");
          } else {
            showStatus(
              statusEl,
              "There was an error trying to send your message. Please try again later.",
              "error"
            );
          }
        })
        .catch(function () {
          showStatus(
            statusEl,
            "There was an error trying to send your message. Please try again later.",
            "error"
          );
        });
      return;
    }

    const subject = encodeURIComponent(subjectLabel);
    const body = encodeURIComponent(fields.join("\n"));
    window.location.href =
      "mailto:info@elitemedicaldistributions.com.au?subject=" + subject + "&body=" + body;
    showStatus(statusEl, "Opening your email app to send the message…", "success");
  }

  // Contact form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const status = document.getElementById("form-status");
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(contactForm);
      const email = (data.get("email") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();
      if (!email || !message) {
        showStatus(status, "Please fill in the required fields (email and message).", "error");
        return;
      }
      submitViaEndpointOrMailto(contactForm, status, "Website inquiry — " + ((data.get("inquiry") || "General").toString()), [
        "Name: " + (data.get("firstName") || "") + " " + (data.get("lastName") || ""),
        "Email: " + email,
        "Inquiry: " + (data.get("inquiry") || ""),
        "Address: " + (data.get("address") || ""),
        "State: " + (data.get("state") || ""),
        "Postcode: " + (data.get("postcode") || ""),
        "",
        message,
      ]);
    });
  }

  // Account application / register form
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    const status = document.getElementById("register-status");
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(registerForm);
      const email = (data.get("email") || "").toString().trim();
      const business = (data.get("businessName") || "").toString().trim();
      const contactName = (data.get("contactName") || "").toString().trim();
      if (!email || !business || !contactName) {
        showStatus(
          status,
          "Please complete the required fields (business name, contact name, and email).",
          "error"
        );
        return;
      }
      submitViaEndpointOrMailto(registerForm, status, "Account application — " + business, [
        "Business name: " + business,
        "ABN: " + (data.get("abn") || ""),
        "Contact name: " + contactName,
        "Email: " + email,
        "Phone: " + (data.get("phone") || ""),
        "Clinic / delivery address: " + (data.get("address") || ""),
        "Suburb / city: " + (data.get("suburb") || ""),
        "State: " + (data.get("state") || ""),
        "Postcode: " + (data.get("postcode") || ""),
        "Account type: " + (data.get("accountType") || ""),
        "",
        "Notes:",
        (data.get("notes") || "").toString(),
      ]);
    });
  }
})();
