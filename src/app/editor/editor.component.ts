import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {EditorService} from '../editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  formEditor: FormGroup;

  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.formEditor = new FormGroup({
      'markdownContent': new FormControl(null, Validators.required)
    });

    this.formEditor.get('markdownContent').valueChanges.subscribe((data) => {
      this.editorService.textareaChanged.next(data);
    });
  }

  onSubmitForm() {
   console.log('form', this.formEditor);
  }
}
