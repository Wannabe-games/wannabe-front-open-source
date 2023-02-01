import { useEffect, useRef, useState } from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import { Icon } from '../Icon';
import { ICON } from '../Icon/Icon.types';
import * as Styled from './Dropdown.styles';
import { IDropdown, IOption } from './Dropdown.types';

export const Dropdown = ({
    icon,
    max,
    options,
    onChangeAction,
    label = '',
    progress = false,
    className,
}: IDropdown) => {
    const [currentValue, setCurrentValue] = useState<IOption>();

    const handleChangeValue = (value: IOption) => {
        setCurrentValue(value);
        onChangeAction(value);
        setIsOpen(false);
    };

    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(options.length);
    const optionsRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        optionsRef.current && optionsRef.current.scrollTo({ top: 0 });
    }, [isOpen]);

    return (
        <>
            <Styled.Dropdown className={className}>
                {!progress ? (
                    <Styled.DropdownButton open={isOpen} {...buttonProps}>
                        {!currentValue || currentValue.value === -1 ? label : currentValue.label}
                        <Styled.Chevron name={ICON.CHEVRON_DOWN} width={16} open={isOpen} />
                    </Styled.DropdownButton>
                ) : (
                    <Styled.DropdownButton open={isOpen} {...buttonProps}>
                        {!currentValue || currentValue.value === -1 ? (
                            <>
                                <Icon name={icon} width={24} height={24} />
                                <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
                            </>
                        ) : (
                            <>
                                <Icon name={icon} width={24} height={24} />
                                <span>{currentValue.value}</span>
                                <Styled.ProgressBarStyled
                                    percent={
                                        typeof currentValue.value === 'number' && max
                                            ? (currentValue.value / max) * 100
                                            : 0
                                    }
                                />
                            </>
                        )}
                        <Styled.Chevron name={icon} width={16} open={isOpen} />
                    </Styled.DropdownButton>
                )}
                <Styled.Menu
                    style={{ display: isOpen ? 'block' : 'none', width: '100%' }}
                    role="menu"
                    ref={optionsRef}
                >
                    {options.map((option) => (
                        <a
                            {...itemProps[0]}
                            key={option.value}
                            onClick={() => handleChangeValue(option)}
                        >
                            {!progress ? (
                                option.label
                            ) : (
                                <>
                                    <Icon name={icon} width={24} height={24} />
                                    {option.value !== -1 ? option.value : 'All'}
                                    {option.value !== -1 && (
                                        <Styled.ProgressBarStyled
                                            percent={
                                                typeof option.value === 'number' && max
                                                    ? (option.value / max) * 100
                                                    : 0
                                            }
                                        />
                                    )}
                                </>
                            )}
                        </a>
                    ))}
                </Styled.Menu>
            </Styled.Dropdown>
        </>
    );
};
