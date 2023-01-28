import {Component, EventEmitter, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {OptionSetFG, OptionSetsFG} from "../../types/option-sets-form-types";
import {OptionSetFormComponent} from "../option-set-form/option-set-form.component";


@Component({
  selector: 'app-option-sets-form',
  templateUrl: './option-sets-form.component.html',
  styleUrls: ['./option-sets-form.component.scss']
})
export class OptionSetsFormComponent {
  formGroup: OptionSetsFG = new FormGroup({
    optionSets: new FormArray<OptionSetFG>([])
  });

  @Output() valueChanges = new EventEmitter();

  constructor() {
    this.formGroup.valueChanges.subscribe( value => {
      console.log(value);
      this.valueChanges.emit(value);
    });
  }

  addOptionSet(): void {
    this.optionSets.push(OptionSetFormComponent.createOptionSetFormGroup());
  }

  removeOptionSet(index: number): void {
    this.optionSets.removeAt(index);
  }

  get optionSets(): FormArray<OptionSetFG>{
    return this.formGroup.get('optionSets') as FormArray<OptionSetFG>;
  }
}

