import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OptionFG, OptionSetFG, OptionSetsFG} from "../../types/option-sets-form-types";
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

  get extendableSets(): string[] {
    const parent = this.optionSet.parent as FormArray<OptionSetFG>;
    const results: string[] = ['None'];
    for (const osfg of parent.controls) {
      const val = osfg?.controls?.name?.value;
      // shouldn't be able to extend itself
      const sameSet = val === this.optionSet.controls.name.value;
      // shouldn't be able to create circular extensions
      const recFunc = (osfg: OptionSetFG) => {
        // TODO: need to create a form control for this to check.
      };
      // const extensionIsCircular =
      if (val && !sameSet) {
        results.push(val);
      }
    }
    return results;
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
