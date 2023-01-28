import {FormArray, FormControl, FormGroup} from "@angular/forms";

export type OptionSetFG = FormGroup<{
  name: FormControl<string|null>,
  enabled: FormControl<boolean|null>,
  isAbstract: FormControl<boolean|null>,
  options: FormArray<OptionFG>
}>;

export type OptionFG = FormGroup<{
  name: FormControl<string|null>,
  enabled: FormControl<boolean|null>
}>
