const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');
const year = document.querySelector('#year');
const estimateForm = document.querySelector('#estimate-form');

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

if (estimateForm) {
  estimateForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(estimateForm);
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const address = formData.get('address') || '';
    const message = formData.get('message') || '';

    const subject = encodeURIComponent(`Tree Service Estimate Request - ${address || name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nJob Details:\n${message}\n\nPlease contact me about an estimate.`
    );

    window.location.href = `mailto:wichitatreeservice@gmail.com?subject=${subject}&body=${body}`;
  });
}
