import {Combo} from "../models/combo";

export class ComboPresenter {
    static polishCombo(combo: Combo): Combo {
        if (
            combo['chord-root']
            && combo['chord-type'] === 'triad'
            && combo['triad-quality']
        ) {
            combo['chord-symbol'] =
                `${combo['chord-root']}${combo['triad-quality']}`;
            combo = ComboPresenter.omitProps(combo, ['chord-root', 'chord-type', 'triad-quality'])
        }
        else if (
            combo['chord-root']
            && combo['chord-type'] === '7th'
            && combo['seventh-quality']
        ) {
            combo['chord-symbol'] =
                `${combo['chord-root']}${combo['seventh-quality']}`;
            combo = ComboPresenter.omitProps(combo, ['chord-root', 'chord-type', 'seventh-quality'])
        }
        else if (
            combo['chord-root']
            && combo['chord-type'] === '9th'
            && combo['ninth-quality']
        ) {
            combo['chord-symbol'] =
                `${combo['chord-root']}${combo['ninth-quality']}`;
            combo = ComboPresenter.omitProps(combo, ['chord-root', 'chord-type', 'ninth-quality'])
        }

        return combo;
    }

    private static omitProps(source: { [index: string]: any}, props: string[]): { [index: string]: any} {
        let copy = { ...source };
        for (const prop of props) {
           copy = { ...copy, ...{ [prop]: undefined }};
        }

        Object.keys(copy).forEach(key => {
            if (copy[key] === undefined) {
                delete copy[key];
            }
        });

        return copy;
    }
}