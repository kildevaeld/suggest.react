import React from 'react';
import { KeyCode } from './keycodes';
import { omit } from './util';


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
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement>
    onClear: () => any;
}

export interface BaseSuggestProps<T> {
    value: string;
    selected?: number;
    index: number;
    onIndex: (index: number) => any;
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onSelect: (selected: T | undefined) => any;
    onClear: () => any;

    suggestions: T[];
    clearOnEscape?: boolean;
    children: (props: BaseSuggestSuggestionsProps<T>) => JSX.Element;
    // Finer grained config
    className?: string;
    style?: React.StyleHTMLAttributes<HTMLDivElement>
    renderInput?: () => JSX.Element;
    showSuggestions?: boolean;
}

function _renderInput(props: BaseSuggestionInputProps) {
    return <input {...omit(props, ['onClear'])} data-testid="input" />
}

export function SuggestBase<T>(props: BaseSuggestProps<T>) {

    const { value, onChange, index, onIndex,
        onSelect, clearOnEscape = false, onClear,
        suggestions, className, renderInput = _renderInput,
        showSuggestions = !!suggestions.length,
        children, style, selected } = props;


    const inputProps: BaseSuggestionInputProps = {
        value,
        onChange,
        onClear,
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
    };

    return <div className={className} style={style}>
        {renderInput(inputProps)}
        {showSuggestions && children({
            suggestions: suggestions.map((m, i) => ({
                item: m,
                isHighlighted: i == index,
                isSelected: i == selected
            })),
            query: value,
            onSelect: (index) => onSelect(suggestions[index])
        })}
    </div>


}

