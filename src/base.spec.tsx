import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { SuggestBase } from './index';


test('SuggestBase', () => {

    const onChange = jest.fn();

    let suggest = render(<SuggestBase
        index={0}
        value={"query"}
        suggestions={[]}
        onIndex={() => { }}
        onChange={onChange}
        onSelect={() => { }}
        onClear={() => { }}
    >{(_) => <div></div>}</SuggestBase>);


    expect(onChange.mock.calls.length).toBe(0);
    expect(suggest.getByTestId("input")).toHaveValue("query");

    fireEvent.change(suggest.getByTestId("input"), { target: { value: 'query 2' } });
    expect(suggest.getByTestId("input")).toHaveValue("query");
    expect(onChange.mock.calls.length).toBe(1);


});