import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { useEffect, useState } from 'react';
import { useModal as useModalLib } from 'react-modal-hook';

export const useModal = (component: React.FC, inputs?: unknown[] | undefined) => {
    const [isOpen, setIsOpen] = useState(false);
    const Component = component;
    const [customRef, setCustomRef] = useState<HTMLDivElement | null>();

    const [showModal, hideModal] = useModalLib(
        () => (
            <div ref={(ref) => setCustomRef(ref)}>
                <Component />
            </div>
        ),
        inputs,
    );

    useEffect(() => {
        if (customRef && isOpen) {
            disableBodyScroll(
                customRef.querySelector('[data-custom-modal] div') as HTMLDivElement,
                {
                    reserveScrollBarGap: true,
                    allowTouchMove: (el) => {
                        while (el && el !== document.body && el instanceof HTMLElement) {
                            if (el.dataset.bodyScrollLockIgnore !== null) {
                                return true;
                            }
                        }

                        return false;
                    },
                },
            );
        }

        return () => {
            clearAllBodyScrollLocks();
        };
    });

    const handleShowModal = () => {
        showModal();
        setIsOpen(true);
    };

    const handleHideModal = () => {
        hideModal();
        setIsOpen(false);
    };

    return {
        showModal: handleShowModal,
        hideModal: handleHideModal,
        isOpen,
    };
};
