import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import { SuggestBase } from './index';


test('SuggestBase', () => {

    let suggest = render(<SuggestBase
        index={0}
        value={"query"}
        suggestions={[]}
        onIndex={() => { }}
        onChange={() => { }}
        onSelect={() => { }}
        onClear={() => { }}
    >{(_) => <div></div>}</SuggestBase>);


    expect(suggest.getByTestId("input")).toHaveValue("query");

});