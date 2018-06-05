import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges {
  @Input()
  markdownContent: string;

  @ViewChild('contentArea')
  htmlAreaElement: ElementRef;

  htmlContent: string;

  constructor() {
    this.htmlContent = '';
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if ('markdownContent' in changes) {
      this.htmlAreaElement.nativeElement.innerHTML = this.convertToHTML();
    }
  }

  convertToHTML() {
    this.htmlContent = this.replaceTitles(this.markdownContent) || '';
    return this.htmlContent;
  }

  replaceTitles(md: string) {
    let converted = '';
    converted = this.replaceTitleH3(md);
    converted = this.replaceTitleH2(converted);
    converted = this.replaceTitleH1(converted);

    return converted;
  }

  replaceTitleH1(md: string) {
    const titleRegExp = /#([\w*\-+?!çáéíóúñõãÇÁÉÍÓÚÑÕÃ ]*)/;
    const regex = new RegExp(titleRegExp, 'g');
    return md.replace(regex, '<h1>$1</h1>');
  }

  replaceTitleH2(md: string) {
    const titleRegExp = /##([\w*\-+?!çáéíóúñõãÇÁÉÍÓÚÑÕÃ ]*)/;
    const regex = new RegExp(titleRegExp, 'g');

    return md.replace(regex, '<h2>$1</h2>');
  }

  replaceTitleH3(md: string) {
    const titleRegExp = /###([\w*\-+?!çáéíóúñõãÇÁÉÍÓÚÑÕÃ ]*)/;
    const regex = new RegExp(titleRegExp, 'g');

    return md.replace(regex, '<h3>$1</h3>');
  }
}
