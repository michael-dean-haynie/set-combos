import { Permutation } from './permutation';
import {ComposeFunc} from "./composer-func";

export interface Dimension {
    name: string,
    permutate(): Permutation[]
}

export class SimpleDimension implements Dimension {
    constructor(
        public readonly name: string,
        private readonly values: string[] = []
    ) {}

    permutate(): Permutation[] {
        return this.values.map(value => ({ [this.name]: value }) );
    }
}

export class CompositeDimension implements Dimension {
    constructor(
        public readonly name: string,
        private readonly componentA: Dimension,
        private readonly componentB: Dimension,
        private readonly composer: ComposeFunc
        ) {}

    permutate(): Permutation[] {
        const permutations: Permutation[] = [];
        for (const permA of this.componentA.permutate()) {
            for (const permB of this.componentB.permutate()) {
                permutations.push(this.composer(
                    permA,
                    permB,
                    this.componentA,
                    this.componentB,
                    this.name
                ));
            }
        }
        return permutations;
    }

}