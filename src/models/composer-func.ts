import {Permutation} from "./permutation";
import {Dimension} from "./dimension";

export type ComposeFunc = (
    permA: Permutation,
    permB: Permutation,
    dimA: Dimension,
    dimB: Dimension,
    dimName: string
) => Permutation;

export const ConcatReplaceCF: ComposeFunc = (
    permA: Permutation,
    permB: Permutation,
    dimA: Dimension,
    dimB: Dimension,
    dimName: string
) => {
    return {
        [dimName]: `${permA[dimA.name]}${permB[dimB.name]}`
    };
}

export const ConcatAddCF: ComposeFunc = (
    permA: Permutation,
    permB: Permutation,
    dimA: Dimension,
    dimB: Dimension,
    dimName: string
) => {
    return {
        [dimA.name]: permA[dimA.name],
        [dimB.name]: permB[dimB.name],
        [dimName]: `${permA[dimA.name]}${permB[dimB.name]}`
    };
}
