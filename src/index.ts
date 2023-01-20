import { types } from "./values/types";
import {ninthQualities, seventhQualities, triadQualities} from "./values/qualities";
import { roots } from "./values/roots";
import { DSet } from "./models/d-set";
import {ComboGenerator} from "./services/combo-generator";
import {activities} from "./values/activities";
import {ComboPresenter} from "./services/combo-presenter";
import {Combo} from "./models/combo";

const chordRootsSet = new DSet('chord-root', roots);

const chordTypesSet = new DSet('chord-type', types);

const triadQualitiesSet = new DSet('triad-quality', triadQualities);
triadQualitiesSet.context = { setName: 'chord-type', value: 'triad'};

const seventhQualitiesSet = new DSet('seventh-quality', seventhQualities);
seventhQualitiesSet.context = { setName: 'chord-type', value: '7th'};

const ninthQualitiesSet = new DSet('ninth-quality', ninthQualities);
ninthQualitiesSet.context = { setName: 'chord-type', value: '9th'};

const activitiesSet = new DSet('activity', activities, undefined, true);
const leftHandActivitiesSet = new DSet(
    'left-hand-activity',
    [],
    undefined,
    false,
    activitiesSet
);
const rightHandActivitiesSet = new DSet(
    'right-hand-activity',
    [],
    undefined,
    false,
    activitiesSet
);

const generator = new ComboGenerator();
generator.registerSet(chordRootsSet);
generator.registerSet(chordTypesSet);
generator.registerSet(triadQualitiesSet);
// generator.registerSet(seventhQualitiesSet);
// generator.registerSet(ninthQualitiesSet);
generator.registerSet(leftHandActivitiesSet);
generator.registerSet(rightHandActivitiesSet);

console.table(shuffle(generator.generateCombos().map(ComboPresenter.polishCombo)));

function shuffle(unshuffled: Combo[]) {
    return unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}