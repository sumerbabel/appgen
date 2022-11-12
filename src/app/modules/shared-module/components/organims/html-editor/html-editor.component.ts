import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ui-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss']
})
export class HtmlEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('richText') richText!: ElementRef;

  //Text formatting function
    //Initializing variable
    oDoc:any;
  formatDoc(cmd:any) {
  this.oDoc = document.getElementById("textBox");
  document.execCommand(cmd); this.oDoc?.focus();
  }

  save(){
    // Open the console to see the output!
    //You can set this value on an input to send the data in angular forms
    console.log(this.richText?.nativeElement.innerHTML);
  }

}
