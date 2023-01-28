import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DDOption, DDOptionGroup, OptionFG, OptionSetFG, OptionSetsFG} from "../../types/option-sets-form-types";
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
  scopeLimiterGroups: DDOptionGroup[] = [];
  removable = true;

  get options(): FormArray<OptionFG> {
    return this.optionSet.controls.options as FormArray<OptionFG>;
  }

  ngOnInit(): void {
    const parent = this.optionSet.parent as FormArray<OptionSetFG>;
    parent.valueChanges.subscribe(() => {
      this.extendableSets = this.getLatestExtendableSets();
      this.scopeLimiterGroups = this.getLatestScopeLimiterGroups();
      this.removable = this.isRemovable();
    });
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
      name: new FormControl('set name ' + Math.random().toString().substr(2, 5), { nonNullable: true }),
      enabled: new FormControl(true),
      isAbstract: new FormControl(false),
      extensionOf: new FormControl(),
      scopeLimiter: new FormControl(),
      options: new FormArray([
        OptionFormComponent.createOptionFormGroup()
      ])
    })
  }

  private getLatestExtendableSets(): DDOption[] {
    const parent = this.optionSet.parent as FormArray<OptionSetFG>;
    const results: DDOption[] = [{ formValue: null, displayValue: 'None'}];
    for (const osfg of parent.controls) {
      // shouldn't be able to extend itself
      const sameSet = osfg.controls.id.value === this.optionSet.controls.id.value;
      // shouldn't be able to create circular extensions
      const isCircular = (childOsfg: OptionSetFG): boolean => {
        if (!childOsfg.controls.extensionOf.value) { return false; }
        if (childOsfg.controls.extensionOf.value === this.optionSet.controls.id.value) {
          return true;
        }
        const extendedSet = parent.controls.find(parentOsfg => {
          return parentOsfg.controls.id.value === childOsfg.controls.extensionOf.value;
        });
        if (!extendedSet){ return false; }

        return isCircular(extendedSet);
      };
      const name = osfg?.controls?.name?.value;
      if (name && !sameSet && !isCircular(osfg)) {
        results.push({ formValue: osfg.controls.id.value, displayValue: name });
      }
    }
    return results;
  }

  private getLatestScopeLimiterGroups(): DDOptionGroup[] {
    const result: DDOptionGroup[] = [];
    const parent = this.optionSet.parent as FormArray<OptionSetFG>;
    for (const osfg of parent.controls) {
      // skip if it's the same option set
      if (osfg.controls.id.value === this.optionSet.controls.id.value) {
        continue;
      }

      // shouldn't be able to create circular scope limits
      const isCircular = (childOsfg: OptionSetFG): boolean => {
        if (!childOsfg.controls.scopeLimiter.value) { return false; }
        const optIdsInSet = this.optionSet.controls.options.controls.map(opt => opt.controls.id.value);
        if (optIdsInSet.includes(childOsfg.controls.scopeLimiter.value)) {
          return true;
        }
        const limitingSet = parent.controls.find(parentOsfg => {
          const optIdsInParentSet = parentOsfg.controls.options.controls.map(opt => opt.controls.id.value);
          return optIdsInParentSet.includes(childOsfg.controls.scopeLimiter.value || '');
        });
        if (!limitingSet){ return false; }

        return isCircular(limitingSet);
      };

      if (isCircular(osfg)) {
        continue;
      }

      const ddOptions: DDOption[] = [];
      for (const setOpt of osfg.controls.options.controls) {
        ddOptions.push({
          displayValue: setOpt.controls.name.value,
          formValue: setOpt.controls.id.value
        });
      }
      if (ddOptions.length) {
        result.push({
          displayValue: osfg.controls.name.value,
          ddOptions
        });
      }
    }
    return result;
  }


  private isRemovable(): boolean {
    const parent = this.optionSet.parent as FormArray<OptionSetFG>;
    const optIds = this.optionSet.controls.options.controls.map(opt => opt.controls.id.value);

    for (const osfg of parent.controls) {
      // check if any other sets extend this one
      if (osfg.controls.extensionOf.value === this.optionSet.controls.id.value) {
        return false;
      }

      // check if any other sets are scope limited to an option in this set
      const sl = osfg.controls.scopeLimiter.value;
      if (sl && optIds.includes(sl)) {
        return false;
      }
    }
    return true;
  }
}
