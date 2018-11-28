export const SCORES = [
    {
        id: 'ones',
        name: 'Ones',
        value: -2
    },
    {
        id: 'twos',
        name: 'Twos',
        value: -2
    },
    {
        id: 'threes',
        name: 'Threes',
        value: -2
    },
    {
        id: 'fours',
        name: 'Fours',
        value: -2
    },
    {
        id: 'fives',
        name: 'Fives',
        value: -2
    },
    {
        id: 'sixes',
        name: 'Sixes',
        value: -2
    },
    {
        id: 'bonus',
        name: 'Bonus',
        value: 0
    },
    {
        id: 'three-of-a-kind',
        name: '3 of a Kind',
        value: -2
    },
    {
        id: 'four-of-a-kind',
        name: '4 of a Kind',
        value: -2
    },
    {
        id: 'full-house',
        name: 'Full House',
        value: -2
    },
    {
        id: 'small-straight',
        name: 'Small Straight',
        value: -2
    },
    {
        id: 'large-straight',
        name: 'Large Straight',
        value: -2
    },
    {
        id: 'chance',
        name: 'Chance',
        value: -2
    },
    {
        id: 'yahtzee',
        name: 'Yahtzee',
        value: -2
    },
    {
        id: 'yahtzee-bonus',
        name: 'Yahtzee Bonus',
        value: 0
    }
];

export const DICE = ['die-one', 'die-two', 'die-three', 'die-four', 'die-five'];

export const PIPS = ['tl', 'tc', 'tr', 'cl', 'cc', 'cr', 'bl', 'bc', 'br'];

export const DIE_PIPS = [
    [false, false, false, false, true, false, false, false, false],
    [true, false, false, false, false, false, false, false, true],
    [false, false, true, false, true, false, true, false, false],
    [true, false, true, false, false, false, true, false, true],
    [true, false, true, false, true, false, true, false, true],
    [true, false, true, true, false, true, true, false, true]
];