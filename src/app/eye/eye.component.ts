import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-eye',
  templateUrl: './eye.component.html',
  styleUrls: ['./eye.component.css'],
})
export class EyeComponent implements OnInit, AfterViewInit {
  @ViewChildren('ellipse') ellipses: QueryList<ElementRef>;
  @ViewChild('eye_iris') iris: ElementRef;
  @ViewChild('eye_closeLid') closeLidLayer: ElementRef;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.eyeUpdate(e);
  }

  private rect: any;
  private xo: number;
  private yo: number;
  private xmax: number;
  private ymax: number;

  constructor() {}

  ngOnInit(): void {}

  eyeClick(): void {
    this.closeLidLayer.nativeElement.style.opacity =
      this.closeLidLayer.nativeElement.style.opacity === '1' ? '0' : '1';
  }

  eyeUpdate(evt: any): void {
    const xm = evt.clientX - this.xo; // the normalized x/y coords to work with
    const ym = evt.clientY - this.yo;

    const widestFocus = 400; // when x is so far away, the eye is maximal extended
    const scaledX = xm * (this.xmax / widestFocus);
    let xe = xm > 0 ? Math.min(this.xmax, scaledX) : Math.max(-this.xmax, scaledX);
    const scaledY = ym * (this.ymax / widestFocus);
    let ye = ym > 0 ? Math.min(this.ymax, scaledY) : Math.max(-this.ymax, scaledY);
    if (xe * xe + ye * ye > this.xmax * this.ymax) {
      xe *= 0.9;
      ye *= 0.9;
    }

    this.iris.nativeElement.style.transform = `translateX(${xe}px) translateY(${ye}px)`;
  }

  ngAfterViewInit(): void {
    this.closeLidLayer.nativeElement.style.opacity = 0;
    this.rect = this.ellipses.first.nativeElement.getBoundingClientRect();
    this.xo = this.rect.x + this.rect.width / 2; // x-origin
    this.yo = this.rect.y + this.rect.height / 2; // y-origin

    this.xmax = this.rect.width / 1.5;
    this.ymax = this.rect.height / 2;

    setInterval(() => {
      if (this.closeLidLayer.nativeElement.style.opacity === '1') return; // do not close and then open if already closed
      this.closeLidLayer.nativeElement.style.opacity = '1';
      setTimeout(
        () => (this.closeLidLayer.nativeElement.style.opacity = '0'),
        300
      );
    }, 7 * 1000);
  }
}
