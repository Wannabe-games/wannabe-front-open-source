import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { ReactComponent as Discord } from '@/assets/social-icons/discord.svg';
import { ReactComponent as Facebook } from '@/assets/social-icons/facebook.svg';
import { ReactComponent as Instagram } from '@/assets/social-icons/instagram.svg';
import { ReactComponent as Telegram } from '@/assets/social-icons/telegram.svg';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { Modal } from '@/components/atoms/Modal';
import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography';
import { Form } from '@/components/molecules/Form';
import { SocialMediaAvatar } from '@/components/molecules/SocialMediaAvatar';
import { SOCIAL_MEDIA_TYPE } from '@/components/molecules/SocialMediaAvatar/SocialMediaAvatar.types';
import { ROUTE } from '@/routing/routes.types';
import { useUsdPerStacksQuery } from '@/store/services/coingecko.service';
import { useGetCalculatorDetailsQuery } from '@/store/services/creatureRacer.service';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Styled from './Calculator.styles';
import { ICalculatorDetails, ICalculatorPopup, IMoney } from './Calculator.types';

// TODO: Should be checked and refactored

const socialMediaList = [
    { name: 'Discord', url: 'https://discord.com', icon: Discord },
    { name: 'Telegram', url: 'https://telegram.org', icon: Telegram },
    { name: 'Instagram', url: 'https://instagram.com', icon: Instagram },
    { name: 'Facebook', url: 'https://facebook.com', icon: Facebook },
];

const formSchema = Yup.object({
    rewardPool: Yup.number()
        .min(1, 'Must be greater than or equal to 1')
        .max(1000000000, 'Must be less than or equal to 1000000000'),
    userReward: Yup.number()
        .min(1, 'Must be greater than or equal to 1')
        .max(1000000000, 'Must be less than or equal to 100'),
    activeReferral: Yup.number()
        .min(1, 'Must be greater than or equal to 1')
        .max(1000000000, 'Must be less than or equal to 1000000000'),
    usersDailyAmount: Yup.number()
        .min(1, 'Must be greater than or equal to 1')
        .max(1000000000, 'Must be less than or equal to 1000000000'),
});

const validationOpt = { resolver: yupResolver(formSchema) };

const Money = ({ money, size = 'h5' }: IMoney) => {
    const nf = new Intl.NumberFormat('de-DE');

    return (
        <div>
            <Typography variant={size}>~</Typography>{' '}
            <Typography variant={size} color={theme.color.yellow} weight="bold">
                {nf.format(Math.round(money.stacks)).replaceAll('.', ' ')}
            </Typography>{' '}
            <Icon name={CURRENCY.TETHER} width={size === 'h5' ? '1.8rem' : '3rem'} />{' '}
            <Typography variant="h3">/</Typography>{' '}
            <Typography variant={size} color={theme.color.yellow} weight="bold">
                {nf.format(Math.round(money.tether)).replaceAll('.', ' ')}
            </Typography>{' '}
            <Icon name={CURRENCY.STACKS} width={size === 'h5' ? '1.8rem' : '3rem'} />
        </div>
    );
};

const TooltipContent = () => (
    <>
        <Typography variant="body2" weight="regular" color={theme.color.whiteAlpha.a60}>
            All calculated possible revenue using simple tools such as: The Mint Cap Statistics,
            Revenue Calculators, Reward Pool size, rNFT Referral Code and/or rNFT commissions,
            Staked Creature NFTs and their Reward Pool Share and/or all Content (“Content”) of the
            Site is for informational purposes only, you should not construe any such information or
            other material as legal, tax, investment, financial, or other advice. Nothing contained
            on our Site and in mobile application constitutes a solicitation, recommendation,
            endorsement, or offer by Wannabe PSA as creator of Creature Race Race & Earn game or any
            third party service provider such as NFT Marketplaces linked to the Site, to buy or sell
            any digital assets or other financial instruments in this or in in any other
            jurisdiction in which such solicitation or offer would be unlawful under the securities
            laws of such jurisdiction or any other digital assets regulations.
        </Typography>
        <Typography variant="body2" weight="regular" color={theme.color.whiteAlpha.a60}>
            All Content on this Site is information of a general nature and does not address the
            circumstances of any particular individual or entity. Nothing in the Content of the Site
            and APP constitutes professional and/or financial advice, nor does any information on
            Content of the Site and App, constitute a comprehensive or complete statement of the
            matters discussed or the law relating thereto. You alone assume the sole responsibility
            of evaluating the merits and risks associated with the use of any information or other
            Content on the Site before making any decisions based on such information or other
            Content. In exchange for using the Mint Cap Statistics, Revenue Calculators, Reward Pool
            size, rNFT Referral Code and/or rNFT commissions, Staked Creature NFTs and their Reward
            Pool Share and/or all Content on the Site and/or mobile application, you agree not to
            hold Wannabe PSA, its affiliates or any third party service provider liable for any
            possible claim for damages arising from any decision you make based on information or
            other Content made available to you through the Content of the Site and/or App.
        </Typography>
    </>
);

