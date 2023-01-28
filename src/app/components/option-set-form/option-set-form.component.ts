import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output() remove = new EventEmitter<void>()

  get options(): FormArray<OptionFG> {
    return this.optionSet.controls.options as FormArray<OptionFG>;
  }

  addOption(): void {
    this.optionSet.controls.options.push(
      OptionFormComponent.createOptionFormGroup()
    );
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
  }

  removeOptionSet(): void {
    this.remove.emit();
  }

  static createOptionSetFormGroup(): OptionSetFG {
    return new FormGroup({
      name: new FormControl('set name ' + Math.random().toString().substr(2, 5)),
      enabled: new FormControl(true),
      isAbstract: new FormControl(false),
      options: new FormArray([
        OptionFormComponent.createOptionFormGroup()
      ])
    })
  }

}
