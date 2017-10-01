import {Directive, Renderer2, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appCampoColorido]'
})
export class CampoColoridoDirective {

  constructor(
    private elementRef: ElementRef,
    private render: Renderer2
  ) {}

  @HostListener('focus') aoGanharFoco() {
    this.render.setStyle(this.elementRef.nativeElement, 'background-color', 'yellow');
  }

  @HostListener('blur') aoPerderFocoFoco() {
    this.render.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  }

}
