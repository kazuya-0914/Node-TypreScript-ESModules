window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.user').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      console.log(e.target.innerHTML)
    });
  })
})