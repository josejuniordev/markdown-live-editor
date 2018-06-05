import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class EditorService {
  textareaChanged = new Subject();
  constructor() { }

}
