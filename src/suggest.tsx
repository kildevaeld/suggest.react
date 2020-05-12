import React from 'react';
import { SuggestBaseProps, SuggestBase, BaseSuggestSuggestionsProps, BaseSuggestionInputProps } from "./base";
import useScrollLock from 'use-scroll-lock';
import { omit } from './util';
import { createPortal } from 'react-dom';


export interface SuggestionsProps<T> extends BaseSuggestSuggestionsProps<T> {
    fullscreen: boolean;
}

export interface SuggestionInputProps extends BaseSuggestionInputProps {
    fullscreen: boolean;
}

export interface SuggestProps<T> extends Omit<SuggestBaseProps<T>, 'children' | 'renderInput'> {
    fullscreen: boolean;
    children: (props: SuggestionsProps<T>) => JSX.Element | null
    mount?: () => HTMLElement;
    renderInput?: (props: SuggestionInputProps) => JSX.Element;
}

export function Suggest<T>(props: SuggestProps<T>) {

    const { children, fullscreen, mount = () => document.body } = props;


    const ref = React.useRef(null);
    useScrollLock(fullscreen, ref);

    const renderInput = props.renderInput
        ? (props: any) => {
            props.fullscreen = fullscreen;
            return props.renderInput(props);
        }
        : void 0;

    const suggest = <SuggestBase<T> {...omit(props, ['children', 'renderInput'])} renderInput={renderInput} ref={ref}>
        {(props) => children(Object.assign(props, { fullscreen }))}
    </SuggestBase>



    return fullscreen
        ? createPortal(suggest, mount())
        : suggest


}