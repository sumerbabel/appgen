export class KeyFocus {
  public static keyDrownToFocus(event: any) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      console.log('evento')
      //debugger;
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

      const item = event.target;
      const parent = findParentBySelector(item, '.line-key')
      if (parent ==null){return} 
      const parentAllItem = parent?.querySelectorAll('.input-key')
      let indexLevelOne = Array.from(parentAllItem).indexOf(item)
      const lengthLevelOne = parentAllItem.length;
      const incrementLevelOne = ((indexLevelOne + 1) <= (lengthLevelOne - 1)) ? (indexLevelOne + 1) : indexLevelOne
      const decrementLevelOne = ((indexLevelOne - 1) >= (0)) ? (indexLevelOne - 1) : 0

      let parentCero = findParentBySelector(event.target, '.conteiner-key')
      const itemCero = findParentBySelector(event.target, '.line-key')
      const parentCeroAllItem = parentCero.querySelectorAll('.line-key')
      let indexLevelcero = Array.from(parentCeroAllItem).indexOf(itemCero)
      const lengthLevelCero = parentCeroAllItem.length;

      const incrementLevelCero = ((indexLevelcero + 1) <= (lengthLevelCero - 1)) ? (indexLevelcero + 1) : indexLevelcero
      const decrementLevelCero = ((indexLevelcero - 1) >= (0)) ? (indexLevelcero - 1) : 0

      switch (event.key) {
        case 'ArrowRight':
          parentAllItem[incrementLevelOne]?.focus();
          break;
        case 'ArrowLeft':
          parentAllItem[decrementLevelOne]?.focus();
          break;
        case 'ArrowDown':
        
          let countItemsDown = parentCeroAllItem[incrementLevelCero].querySelectorAll('.input-key').length;
          if ((countItemsDown - 1) < indexLevelOne) {
            indexLevelOne = countItemsDown - 1
          }
          parentCeroAllItem[incrementLevelCero].querySelectorAll('.input-key')[indexLevelOne]?.focus()
          break;
        case 'ArrowUp':
          let countItems = parentCeroAllItem[decrementLevelCero].querySelectorAll('.input-key').length;
          if ((countItems - 1) < indexLevelOne) {
            indexLevelOne = countItems - 1
          }
          parentCeroAllItem[decrementLevelCero].querySelectorAll('.input-key')[indexLevelOne]?.focus()
          break;
        default:
          break;
      }
    }

  }

}