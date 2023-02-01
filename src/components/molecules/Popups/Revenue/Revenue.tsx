import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Input } from '@/components/atoms/Input';
import { Modal } from '@/components/atoms/Modal';
import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography';
import { ROUTE } from '@/routing/routes.types';
import { useUsdPerStacksQuery } from '@/store/services/coingecko.service';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import * as Styled from './Revenue.styles';
import { IInvestment, IMoney, IRevenuePopup } from './Revenue.types';
import { RevenueTooltip } from './RevenueTooltip';

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

const Money = ({ money }: IMoney) => {
    const nf = new Intl.NumberFormat('de-DE');

    return (
        <Styled.Money>
            <span>
                <Typography variant="h3" weight="light">
                    ~
                </Typography>{' '}
                <Typography variant="h3" color={theme.color.yellow} weight="bold">
                    {nf.format(Math.round(money.stacks)).replaceAll('.', ' ')}
                </Typography>{' '}
                <Icon name={CURRENCY.TETHER} width={'2.4rem'} />
            </span>{' '}
            <span>
                <Typography variant="h3" weight="light">
                    /
                </Typography>{' '}
                <Typography variant="h3" color={theme.color.yellow} weight="bold">
                    {nf.format(Math.round(money.tether)).replaceAll('.', ' ')}
                </Typography>{' '}
                <Icon name={CURRENCY.STACKS} width={'2.4rem'} />
            </span>
        </Styled.Money>
    );
};

const staticValues = {
    aidCommission: 0.5,
    averageSpent: 27,
    initialStaked: 1000,
    newUsersDailyGrowth: 10,
    newUsersStakeDelimiter: 0.5,
    projectedUserGrowth: 0.25,
    usersStart: 20,
};

export const RevenuePopup = ({ hide, showExtendedCalculator }: IRevenuePopup) => {
    const [stakedValue, setStakedValue] = useState('');
    const [investment, setInvestment] = useState<IInvestment>({
        return: {
            days: 0,
            money: { tether: 0, stacks: 0 },
        },
        double: {
            days: 0,
            money: { tether: 0, stacks: 0 },
        },
    });
    const stacksToUSD = useUsdPerStacksQuery(null);
    const navigate = useNavigate();

    const exchangeRate = stacksToUSD?.data ? stacksToUSD.data : 0;

    const calculate = () => {
        if (parseInt(stakedValue) < 1 || !stakedValue) return null;
        let returnInvestmentDays = 1;
        let doubleInvestmentDays = 1;
        let returnInvestmentMoney = 0;
        let doubleInvestmentMoney = 0;
        const value = parseInt(stakedValue);
        const doubleValue = value * 2;
        let usersDailyRetention = 30;
        let newUsersIncome = staticValues.averageSpent * usersDailyRetention;
        let totalStaked =
            staticValues.averageSpent * usersDailyRetention * staticValues.newUsersStakeDelimiter;
        let userRevenueShare =
            (newUsersIncome * value) / (totalStaked + value + staticValues.initialStaked);
        let userRevenueShareRolling = userRevenueShare * staticValues.aidCommission;

        while (value * 2 > userRevenueShareRolling) {
            const newUsers = usersDailyRetention * staticValues.projectedUserGrowth;
            usersDailyRetention = Math.floor(newUsers + staticValues.newUsersDailyGrowth);
            newUsersIncome = usersDailyRetention * staticValues.averageSpent;
            const newUsersDailyStake = newUsersIncome * staticValues.newUsersStakeDelimiter;
            totalStaked = totalStaked + newUsersDailyStake;
            userRevenueShare =
                (newUsersIncome * value) / (totalStaked + value + staticValues.initialStaked);
            userRevenueShareRolling = userRevenueShareRolling + userRevenueShare;
            if (userRevenueShareRolling < value) returnInvestmentDays++;
            if (userRevenueShareRolling < doubleValue) doubleInvestmentDays++;
            if (userRevenueShareRolling >= value && returnInvestmentMoney === 0) {
                returnInvestmentMoney = userRevenueShareRolling;
            }
            if (userRevenueShareRolling >= doubleValue && doubleInvestmentMoney === 0) {
                doubleInvestmentMoney = userRevenueShareRolling;
            }
        }
        setInvestment({
            return: {
                days: returnInvestmentDays,
                money: {
                    tether: returnInvestmentMoney,
                    stacks: returnInvestmentMoney * exchangeRate,
                },
            },
            double: {
                days: doubleInvestmentDays,
                money: {
                    tether: doubleInvestmentMoney,
                    stacks: doubleInvestmentMoney * exchangeRate,
                },
            },
        });
    };

    const handleChangeStakedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (parseInt(e.target.value) <= 1000000000) {
            setStakedValue(e.target.value);
        }
    };

    return (
        <Modal hideModal={hide}>
            <Styled.Revenue>
                <Styled.Header>
                    <Typography variant="h2" weight="bold">
                        Revenue calculator{' '}
                        <Tooltip element={<TooltipContent />} sx={37.8} iconSize={24} />
                    </Typography>
                    <Typography variant="body1" color={theme.color.yellow}>
                        How do we calculate it?{' '}
                        <Tooltip
                            element={<RevenueTooltip />}
                            sx={45.7}
                            color={theme.color.yellow}
                        />
                    </Typography>
                </Styled.Header>
                <Styled.Divider />
                <Styled.Content>
                    <Typography variant="h5" weight="bold">
                        Staked value
                    </Typography>
                    <Input
                        placeholder="enter amount of Stacks that you have spent for Creature NFTs and staked them "
                        onChange={handleChangeStakedValue}
                        value={stakedValue}
                        type="number"
                    />
                    <div>
                        <Button primary label="Calculate" onClick={calculate} />
                    </div>
                    <Styled.Row>
                        <span></span>
                        <Typography variant="h4" weight="bold" color={theme.color.whiteAlpha.a60}>
                            Days
                        </Typography>
                        <Typography variant="h4" weight="bold" color={theme.color.whiteAlpha.a60}>
                            Total value earned
                        </Typography>
                    </Styled.Row>
                    <Styled.Divider />
                    <Styled.Row>
                        <Typography variant="h5" weight="bold" color={theme.color.whiteAlpha.a60}>
                            Return investment
                        </Typography>
                        <Typography variant="h5" weight="bold" color={theme.color.white}>
                            {investment.return.days}
                        </Typography>
                        <Typography variant="h5" weight="bold" color={theme.color.whiteAlpha.a60}>
                            <Money money={investment.return.money} />
                        </Typography>
                    </Styled.Row>
                    <Styled.Row>
                        <Typography variant="h5" weight="bold" color={theme.color.whiteAlpha.a60}>
                            Double investment
                        </Typography>
                        <Typography variant="h5" weight="bold" color={theme.color.white}>
                            {investment.double.days}
                        </Typography>
                        <Typography variant="h5" weight="bold" color={theme.color.whiteAlpha.a60}>
                            <Money money={investment.double.money} />
                        </Typography>
                    </Styled.Row>
                </Styled.Content>
                <Styled.Divider />
                <Styled.Actions>
                    <Button
                        tertiary
                        label="Close"
                        onClick={() => {
                            if (window.location.pathname === ROUTE.CALCULATOR_REVENUE) {
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
                        label="Extended calculator"
                        onClick={() => {
                            if (window.location.pathname === ROUTE.CALCULATOR_REVENUE) {
                                navigate(ROUTE.CALCULATOR_EXTENDED);
                            } else {
                                hide();
                                showExtendedCalculator();
                            }
                        }}
                    />
                </Styled.Actions>
            </Styled.Revenue>
        </Modal>
    );
};
