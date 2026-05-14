import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({ selector: '[kbReveal]' })
export class RevealDirective implements OnInit, OnDestroy {
  @Input('kbReveal') delay: number = 0;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const el = this.el.nativeElement as HTMLElement;
    if (this.delay) {
      el.style.transitionDelay = `${this.delay}ms`;
    }
    el.classList.add('kb-reveal');
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('kb-reveal-in');
          this.observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
