import { Modal } from '@/components/atoms/Modal';
import { ShareAndJoin } from '@/components/organisms/ShareAndJoin';
import { useGetUserCardQuery } from '@/store/services/creatureRacer.service';

const defaultData = {
    avatar: null,
    nick: '',
    poolShare: '0',
    referralCode: null,
    referralLevel: null,
    rewardPool: 0,
    qrCode: '',
};

// TODO: handle error, loading state
export const RegisterSuccess = ({ hide = () => ({}) }: { hide?: () => void }) => {
    const { data: fetchedUserCard } = useGetUserCardQuery({ id: '1' });

    return (
        <Modal hideModal={hide}>
            <ShareAndJoin type="join" data={fetchedUserCard ?? defaultData} />
        </Modal>
    );
};
