import { AfterContentInit } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[keyfocus]'
})

export class KeyfocusDirective implements AfterContentInit {
  constructor(private el: ElementRef) {
    this.suscribeKeyDrownToFocus()
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.el.nativeElement.querySelector('.input-key').focus();
    }, 500);
    this.suscribeKeyDrownToFocus()
  }

  suscribeKeyDrownToFocus() {
    let elements = this.el.nativeElement.querySelectorAll('.input-key');
    elements.forEach((element, index) => {
      element.addEventListener('keydown', (e) => {

        function collectionHas(a, b) {
          for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] == b) return true;
          }
          return false;
        }

        function findParentBySelector(elm, selector) {
          var all = document.querySelectorAll(selector);
          var cur = elm.parentNode;
          while (cur && !collectionHas(all, cur)) {
            cur = cur.parentNode;
          }
          return cur;
        }

        const item = findParentBySelector(e.target, '.key-focus')
        const parent = findParentBySelector(item, '.line-key')
        const indexLevelOne = Array.from(parent.children).indexOf(item)
        const lengthLevelOne = parent.children.length;
        const incrementLevelOne = ((indexLevelOne + 1) <= (lengthLevelOne - 1)) ? (indexLevelOne + 1) : indexLevelOne
        const decrementLevelOne = ((indexLevelOne - 1) >= (0)) ? (indexLevelOne - 1) : 0

        const parentCero = findParentBySelector(e.target, '.conteiner-key')
        const itemCero = findParentBySelector(e.target, '.line-key')
        const indexLevelcero = Array.from(parentCero.children).indexOf(itemCero)
        const lengthLevelCero = parentCero.children.length;

        const incrementLevelCero = ((indexLevelcero + 1) <= (lengthLevelCero - 1)) ? (indexLevelcero + 1) : indexLevelcero
        const decrementLevelCero = ((indexLevelcero - 1) >= (0)) ? (indexLevelcero - 1) : 0

        switch (e.code) {
          case 'ArrowRight':
            parent.children[incrementLevelOne].querySelector('.input-key').focus();
            break;
          case 'ArrowLeft':
            parent.children[decrementLevelOne].querySelector('.input-key').focus();
            break;
          case 'ArrowDown':
            console.log(parentCero.children[incrementLevelCero].querySelectorAll('.input-key')[indexLevelOne])
            parentCero.children[incrementLevelCero].querySelectorAll('.input-key')[indexLevelOne].focus()
            break;
          case 'ArrowUp':
            console.log( parentCero.children[decrementLevelCero].querySelectorAll('.input-key')[indexLevelOne])
            parentCero.children[decrementLevelCero].querySelectorAll('.input-key')[indexLevelOne].focus()
            break;
          default:
            break;
        }
      });
    });

  }
}
