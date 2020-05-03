import { SuggestBase } from '..';
import { render } from 'react-dom';
import React, { useState } from 'react';

const LIST = [
    "Hello",
    "World",
    "It",
    "Is",
    "Yours"
];


function Suggest() {

    const [value, setValue] = useState(''),
        [index, setIndex] = useState(0),
        [suggestions, setSuggestions] = useState<string[]>([]);

    const query = async (v: string) => {
        let r = new RegExp(`.*${v},*`, 'ig')
        setSuggestions(LIST.filter(m => m.match(r)));
    };

    return <SuggestBase
        onChange={e => {
            query((e.target as any).value);
            setValue((e.target as any).value);
        }}
        onSelect={item => {
            setValue(item || '')
        }}
        onClear={() => {
            setValue('');
        }}
        suggestions={suggestions}
        value={value}
        index={index}
        onIndex={setIndex}
        showSuggestions={!!suggestions.length}
    >
        {({ suggestions, onSelect }) => (<ul>
            {suggestions.map((item, i) => (<li key={i} onClick={onSelect.bind(void 0, i)}>
                {item.item}
            </li>))}
        </ul>)}
    </SuggestBase>
}

export function run() {

    render(<Suggest />, document.querySelector('#app'));

}