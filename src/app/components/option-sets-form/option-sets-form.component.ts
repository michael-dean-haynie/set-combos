import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {OptionSetFG} from "../../types/option-sets-form-types";
import {OptionSetFormComponent} from "../option-set-form/option-set-form.component";


@Component({
  selector: 'app-option-sets-form',
  templateUrl: './option-sets-form.component.html',
  styleUrls: ['./option-sets-form.component.scss']
})
export class OptionSetsFormComponent {
  formGroup = new FormGroup<{
    optionSets: FormArray<OptionSetFG>
  }>({
    optionSets: new FormArray<OptionSetFG>([])
  })

  addOptionSet(): void {
    this.optionSets.push(OptionSetFormComponent.createOptionSetFormGroup());
  }

  get optionSets(): FormArray<OptionSetFG>{
    return this.formGroup.get('optionSets') as FormArray<OptionSetFG>;
  }
}

