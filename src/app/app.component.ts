import {Component, OnInit} from '@angular/core';
import {EditorService} from './editor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  markdownContent = '';

  constructor(private editorService: EditorService) {
  }

  ngOnInit() {
    this.editorService.textareaChanged.subscribe((data) => {
      this.markdownContent = data.toString();
    });
  }
}
