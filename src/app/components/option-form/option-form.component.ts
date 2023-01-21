import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OptionFG} from "../../types/option-sets-form-types";
import {FormControl, FormGroup} from "@angular/forms";

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
      name: new FormControl('option name'),
      enabled: new FormControl(true)
    })
  }
}
