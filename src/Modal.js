export class Modal {
  constructor(overlay) {
  //  console.log(overlay);
    this.overlay = overlay;
    overlay.addEventListener('click', e => {

      if(e.srcElement.id === 'btn-guardar'){
        if(e.srcElement.parentElement.parentElement.checkValidity()) this.close();
      }
      else  if (e.srcElement.parentElement.parentElement.parentElement.id !== 'div-modal'
        && e.srcElement.parentElement.id !== 'div-modal' && e.srcElement.parentElement.className!=='modal') {
        this.close();
      }
    });
  }
  open() {
    this.overlay.classList.remove('is-hidden');
  }

  close() {
    this.overlay.classList.add('is-hidden');
  }
}