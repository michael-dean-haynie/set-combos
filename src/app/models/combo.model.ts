export interface Combo {
  [index: string]: ComboItem;
}

export interface ComboItem {
    setName: string;
    optName: string;
    optId: string;
}
