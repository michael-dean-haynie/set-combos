import { Injectable } from '@angular/core';
import {DataModel} from "../models/data.model";
import {Combo} from "../models/combo.model";

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  constructor() { }

  listCombos(dataModel: DataModel): Combo[]{
    const combos = [] as Combo[];
    if (!dataModel || !dataModel.optionSets) { return combos; }

    combos.push({});
    for (const optionSet of dataModel.optionSets) {
      if (!optionSet.enabled) { continue; }
      if (optionSet.isAbstract) { continue; }
      for (let i = combos.length - 1; i >= 0; i--) {
        const exCombo = combos[i];
        const newCombos = [] as Combo[];
        for (const option of optionSet.options) {
          if (!option.enabled) { continue; }
          newCombos.push({ ...exCombo, ...{ [optionSet.name]: option.name }});
        }
        if(newCombos.length) {
          combos.splice(i, 1, ...newCombos);
        }
      }
    }
    return combos;
  }
}
