export interface DataModel {
  optionSets: OptionSet[]
}

export interface OptionSet {
  id: string,
  name: string,
  enabled: boolean,
  isAbstract: boolean,
  extensionOf: string,
  options: Option[]
}

export interface Option {
  name: string,
  enabled: boolean
}
