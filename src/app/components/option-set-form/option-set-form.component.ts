import {Component, Input} from '@angular/core';
import {OptionFG, OptionSetFG} from "../../types/option-sets-form-types";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {OptionFormComponent} from "../option-form/option-form.component";

@Component({
  selector: 'app-option-set-form',
  templateUrl: './option-set-form.component.html',
  styleUrls: ['./option-set-form.component.scss']
})
export class OptionSetFormComponent {
  @Input() optionSet: OptionSetFG = OptionSetFormComponent.createOptionSetFormGroup();

  get options(): FormArray<OptionFG> {
    return this.optionSet.controls.options as FormArray<OptionFG>;
  }

  addOption(): void {
    this.optionSet.controls.options.push(
      OptionFormComponent.createOptionFormGroup()
    );
  }

  static createOptionSetFormGroup(): OptionSetFG {
    return new FormGroup({
      name: new FormControl('set name'),
      options: new FormArray([
        OptionFormComponent.createOptionFormGroup()
      ])
    })
  }

}
