import { roots } from './values/roots'
import { qualities } from './values/qualities'
import {CompositeDimension, SimpleDimension} from './models/dimension';
import {ConcatAddCF, ConcatReplaceCF} from "./models/composer-func";

const rootsDim = new SimpleDimension('root', roots);

const qualitiesDim = new SimpleDimension('quality', qualities);

const chordsDim = new CompositeDimension(
    'chord',
    rootsDim,
    qualitiesDim,
    // ConcatAddCF
    ConcatReplaceCF
)

console.table(chordsDim.permutate());