const CalculatorPopupRaw = ({ hide, showRevenueCalculator }: ICalculatorPopup) => {
    const { control, handleSubmit, formState } = useForm<ICalculatorDetails>(validationOpt);
    const [calculatorDetails, setCalculatorDetails] = useState({
        rewardPool: 0,
        userReward: '0%',
        activeReferral: 0,
        usersDailyAmount: 0,
    });
    const [rewardPool, setRewardPool] = useState({ stacks: 0, tether: 0 });
    const [yourStats, setYourStats] = useState({ stacks: 0, tether: 0 });
    const [futureRewards, setFutureRewards] = useState({ stacks: 0, tether: 0 });
    const { data, isLoading, refetch } = useGetCalculatorDetailsQuery(null);
    const stacksToUSD = useUsdPerStacksQuery(null);

    const { errors, isValid } = formState;

    const exchangeRate = stacksToUSD?.data ? stacksToUSD.data : 0;

    const navigate = useNavigate();

    useEffect(() => {
        refetch();
        // TODO: Should be checked
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hide]);

    useEffect(() => {
        if (!isLoading && data) {
            setCalculatorDetails(data);
            const rewards = calculate({
                ...data,
                userReward: parseInt(data.userReward.slice(0, -1)),
            });

            setYourStats({ stacks: rewards, tether: rewards / exchangeRate });
            setRewardPool({ stacks: data.rewardPool, tether: data.rewardPool / exchangeRate });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isLoading]);

    const calculate = ({
        rewardPool,
        userReward,
        activeReferral,
        usersDailyAmount,
    }: ICalculatorDetails) => {
        const pool = (rewardPool * userReward) / 100;
        let commision = 0;
        if (activeReferral > 1500) {
            commision = 0.4;
        } else if (activeReferral > 500) {
            commision = 0.2;
        } else if (activeReferral > 75) {
            commision = 0.1;
        } else if (activeReferral > 25) {
            commision = 0.05;
        } else {
            commision = 0.01;
        }
        const userPool = activeReferral * usersDailyAmount * commision;

        return userPool + pool;
    };

    const handleCalculate = handleSubmit(async (formData) => {
        const rewards = calculate(formData);
        setFutureRewards({ stacks: rewards * exchangeRate, tether: rewards });
    });
    const nf = new Intl.NumberFormat('de-DE');

    return (
        <Modal hideModal={hide}>
            <form>
                <Styled.Calculator>
                    <Typography variant="h2" weight="bold">
                        Calculator <Tooltip element={<TooltipContent />} sx={35.8} iconSize={24} />
                    </Typography>
                    <Typography variant="body1" color={theme.color.yellow}>
                        So you think you can Race & Earn? Check how much you will make!
                    </Typography>
                    <Styled.Divider />
                    <Styled.Row>
                        <div>
                            <Styled.InputTypography variant="h5" weight="bold">
                                Enter Reward pool size
                            </Styled.InputTypography>
                            <Form.Input
                                control={control}
                                name="rewardPool"
                                placeholder="enter amount in USDT"
                                type="number"
                                error={errors.rewardPool ? true : false}
                                required
                            />
                            {errors.rewardPool && (
                                <Form.Error>{errors.rewardPool.message}</Form.Error>
                            )}
                        </div>
                        <div>
                            <Styled.TypographyMargin
                                variant="h5"
                                color={theme.color.whiteAlpha.a60}
                            >
                                Current Reward pool size
                            </Styled.TypographyMargin>
                            <Money money={rewardPool} />
                        </div>
                    </Styled.Row>
                    <Styled.Divider />
                    <Styled.Row>
                        <div>
                            <Styled.InputTypography variant="h5" weight="bold">
                                Enter Reward pool % share
                            </Styled.InputTypography>
                            <Form.Input
                                rules={{ min: 0, max: 100 }}
                                control={control}
                                name="userReward"
                                placeholder="enter % value"
                                type="number"
                                error={errors.userReward ? true : false}
                                required
                            />
                            {errors.userReward && (
                                <Form.Error>{errors.userReward.message}</Form.Error>
                            )}
                        </div>
                        <div>
                            <Styled.TypographyMargin
                                variant="h5"
                                color={theme.color.whiteAlpha.a60}
                                weight="bold"
                            >
                                Your Reward pool % share
                            </Styled.TypographyMargin>
                            <div>
                                <Typography variant="h5" color={theme.color.yellow} weight="bold">
                                    {calculatorDetails.userReward.slice(0, -1)}
                                </Typography>{' '}
                                <Typography variant="h5">%</Typography>
                            </div>
                        </div>
                    </Styled.Row>
                    <Styled.Divider />
                    <Styled.Row>
                        <div>
                            <Styled.InputTypography variant="h5" weight="bold">
                                How many users use your Referral code
                            </Styled.InputTypography>
                            <Form.Input
                                control={control}
                                name="activeReferral"
                                placeholder="enter number"
                                type="number"
                                error={errors.activeReferral ? true : false}
                                required
                            />
                            {errors.activeReferral && (
                                <Form.Error>{errors.activeReferral.message}</Form.Error>
                            )}
                        </div>
                        <div>
                            <Styled.TypographyMargin
                                variant="h5"
                                color={theme.color.whiteAlpha.a60}
                            >
                                <>
                                    Current number of Users,
                                    <br />
                                    <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                                        using your
                                    </Typography>{' '}
                                    <Styled.RNFT variant="h6" weight="black">
                                        rNFT
                                    </Styled.RNFT>
                                </>
                            </Styled.TypographyMargin>
                            <div>
                                <Typography variant="h5" color={theme.color.yellow} weight="bold">
                                    {nf
                                        .format(Math.round(calculatorDetails.activeReferral))
                                        .replaceAll('.', ' ')}
                                </Typography>{' '}
                                <Typography variant="h5" weight="light">
                                    invited
                                </Typography>
                            </div>
                        </div>
                    </Styled.Row>
                    <Styled.Divider />
                    <Styled.Row>
                        <div>
                            <Styled.InputTypography variant="h5" weight="bold">
                                <>
                                    Enter Average amount user spends,
                                    <br />
                                    <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                                        using your
                                    </Typography>{' '}
                                    <Styled.RNFT variant="h6">rNFT</Styled.RNFT>
                                </>
                            </Styled.InputTypography>
                            <Form.Input
                                control={control}
                                name="usersDailyAmount"
                                placeholder="average amount user spends using your rNFT"
                                type="number"
                                error={errors.usersDailyAmount ? true : false}
                                required
                            />
                            {errors.usersDailyAmount && (
                                <Form.Error>{errors.usersDailyAmount.message}</Form.Error>
                            )}
                        </div>
                        <div>
                            <Styled.TypographyMargin
                                variant="h5"
                                color={theme.color.whiteAlpha.a60}
                            >
                                <>
                                    Average amount user spends daily,
                                    <br />
                                    <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                                        using your
                                    </Typography>{' '}
                                    <Styled.RNFT variant="h6">rNFT</Styled.RNFT>
                                </>
                            </Styled.TypographyMargin>
                            <div>
                                <Money
                                    money={{
                                        stacks: calculatorDetails.usersDailyAmount,
                                        tether: Math.round(
                                            calculatorDetails.usersDailyAmount * 1.5,
                                        ),
                                    }}
                                />
                            </div>
                        </div>
                    </Styled.Row>
                    <Styled.Divider />
                    <Styled.Row>
                        <div>
                            <Styled.CalculateButton
                                disabled={!isValid}
                                primary
                                label="Calculate"
                                onClick={handleCalculate}
                            />
                        </div>
                        <div>
                            <Styled.TypographyMargin
                                variant="h5"
                                color={theme.color.whiteAlpha.a60}
                            >
                                Your average revenue
                            </Styled.TypographyMargin>
                            <Money money={yourStats} />
                        </div>
                    </Styled.Row>
                    <Styled.Divider />
                    <Styled.Row>
                        <Styled.FutureRewards>
                            {futureRewards.stacks !== 0 && (
                                <>
                                    <Typography variant="h2" weight="bold">
                                        Your future Rewards
                                    </Typography>
                                    <Money money={futureRewards} size="h2" />
                                    <Typography variant="body2" color={theme.color.whiteAlpha.a60}>
                                        <>
                                            USD Tether{' '}
                                            <Icon
                                                name={ICON.EXCHANGE}
                                                width={16}
                                                fill={theme.color.whiteAlpha.a60}
                                                ml={0.8}
                                                mr={0.8}
                                            />{' '}
                                            Stacks
                                        </>
                                    </Typography>
                                </>
                            )}
                        </Styled.FutureRewards>
                        <SocialMediaAvatar
                            type={SOCIAL_MEDIA_TYPE.EARN}
                            socialMediaList={socialMediaList}
                            action="GET"
                        />
                    </Styled.Row>
                    <Styled.Actions>
                        <Button
                            tertiary
                            label="Close"
                            onClick={() => {
                                if (window.location.pathname === ROUTE.CALCULATOR_EXTENDED) {
                                    navigate(ROUTE.LOGIN);
                                } else {
                                    hide();
                                }
                            }}
                        />
                        <Button
                            secondary
                            label="Pro calculator XLS"
                            onClick={() => {
                                window.open(
                                    'https://docs.google.com/spreadsheets/d/14nkSoS8Ij4EI9IUbUyV9FwkgoUIs-2_VpmVaLWrRPiI/edit#gid=0',
                                    '_blank',
                                );
                            }}
                        />
                        <Button
                            secondary
                            label="Revenue calculator"
                            onClick={() => {
                                if (window.location.pathname === ROUTE.CALCULATOR_EXTENDED) {
                                    navigate(ROUTE.CALCULATOR_REVENUE);
                                } else {
                                    hide();
                                    showRevenueCalculator();
                                }
                            }}
                        />
                    </Styled.Actions>
                </Styled.Calculator>
            </form>
        </Modal>
    );
};

export const CalculatorPopup = CalculatorPopupRaw;
