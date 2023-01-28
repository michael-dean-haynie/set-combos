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
    for (const optionSetId of this.getSetIdsInOrder(dataModel.optionSets)) {
      const optionSet = dataModel.optionSets.find(os => os.id === optionSetId);
      if (!optionSet) { throw 'uhhhh ..... what?'};
      if (!optionSet.enabled) { continue; }
      if (optionSet.isAbstract) { continue; }
      for (let i = combos.length - 1; i >= 0; i--) {
        const exCombo = combos[i]; // existing combo
        const optIdsInExCombo: string[] = Object.keys(exCombo).map(key => exCombo[key].optId);
        if (optionSet.scopeLimiter && !optIdsInExCombo.includes(optionSet.scopeLimiter)) {
          continue;
        }
        const newCombos = [] as Combo[];
        for (const option of this.getExtendedSetOptions(optionSet, dataModel.optionSets)) {
          if (!option.enabled) { continue; }
          newCombos.push({
            ...exCombo,
            ...{ [optionSet.id]: {
              setName: optionSet.name,
              optName: option.name,
              optId: option.id
            }}
          });
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

  // arrange set ids in an order so that scope limiters will work
  private getSetIdsInOrder(sets: OptionSet[]): string[] {
    const orderedSetIds: string[] = [];
    let failSafe = sets.length * 2;
    while(orderedSetIds.length < sets.length) {
      failSafe--;
      if (failSafe < 0) {
        throw 'yo this never gonna end';
      }
      for (const set of sets) {
        // skip sets that have already found their place in order
        if (orderedSetIds.includes(set.id)) { continue; }

        // skip sets that have a scope limiter not yet in the order
        const optIdsInOrderedSets: string[] = orderedSetIds.map(setId => {
          const ordSet = sets.find(st => st.id === setId);
          return ordSet ? ordSet.options.map(opt => opt.id) : [];
        }).flat();
        if (set.scopeLimiter && !optIdsInOrderedSets.includes(set.scopeLimiter)) {
          continue;
        }

        orderedSetIds.push(set.id);
      }
    }
    return orderedSetIds;
  }

}
