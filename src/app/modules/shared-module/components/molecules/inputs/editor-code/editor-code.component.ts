import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'ui-editor-code',
  templateUrl: './editor-code.component.html',
  styleUrls: ['./editor-code.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EditorCodeComponent implements OnInit {
  @Input() value: string = '';
  @Input() language: string = 'typescript';
  @Input() theme: string = 'vs-dark';
  @Input() options: any;
  @Input() label: string;
  @Input() isRequired: boolean = false;
  @Input() errors: string[] = [];
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  codeModel: CodeModel = {
    language: 'typescript',
    uri: uuidv4() + '.json',
    value: '',
  };

  SIZE_BARE_LINE: number = 25;

  constructor() {}

  ngOnInit(): void {
    this.codeModel.value = this.value;
    let lines = 1;
    if (this.value) {
      lines = this.value.split(/\r?\n/).length;
    }

    this.numeroSaltosLinea = this.SIZE_BARE_LINE * lines;
    if (!this.options) {
      this.options = {
        contextmenu: false,
        scrollBeyondLastLine: false,
        lineNumbers: 'off',
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 5,
        lineNumbersMinChars: 0,
        snippetSuggestions: 'none',
        codeLens: false,
        automaticLayout: true,
        noSemanticValidation: true,
        noSyntaxValidation: true,

        minimap: {
          enabled: false,
        },
        scrollbar: {
          useShadows: false,
          verticalHasArrows: false,
          horizontalHasArrows: false,
          vertical: 'hidden',
          horizontal:'hidden',
          arrowSize: 30,
        },
      };
    }
  }

  numeroSaltosLinea: number;

  onCodeChanged($event: string) {
    this.value = $event;
    this.codeModel.value = this.value;
    this.valueChange.emit(this.value);
    this.numeroSaltosLinea =
    this.SIZE_BARE_LINE * this.value.split(/\r?\n/).length;
  }
}
