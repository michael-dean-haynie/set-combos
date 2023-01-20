// "Domain Set" - to distinguish from "Set"
export class DSet {
    constructor(
        public readonly name: string,
        private readonly values: string[],
        public context: CPContext | undefined = undefined,
        public isAbstract = false,
        public extendsValuesOf: DSet | undefined = undefined
    ) {}

    getValues(): string[] {
        const values = this.extendsValuesOf?.values || []
        values.push(...this.values);
        return values;
    }
}

// Cartesian Product context
// Criteria to determine which sets to make combinations between
export interface CPContext {
    setName: string,
    value: string
}


