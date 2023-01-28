import { Injectable } from '@angular/core';
import {DataModel, Option, OptionSet} from "../models/data.model";
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
        for (const option of this.getExtendedSetOptions(optionSet, dataModel.optionSets)) {
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

  private getExtendedSetOptions(set: OptionSet, allSets: OptionSet[]): Option[]{
    if (!set.enabled) {
      return [];
    }
    if(!set.extensionOf){
      return set.options;
    }
    const parent = allSets.find(st => st.id === set.extensionOf);
    if (!parent) {
      throw 'aye man something innt rite';
    }
    const inheritedOptions = this.getExtendedSetOptions(parent, allSets);

    // combine, remove duplicate, return
    return [ ...(new Set([ ...inheritedOptions, ...set.options ])) ];
  }

}
