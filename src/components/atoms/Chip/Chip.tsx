import * as Styled from './Chip.styles';
import { IChip } from './Chip.types';

export const Chip = ({ label, onClick, isSelected, disabled }: IChip) => {
    return (
        <Styled.Chip onClick={onClick} isSelected={isSelected} disabled={disabled} type="button">
            {label}
        </Styled.Chip>
    );
};
