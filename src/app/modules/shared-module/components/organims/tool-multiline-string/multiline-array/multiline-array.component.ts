import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Modal } from '../../modal/model/modal.model';
import { ModelAction } from '../../../molecules/tables/model/action';
import { stringToTreeObect } from '@sharedModule/code-utils/convertTextToTree';
import { TreeConvert } from '@sharedModule/code-utils/treeConvert';
import { AlertService } from '../../alertForm/service/alert.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { textConvertToTreeObject } from '@sharedModule/code-utils/textConvertToTreeObject';
@Component({
  selector: 'ui-multiline-array',
  templateUrl: './multiline-array.component.html',
  styleUrls: ['./multiline-array.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MultilineArrayComponent extends Modal implements OnInit {
  textInput:string
  textoEliminar:string
  textoCorte:string
  textoIzquierda:string='';
  textoDerecha:string='';
  textoReemplazar:string='';
  textoReemplazarPor:string='';
  textoSaltoLinea:string='';
  arrayText = [];
  objectTree:TreeConvert[];
  actions: ModelAction[] = [];
  constructor( private alertService: AlertService) { super() }

  ngOnInit(): void {
    this.actions.push(ActionButton.ACCEPT);
    this.actions.push(ActionButton.CANCEL);
  }

  controlAddChangeDerecha(){

      this.AddIzquierdaDerechaTextTotree(this.objectTree,'',this.textoDerecha);
      this.arrayText=[]
      this.arrayTotree(this.objectTree);

  }

  controlAddChangeIzquierda(){

      this.AddIzquierdaDerechaTextTotree(this.objectTree,this.textoIzquierda,'');
      this.arrayText=[]
      this.arrayTotree(this.objectTree);

  }

  controlCutChange(){
    if(this.textoCorte){
      this.cutTextTotree(this.objectTree,this.textoCorte);
      this.arrayText=[]
      this.arrayTotree(this.objectTree);
    }
  }

  controlDeleteChange(){
    if(this.textoEliminar){
      this.deleteTextTotree(this.objectTree ,this.textoEliminar)
      this.arrayText=[]
      this.arrayTotree(this.objectTree);
    }
  }

  controlReplaceAdd(){
    if(this.textoReemplazar !=null && this.textoReemplazarPor !=null){
      this.replaceTextTotree(this.objectTree,this.textoReemplazar,this.textoReemplazarPor)
      this.arrayText=[]
      this.arrayTotree(this.objectTree);
    }
  }

  controlChange() {
    let textComplit: string;
    textComplit = this.textInput;
    this.objectTree = stringToTreeObect(textComplit,this.textoSaltoLinea)
    console.log('resultado',textConvertToTreeObject(textComplit,this.textoSaltoLinea))
    this.arrayText=[]
    this.arrayTotree(this.objectTree);
  }

  controlClear(){
    this.textInput='';
    this.textoEliminar=''
    this.textoCorte=''
    this.textoIzquierda='';
    this.textoDerecha='';
    this.textoReemplazar='';
    this.textoReemplazarPor='';
    this.textoSaltoLinea='';
    this.controlChange();
  }

  controlLineUp(){

  }

 deleteTextTotree(tree:TreeConvert[], textoEliminar){
  tree.forEach((itemTres,index)=>{
     tree[index].value =  itemTres.value.split(textoEliminar).join("");
     if(itemTres.hasOwnProperty('children')){
      this.deleteTextTotree(itemTres['children'],textoEliminar)
     }
  })
 }

 replaceTextTotree(tree:TreeConvert[], textoReemplazar,textoReemplazarPor){
  tree.forEach((itemTres,index)=>{
     tree[index].value =  itemTres.value.split(textoReemplazar).join(textoReemplazarPor);
     if(itemTres.hasOwnProperty('children')){
      this.replaceTextTotree(itemTres['children'],textoReemplazar,textoReemplazarPor)
     }
  })
 }


 cutTextTotree(tree:TreeConvert[], textoCortar){
  tree.forEach((itemTres,index)=>{
     tree[index].value =  itemTres.value.split(textoCortar)[0];
     if(itemTres.hasOwnProperty('children')){
      this.cutTextTotree(itemTres['children'],textoCortar)
     }
  })
 }

 AddIzquierdaDerechaTextTotree(tree:TreeConvert[], textoIzquiera:string, textoDerecha:string){
   if (textoIzquiera !=null && textoDerecha!=null){
      tree.forEach((itemTres,index)=>{
        tree[index].value =  textoIzquiera+itemTres.value+textoDerecha;
        if(itemTres.hasOwnProperty('children')){
        this.AddIzquierdaDerechaTextTotree(itemTres['children'], textoIzquiera, textoDerecha)
        }
    })
   }

 }

 arrayTotree(tree:TreeConvert[]){
  tree.forEach((itemTres,index)=>{
      this.arrayText.push(itemTres['value']);
     if(itemTres.hasOwnProperty('children')){
      this.arrayTotree(itemTres['children'])
     }
  })
 }


  accionFormulario(event) {
    if (event == ActionGeneric.ACCEPT) {
      this.save(this.objectTree)
    }
    else {
      this.save([])
    }

  }

  modalInput(inputs): void {
  }

  save(data: any): void {
    this.modalClose(data);
  }

  copyActionClipBoard() {
    let textgen='';
    this.arrayText.forEach(text =>{
      textgen= textgen+text+'\n';
    })
      this.copyTextToClipBoard(textgen)
      this.alertService.openAlertInfo('Texto copiado al portapapeles!');
  }

  copyTextToClipBoard(val: any){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
