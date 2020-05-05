import React from 'react';
import { BaseSuggestProps, SuggestBase, BaseSuggestSuggestionsProps } from "./base";
import useScrollLock from 'use-scroll-lock';
import { omit } from './util';
import { createPortal } from 'react-dom';

export interface SuggestProps<T> extends Omit<BaseSuggestProps<T>, 'children'> {
    fullscreen: boolean;
    children: (props: BaseSuggestSuggestionsProps<T> & { fullscreen: boolean }) => JSX.Element | null
    mount?: () => HTMLElement;
}

export function Suggest<T>(props: SuggestProps<T>) {

    const { children, fullscreen, mount = () => document.body } = props;


    const ref = React.useRef(null);
    useScrollLock(fullscreen, ref);

    const suggest = <SuggestBase<T> {...omit(props, ['children'])} ref={ref}>
        {(props) => children(Object.assign(props, { fullscreen }))}
    </SuggestBase>



    return fullscreen
        ? createPortal(suggest, mount())
        : suggest


}