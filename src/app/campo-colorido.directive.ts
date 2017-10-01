import {Directive, HostListener, HostBinding} from '@angular/core';

@Directive({
  selector: '[appCampoColorido]'
})
export class CampoColoridoDirective {

  @HostBinding('style.backgroundColor') corDeFundo: string;

  @HostListener('focus') aoGanharFoco() {
    this.corDeFundo = 'yellow';
  }

  @HostListener('blur') aoPerderFocoFoco() {
    this.corDeFundo = 'transparent';
  }

}
