export interface DataModel {
  optionSets: OptionSet[]
}

export interface OptionSet {
  id: string,
  name: string,
  enabled: boolean,
  isAbstract: boolean,
  extensionOf: string,
  scopeLimiter: string,
  options: Option[]
}

export interface Option {
  id: string,
  name: string,
  enabled: boolean
}
