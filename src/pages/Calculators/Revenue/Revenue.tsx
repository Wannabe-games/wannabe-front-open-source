import { useEffect } from 'react';

import { CalculatorPopup } from '@/components/molecules/Popups/Calculator';
import { RevenuePopup } from '@/components/molecules/Popups/Revenue';
import { useModal } from '@/hooks/useModal';

export const Revenue = () => {
    const { showModal: showCalculatorModal, hideModal: hideCalculatorModal } = useModal(() => (
        <CalculatorPopup hide={hideCalculatorModal} showRevenueCalculator={showRevenueModal} />
    ));
    const { showModal: showRevenueModal, hideModal: hideRevenueModal } = useModal(() => (
        <RevenuePopup hide={hideRevenueModal} showExtendedCalculator={showCalculatorModal} />
    ));
    useEffect(() => {
        showRevenueModal();
    }, [showRevenueModal]);

    return null;
};
