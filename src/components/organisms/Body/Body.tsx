import { useEffect } from 'react';

import { MintNFTCreaturePopup } from '@/components/molecules/Popups/MintNFTCreature';
import { useModal } from '@/hooks/useModal';
import { useTypedSelector } from '@/store';
import { selectCurrentlyMintedCreature } from '@/store/slices/creatures.slice';

export const Body = ({ children }: { children: React.ReactNode }) => {
    const creatureId = useTypedSelector(selectCurrentlyMintedCreature);

    const {
        showModal: showMintNFTCreaturePopUp,
        hideModal: hideMintNFTCreaturePopUp,
        isOpen: isOpenMintNFTCreaturePopup,
    } = useModal(() => (
        <MintNFTCreaturePopup hide={hideMintNFTCreaturePopUp} show={showMintNFTCreaturePopUp} />
    ));

    useEffect(() => {
        if (creatureId && !isOpenMintNFTCreaturePopup) {
            showMintNFTCreaturePopUp();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creatureId, isOpenMintNFTCreaturePopup]);

    return <>{children}</>;
};
