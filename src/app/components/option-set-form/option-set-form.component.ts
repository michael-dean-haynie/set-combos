import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DDOption, OptionFG, OptionSetFG, OptionSetsFG} from "../../types/option-sets-form-types";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {OptionFormComponent} from "../option-form/option-form.component";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-option-set-form',
  templateUrl: './option-set-form.component.html',
  styleUrls: ['./option-set-form.component.scss']
})
export class OptionSetFormComponent implements OnInit {
  @Input() optionSet: OptionSetFG = OptionSetFormComponent.createOptionSetFormGroup();
  @Output() remove = new EventEmitter<void>()

  extendableSets: DDOption[] = [{ formValue: null, displayValue: 'None'}];

  get options(): FormArray<OptionFG> {
    return this.optionSet.controls.options as FormArray<OptionFG>;
  }

  ngOnInit(): void {
    const parent = this.optionSet.parent as FormArray<OptionSetFG>;
    parent.valueChanges.subscribe(() => {
      this.extendableSets = this.getLatestExtendableSets();
    });
  }

  private getLatestExtendableSets(): DDOption[] {
    console.log('inside getLatestExtendableSets');
    const parent = this.optionSet.parent as FormArray<OptionSetFG>;
    const results: DDOption[] = [{ formValue: null, displayValue: 'None'}];
    for (const osfg of parent.controls) {
      // shouldn't be able to extend itself
      const sameSet = osfg.controls.id.value === this.optionSet.controls.id.value;
      // shouldn't be able to create circular extensions
      const isCircular = (childOsfg: OptionSetFG): boolean => {
        console.log(`Set ${this.optionSet.controls.name.value} is extension of ${this.getSetById(this.optionSet.controls.extensionOf.value)?.controls.name.value || null}`);
        // console.log('inside isCircular');
        if (!childOsfg.controls.extensionOf.value) { return false; }
        // console.log('child extensionOf was not falsy ... continuing ...');
        if (childOsfg.controls.extensionOf.value === this.optionSet.controls.id.value) {
          return true;
        }
        // console.log('child extensionOf did not equal this.optionSet id ...  continuing ...');
        const extendedSet = parent.controls.find(parentOsfg => {
          return parentOsfg.controls.id.value === childOsfg.controls.extensionOf.value;
        });
        if (!extendedSet){ return false; }

        return isCircular(extendedSet);
      };
      // const isCircular = (childOsfg: OptionSetFG) => { return false; };
      const name = osfg?.controls?.name?.value;
      if (name && !sameSet && !isCircular(osfg)) {
        results.push({ formValue: osfg.controls.id.value, displayValue: name });
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
      id: new FormControl(uuidv4()),
      name: new FormControl('set name ' + Math.random().toString().substr(2, 5)),
      enabled: new FormControl(true),
      isAbstract: new FormControl(false),
      extensionOf: new FormControl(),
      options: new FormArray([
        OptionFormComponent.createOptionFormGroup()
      ])
    })
  }

  // TODO: REMOVE
  private getSetById(id: string|null): OptionSetFG|null {
    if (id === null) { return null; }
    const parent = this.optionSet.parent as FormArray<OptionSetFG>;
    const result = parent.controls.find(os => os.controls.id.value === id);
    if (!result) {
      console.log('getSetById could not find set with id: ' + id);
      return null;
    }
    return result;
  }
}
