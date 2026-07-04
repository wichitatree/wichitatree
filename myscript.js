(() => {
  'use strict';

  const RECIPIENT_EMAIL = 'robert@wichita-treeservice.com';
  const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;
  const PHONE_NUMBER = '316-616-8321';

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
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
      _subject: 'New Wichita Tree Service Website Lead',
      _template: 'table',
      _captcha: 'false',
      source: 'Wichita Tree Service website',
      page: window.location.href,
      name: String(formData.get('name') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      address: String(formData.get('address') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      submitted_at: new Date().toLocaleString(),
    };
  }

  function validatePayload(payload) {
    if (!payload.name) return 'Please add your name first.';
    if (!payload.phone) return 'Please add the best phone number to reach you.';
    return '';
  }

  async function sendLead(form, submitButton) {
    const payload = getFormPayload(form);
    const validationError = validatePayload(payload);

    if (validationError) {
      setStatus(form, validationError, 'error');
      return;
    }

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.dataset.originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
      }

      setStatus(form, 'Sending request...', 'info');

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let result = null;
      try {
        result = await response.json();
      } catch (error) {
        result = null;
      }

      if (!response.ok) {
        const detail = result && result.message ? ` ${result.message}` : '';
        throw new Error(`Form service returned ${response.status}.${detail}`);
      }

      form.reset();
      setStatus(
        form,
        `Request sent. Wichita Tree Service will follow up soon. First-time FormSubmit setup may require confirming ${RECIPIENT_EMAIL}.`,
        'success'
      );
    } catch (error) {
      console.error('Contact form could not send:', error);
      setStatus(
        form,
        `The form could not send yet. Please call ${PHONE_NUMBER}, or confirm the FormSubmit activation email for ${RECIPIENT_EMAIL}.`,
        'error'
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.originalText || 'Send Request';
      }
    }
  }

  onReady(() => {
    const menuButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('#nav-links');
    const year = document.querySelector('#year');
    const contactForms = document.querySelectorAll('[data-contact-form]');

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

    contactForms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        sendLead(form, form.querySelector('button[type="submit"]'));
      });
    });
  });
})();
