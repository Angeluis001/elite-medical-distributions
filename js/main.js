(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Contact form — mailto fallback (replace with Formspree/Web3Forms for production)
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(form);
    const firstName = (data.get("firstName") || "").toString().trim();
    const lastName = (data.get("lastName") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const inquiry = (data.get("inquiry") || "").toString().trim();
    const address = (data.get("address") || "").toString().trim();
    const state = (data.get("state") || "").toString().trim();
    const postcode = (data.get("postcode") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    if (!email || !message) {
      showStatus("Please fill in the required fields (email and message).", "error");
      return;
    }

    // If FORMSPREE_ENDPOINT is set on the form action (https://formspree.io/f/...), use fetch
    const action = form.getAttribute("action") || "";
    if (action.includes("formspree.io") || action.includes("web3forms.com") || action.includes("getform.io")) {
      fetch(action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            showStatus("Thank you for your message. It has been sent.", "success");
          } else {
            showStatus("There was an error trying to send your message. Please try again later.", "error");
          }
        })
        .catch(function () {
          showStatus("There was an error trying to send your message. Please try again later.", "error");
        });
      return;
    }

    // Fallback: open email client
    const subject = encodeURIComponent("Website inquiry — " + (inquiry || "General"));
    const body = encodeURIComponent(
      [
        "Name: " + firstName + " " + lastName,
        "Email: " + email,
        "Inquiry: " + inquiry,
        "Address: " + address,
        "State: " + state,
        "Postcode: " + postcode,
        "",
        message,
      ].join("\n")
    );
    window.location.href =
      "mailto:info@elitemedicaldistributions.com.au?subject=" + subject + "&body=" + body;
    showStatus("Opening your email app to send the message…", "success");
  });

  function showStatus(text, type) {
    if (!status) return;
    status.textContent = text;
    status.className = "form-status " + type;
  }
})();
