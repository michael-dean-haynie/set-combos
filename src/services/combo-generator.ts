import {DSet} from "../models/d-set";
import {Combo} from "../models/combo";

export class ComboGenerator {
    private readonly sets: Map<string, DSet> = new Map();

    registerSet(set: DSet): void {
        this.sets.set(set.name, set);
    }

    generateCombos(): Combo[] {
        const combos: Combo[] = [{}];
        const setNamesInOrder = this.getSetNamesInOrder();
        for (const setName of setNamesInOrder) {
            const set = this.sets.get(setName);
            if (!set) { throw 'yo this set name didn\'nt find anything'; }

            // start from end so new insertions don't move other combos indexes
            for (let combosIndex = combos.length -1; combosIndex >= 0; combosIndex--) {
                const combo = combos[combosIndex];

                // check if combo matches set context
                if (set?.context) {
                    if (!Object.keys(combo).includes(set.context.setName)){
                        continue; // skip if context requires set that isn't there
                    }
                    if (combo[set.context.setName] !== set.context.value) {
                        continue; // skip if context requires different value for set
                    }
                }

                // apply cartesian product to replace existing combo with new ones
                const newCombos = [];
                for (const newValue of set.getValues()) {
                    newCombos.push({ ...combo, ...{ [set.name]: newValue } });
                }
                combos.splice(combosIndex, 1, ...newCombos);
            }
        }

        return combos;
    }

    private getSetNamesInOrder() {
        const concreteSets = [...this.sets.values()]
            .filter(set => !set.isAbstract);

        const setNamesInOrder: string[] = [];
        while (setNamesInOrder.length < concreteSets.length) {
            for (const set of concreteSets) {
                // Skip sets that have already found their place in order
                if (setNamesInOrder.includes(set.name)) {
                    continue;
                }

                // Add sets whose context sets have already been added
                if (set.context && setNamesInOrder.includes(set.context.setName)) {
                   setNamesInOrder.push(set.name);
                }

                // Add sets that are in the top level context
                if (!set.context) {
                    setNamesInOrder.push(set.name);
                }
            }
        }

        return setNamesInOrder;
    }
}
