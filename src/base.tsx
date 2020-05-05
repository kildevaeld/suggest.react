import React, { forwardRef, Ref } from 'react';
import { KeyCode } from './keycodes';
import { omit } from './util';
import { SuggestProps } from './suggest';


export interface Suggestion<T> {
    item: T;
    isHighlighted: boolean;
    isSelected: boolean;
}

export interface BaseSuggestSuggestionsProps<T> {
    suggestions: Suggestion<T>[];
    query: string;
    onSelect: (index: number) => any;
}

export interface BaseSuggestionInputProps {
    props: {
        value: string;
        onChange: React.ChangeEventHandler<HTMLInputElement>,
        onKeyDown: React.KeyboardEventHandler<HTMLInputElement>
        onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any,
        onFocus?: (event: React.FocusEvent<HTMLInputElement>) => any,
    }
    onClear: () => any;
}

export interface BaseSuggestProps<T> {
    value: string;
    selected?: number;
    index: number;
    onIndex: (index: number) => any;
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => any;
    onSelect: (selected: T | undefined, index?: number) => any;
    onClear: () => any;

    suggestions: T[];
    clearOnEscape?: boolean;
    children: (props: BaseSuggestSuggestionsProps<T>) => JSX.Element | null;
    // Finer grained config
    className?: string;
    style?: React.StyleHTMLAttributes<HTMLDivElement>
    renderInput?: () => JSX.Element;
    showSuggestions?: boolean;
}

function _renderInput({ props }: BaseSuggestionInputProps, ref?: Ref<HTMLDivElement>) {
    return <input {...props} data-testid="input" />
}


type SuggestBaseComponent = <T = any>(props: BaseSuggestProps<T> & React.RefAttributes<any>) => JSX.Element | null;

export const SuggestBase = forwardRef(function SuggestBase<T = any>(props: BaseSuggestProps<T>, ref: any) {

    const { value, onChange, index, onIndex,
        onSelect, clearOnEscape = false, onClear, onBlur, onFocus,
        suggestions, className, renderInput = _renderInput,
        showSuggestions = !!suggestions.length,
        children, style, selected } = props;

    const inputProps: BaseSuggestionInputProps = {
        onClear,
        props: {
            value,
            onChange,
            onFocus, onBlur,
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                switch (e.keyCode) {
                    case KeyCode.Up:
                        if (index > 0) {
                            onIndex(index - 1);
                        }
                        break;
                    case KeyCode.Down:
                        if (index < suggestions.length - 1) {
                            onIndex(index + 1);
                        }
                        break;
                    case KeyCode.Tab:
                        if (e.shiftKey) {
                            if (index > 0) {
                                onIndex(index - 1);
                            }
                        } else {
                            if (index > suggestions.length - 1) {
                                onIndex(index + 1)
                            }
                        }
                        break
                    case KeyCode.Escape:
                        if (!!clearOnEscape)
                            onClear();
                        break;
                    case KeyCode.Return:
                        if (index >= 0 && suggestions.length > 0 && showSuggestions) {
                            e.preventDefault();
                            onSelect?.(suggestions[index!]);
                        }
                        break;
                }
            }
        }
    };


    return <div className={className} style={style} ref={ref}>
        {renderInput(inputProps)}
        {showSuggestions && children({
            suggestions: suggestions.map((m, i) => ({
                item: m,
                isHighlighted: i == index,
                isSelected: i == selected
            })),
            query: value,
            onSelect: (index) => onSelect(suggestions[index], index)
        })}
    </div>


}) as SuggestBaseComponent;

