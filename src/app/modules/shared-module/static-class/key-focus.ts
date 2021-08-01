export class KeyFocus{

    public static keyDrownToFocus(event:any) {

        if(event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'ArrowUp'){

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
            const item = findParentBySelector(event.target, '.key-focus')
            const parent = findParentBySelector(item, '.line-key')
      
            const parentAllItem =parent.querySelectorAll('.key-focus')
             const indexLevelOne = Array.from(parentAllItem).indexOf(item)
            //const indexLevelOne = Array.from(parent.children).indexOf(item)
            //const lengthLevelOne = parent.children.length;
            const lengthLevelOne = parentAllItem.length;
            const incrementLevelOne = ((indexLevelOne + 1) <= (lengthLevelOne - 1)) ? (indexLevelOne + 1) : indexLevelOne
            const decrementLevelOne = ((indexLevelOne - 1) >= (0)) ? (indexLevelOne - 1) : 0
    
            let parentCero = findParentBySelector(event.target, '.conteiner-key')
            const itemCero = findParentBySelector(event.target, '.line-key')
            const parentCeroAllItem =parentCero.querySelectorAll('.line-key')
            let indexLevelcero = Array.from(parentCeroAllItem).indexOf(itemCero)
            //debugger;
            //let indexLevelcero = Array.from(parentCero.children).indexOf(itemCero)
          

            //const lengthLevelCero = parentCero.children.length;
            const lengthLevelCero = parentCeroAllItem.length;
    
            const incrementLevelCero = ((indexLevelcero + 1) <= (lengthLevelCero - 1)) ? (indexLevelcero + 1) : indexLevelcero
            const decrementLevelCero = ((indexLevelcero - 1) >= (0)) ? (indexLevelcero - 1) : 0
    
            switch (event.key) {
              case 'ArrowRight':
                parentAllItem[incrementLevelOne].querySelector('.input-key').focus();
                break;
              case 'ArrowLeft':
                parentAllItem[decrementLevelOne].querySelector('.input-key').focus();
                break;
              case 'ArrowDown':
       
               // console.log(parentCero.children[incrementLevelCero].querySelectorAll('.input-key')[indexLevelOne])
                parentCeroAllItem[incrementLevelCero].querySelectorAll('.input-key')[indexLevelOne].focus()
                //parentCero.children[incrementLevelCero].querySelectorAll('.input-key')[indexLevelOne].focus()
                break;
              case 'ArrowUp':
        
                //console.log( parentCero.children[decrementLevelCero].querySelectorAll('.input-key')[indexLevelOne])
                parentCeroAllItem[decrementLevelCero].querySelectorAll('.input-key')[indexLevelOne].focus()
                break;
              default:
                break;
            }
        }
       
      }
    
}