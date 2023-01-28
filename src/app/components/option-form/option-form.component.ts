import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OptionFG} from "../../types/option-sets-form-types";
import {FormControl, FormGroup} from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrls: ['./option-form.component.scss']
})
export class OptionFormComponent {
  @Input() option: OptionFG = OptionFormComponent.createOptionFormGroup();
  @Output() remove = new EventEmitter<void>();

  removeOption(): void {
    this.remove.emit();
  }

  static createOptionFormGroup(): OptionFG {
    return new FormGroup({
      id: new FormControl(uuidv4(), { nonNullable: true }),
      name: new FormControl('option name ' + Math.random().toString().substr(2, 5), { nonNullable: true }),
      enabled: new FormControl(true)
    })
  }
}
