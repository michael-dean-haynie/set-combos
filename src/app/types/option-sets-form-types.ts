import {FormArray, FormControl, FormGroup} from "@angular/forms";

export type OptionSetsFG = FormGroup<{
  optionSets: FormArray<OptionSetFG>
}>;

export type OptionSetFG = FormGroup<{
  id: FormControl<string|null>,
  name: FormControl<string>,
  enabled: FormControl<boolean|null>,
  isAbstract: FormControl<boolean|null>,
  extensionOf: FormControl<string|null>,
  scopeLimiter: FormControl<string|null>,
  options: FormArray<OptionFG>
}>;

export type OptionFG = FormGroup<{
  id: FormControl<string>
  name: FormControl<string>,
  enabled: FormControl<boolean|null>
}>

// Dropdown Option
export interface DDOption {
  displayValue: string;
  formValue: string|null;
}

export interface DDOptionGroup {
  displayValue: string;
  ddOptions: DDOption[];
}
