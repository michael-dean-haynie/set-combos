import {FormArray, FormControl, FormGroup} from "@angular/forms";

export type OptionSetsFG = FormGroup<{
  optionSets: FormArray<OptionSetFG>
}>;

export type OptionSetFG = FormGroup<{
  id: FormControl<string|null>,
  name: FormControl<string|null>,
  enabled: FormControl<boolean|null>,
  isAbstract: FormControl<boolean|null>,
  extensionOf: FormControl<string|null>,
  options: FormArray<OptionFG>
}>;

export type OptionFG = FormGroup<{
  name: FormControl<string|null>,
  enabled: FormControl<boolean|null>
}>

export interface DDOption {
  displayValue: string;
  formValue: string|null;
}
