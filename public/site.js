// Progressive enhancements only. All content and links work without JavaScript.
const gallery = document.querySelector('.gallery');
if (gallery) {
  const slides = [...gallery.querySelectorAll('[data-slide]')];
  const controls = gallery.querySelector('.gallery-controls');
  const buttons = [...controls.querySelectorAll('button')];
  const select = index => {
    slides.forEach((slide,i) => { slide.hidden = i !== index; });
    buttons.forEach((button,i) => button.setAttribute('aria-pressed',String(i === index)));
  };
  gallery.classList.add('enhanced');
  controls.hidden = false;
  select(0);
  buttons.forEach((button,i) => button.addEventListener('click',()=>select(i)));
}
const worldControls = document.querySelector('.world-tabs');
if (worldControls) {
  const buttons = [...worldControls.querySelectorAll('button')];
  const panels = [...document.querySelectorAll('.world-panel')];
  const select = id => {
    panels.forEach(panel => { panel.hidden = panel.id !== 'world-'+id; });
    buttons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.world === id)));
  };
  document.querySelector('.world-panels').classList.add('enhanced');
  worldControls.hidden = false;
  buttons.forEach(button => button.addEventListener('click',()=>select(button.dataset.world)));
  select(buttons[0].dataset.world);
}
