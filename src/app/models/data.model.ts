export interface DataModel {
  optionSets: OptionSet[]
}

export interface OptionSet {
  name: string,
  enabled: boolean,
  options: Option[]
}

export interface Option {
  name: string,
  enabled: boolean
}
