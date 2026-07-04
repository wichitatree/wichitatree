const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');
const year = document.querySelector('#year');
const contactForms = document.querySelectorAll('[data-contact-form]');

// Add your email service endpoint here when ready.
// Examples: Formspree, Basin, Netlify Forms, a GoHighLevel/Zapier webhook, or your own server endpoint.
// The form is built to stay on the page and send to robert@wichita-treeservice.com through that endpoint.
const CONTACT_ENDPOINT = '';
const RECIPIENT_EMAIL = 'robert@wichita-treeservice.com';

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

function setStatus(form, message, type = 'info') {
  const status = form.querySelector('[data-form-status]');
  if (!status) return;
  status.textContent = message;
  status.classList.remove('success', 'error', 'info');
  status.classList.add(type);
}

function getFormPayload(form) {
  const formData = new FormData(form);
  return {
    to: RECIPIENT_EMAIL,
    source: 'Wichita Tree Service website',
    name: String(formData.get('name') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    address: String(formData.get('address') || '').trim(),
    message: String(formData.get('message') || '').trim(),
    page: window.location.href,
    submittedAt: new Date().toISOString(),
  };
}

contactForms.forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const payload = getFormPayload(form);

    if (!payload.name || !payload.phone) {
      setStatus(form, 'Please add your name and phone number first.', 'error');
      return;
    }

    if (!CONTACT_ENDPOINT) {
      console.log('Contact form payload ready for email service:', payload);
      setStatus(
        form,
        `Form is ready. Add an email service endpoint in script.js and it will send to ${RECIPIENT_EMAIL} without leaving the page.`,
        'info'
      );
      return;
    }

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }
      setStatus(form, 'Sending request...', 'info');

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Form service returned ${response.status}`);
      }

      form.reset();
      setStatus(form, 'Request sent. Wichita Tree Service will follow up soon.', 'success');
    } catch (error) {
      console.error(error);
      setStatus(form, 'The form could not send yet. Please call 316-616-8321.', 'error');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = form.id === 'quick-contact-form' ? 'Send Request' : 'Send Estimate Request';
      }
    }
  });
});
