import {Component, Input} from '@angular/core';
import {OptionFG} from "../../types/option-sets-form-types";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrls: ['./option-form.component.scss']
})
export class OptionFormComponent {
  @Input() option: OptionFG = OptionFormComponent.createOptionFormGroup();

  static createOptionFormGroup(): OptionFG {
    return new FormGroup({
      name: new FormControl('option name'),
      enabled: new FormControl(true)
    })
  }
}
