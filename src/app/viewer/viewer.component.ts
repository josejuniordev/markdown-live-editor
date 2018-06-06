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
    this.htmlContent = this.replaceParagraphs(this.markdownContent) || '';
    this.htmlContent = this.replaceLinks(this.htmlContent) || '';
    this.htmlContent = this.replaceTitles(this.htmlContent) || '';
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
    const titleRegExp = /#(.*)/;
    const regex = new RegExp(titleRegExp, 'g');
    return md.replace(regex, '<h1>$1</h1>');
  }

  replaceTitleH2(md: string) {
    const titleRegExp = /##(.*)/;
    const regex = new RegExp(titleRegExp, 'g');
    return md.replace(regex, '<h2>$1</h2>');
  }

  replaceTitleH3(md: string) {
    const titleRegExp = /###(.*)/;
    const regex = new RegExp(titleRegExp, 'g');
    return md.replace(regex, '<h3>$1</h3>');
  }

  replaceParagraphs(md: string) {
    const paragraphRegExp = /^([^#].*)/;
    const regex = new RegExp(paragraphRegExp, 'gm');
    return md.replace(regex, '<p>$1</p>');
  }

  replaceLinks(md: string) {
    const paragraphRegExp = /\[(.*)\]\(((http|https):\/\/.*)\)/;
    const regex = new RegExp(paragraphRegExp, 'gm');
    return md.replace(regex, '<a href="$2">$1</a>');
  }
}
