import _debounce from 'lodash/debounce';
import React, { useMemo, useState } from 'react';

import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/atoms/Modal';
import { Typography } from '@/components/atoms/Typography';
import { theme } from '@/theme/mainTheme';

import * as Styled from './Agreement.styles';

interface AgreementProps {
    hide: () => void;
    handleRegister: () => void;
}

export const Agreement = (props: AgreementProps) => {
    const { hide, handleRegister } = props;
    const [accept, setAccept] = useState(false);
    const [isAvailableToAccept, setIsAvailableToAccept] = useState(false);

    const handleChangeAccept = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccept(e.target.checked);
    };

    const handleAccept = (e: React.FormEvent) => {
        e.preventDefault();

        hide();
        handleRegister();
    };

    const handleEndScroll = useMemo(
        () =>
            _debounce((e: React.UIEvent<HTMLElement>) => {
                const { scrollTop, scrollHeight, offsetHeight } = e.target as HTMLElement;
                const hasScrollReachedBottom = offsetHeight + scrollTop >= scrollHeight - 40;

                if (hasScrollReachedBottom) {
                    setIsAvailableToAccept(true);
                }
            }, 200),
        [],
    );

    const checkScrollPosition = (e: React.UIEvent<HTMLElement>) => {
        !isAvailableToAccept && handleEndScroll(e);
    };

    return (
        <Modal hideModal={hide}>
            <form data-body-scroll-lock-ignore>
                <Styled.Agreement>
                    <Typography variant="h2" weight="bold">
                        I understand the risk and want to Race & Earn
                    </Typography>
                    <Typography variant="body1" color={theme.color.yellow}>
                        You accept and acknowledge Terms & Conditions and each of the following:
                    </Typography>
                    <Styled.Scrollable onScroll={checkScrollPosition}>
                        <Typography variant="h6" weight="bold">
                            1. ASSUMPTION OF RISK
                        </Typography>
                        <Styled.Row>
                            All calculated possible revenue using simple tools such as The Mint Cap
                            Statistics, Revenue Calculators, Reward Pool size, rNFT Referral Code
                            and/or rNFT commissions, Staked Creature NFTs and their Reward Pool
                            Share and/or all Content (“Content”) of the Site is for informational
                            purposes only, you should not construe any such information or other
                            material as legal, tax, investment, financial, or other advice. Nothing
                            contained on our Site and in the mobile application constitutes a
                            solicitation, recommendation, endorsement, or offer by Wannabe PSA as
                            the creator of Creature Race Race & Earn game or any third party service
                            provider such as NFT Marketplaces linked to the Site, to buy or sell any
                            digital assets or other financial instruments in this or in any other
                            jurisdiction in which such solicitation or offer would be unlawful under
                            the securities laws of such jurisdiction or any other digital assets
                            regulations.
                            <br />
                            All Content on this Site is information of a general nature and does not
                            address the circumstances of any particular individual or entity.
                            Nothing in the Content of the Site and APP constitutes professional
                            and/or financial advice, nor does any information on Content of the Site
                            and App, constitute a comprehensive or complete statement of the matters
                            discussed or the law relating thereto. You alone assume the sole
                            responsibility of evaluating the merits and risks associated with the
                            use of any information or other Content on the Site before making any
                            decisions based on such information or other Content. In exchange for
                            using the Mint Cap Statistics, Revenue Calculators, Reward Pool size,
                            rNFT Referral Code and/or rNFT commissions, Staked Creature NFTs and
                            their Reward Pool Share and/or all Content on the Site and/or mobile
                            application, you agree not to hold Wannabe PSA, its affiliates or any
                            third party service provider liable for any possible claim for damages
                            arising from any decision you make based on information or other Content
                            made available to you through the Content of the Site and/or App.
                        </Styled.Row>
                        <Styled.Row>
                            <Typography variant="body1" weight="bold">
                                You accept and acknowledge each of the following:
                            </Typography>
                        </Styled.Row>
                        <Styled.Row>
                            <Typography variant="body1" weight="bold">
                                A.
                            </Typography>{' '}
                            The prices of blockchain assets are extremely volatile. Fluctuations in
                            the price of other digital assets could materially and adversely affect
                            the value of your Creatures, which may also be subject to significant
                            price volatility. We cannot guarantee that any purchasers of Creatures
                            and their upgrades will not lose money.
                        </Styled.Row>
                        <Styled.Row>
                            <Typography variant="body1" weight="bold">
                                B.
                            </Typography>{' '}
                            Staking of blockchain assets such as NFTs is subject to very high risk.
                            Due to fluctuating Creature Racer user base no staking rewards (reward
                            pool percentage share) can be predicted. We cannot guarantee that any
                            staked Creature Racer NFTs or any other digital assets such as rNFT will
                            provide revenue and that their creators and owners will not lose money.
                        </Styled.Row>
                        <Styled.Row>
                            <Typography variant="body1" weight="bold">
                                C.
                            </Typography>{' '}
                            You are solely responsible for determining what, if any, taxes apply to
                            your Creatures-related transactions. Wannabe PSA as creator of game:
                            Creature Racer Race & Earn, is not responsible for determining the taxes
                            that apply to your transactions on the App, the Site, or the Smart
                            Contracts.
                        </Styled.Row>
                        <Styled.Row>
                            <Typography variant="body1" weight="bold">
                                D.
                            </Typography>{' '}
                            There are risks associated with using an Internet-based currency,
                            including, but not limited to, the risk of hardware, software and
                            Internet connections, the risk of malicious software introduction, and
                            the risk that third parties may obtain unauthorized access to
                            information stored within your wallet. You accept and acknowledge that
                            Wannabe PSA as creator of game: Creature Racer Race & Earn, will not be
                            responsible for any communication failures, disruptions, errors,
                            distortions or delays you may experience when using the Stacks network
                            and Stacks Subnets however caused.
                        </Styled.Row>
                        <Styled.Row>
                            <Typography variant="body1" weight="bold">
                                E.
                            </Typography>{' '}
                            A lack of use or public interest in the creation and development of
                            distributed ecosystems could negatively impact the development of the
                            Creature Racer Race & Earn ecosystem, and therefore the potential
                            utility or value of Creatures.
                        </Styled.Row>
                        <Styled.Row>
                            <Typography variant="body1" weight="bold">
                                F.
                            </Typography>{' '}
                            The regulatory regime governing blockchain technologies,
                            cryptocurrencies, and tokens is uncertain, and new regulations or
                            policies may materially adversely affect the development of the Creature
                            Racer Race & Earn ecosystem, and therefore the potential utility or
                            value of Creature NFTs.
                        </Styled.Row>
                        <Typography variant="h6" weight="bold">
                            2. TERMINATION:
                        </Typography>
                        <Styled.Row>
                            <Typography variant="body1" weight="bold">
                                A.
                            </Typography>{' '}
                            Termination by Wannabe PSA
                            <br />
                            These Terms of Use remain in full force and effect while you use the
                            Site, the App and the Smart Contracts. WITHOUT LIMITING ANY OTHER
                            PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE
                            DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF
                            THE SITE, THE APP AND THE SMART CONTRACT (INCLUDING BLOCKING CERTAIN IP
                            ADDRESSES) TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING
                            WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR
                            COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR
                            REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE, THE
                            APP AND THE SMART CONTRACT OR DELETE YOUR ACCOUNT WITHOUT WARNING, IN
                            OUR SOLE DISCRETION. If we terminate or suspend your account for any
                            reason, you are prohibited from registering and creating a new account
                            under your name, a fake or a borrowed name, or the name of any third
                            party, even if you may be acting on behalf of the third party. In
                            addition to terminating and suspending your account, we reserve the
                            right to take appropriate legal action, including without limitation
                            pursuing civil, criminal, and injunctive redress. Such termination
                            allows you to still own and resell your digital assets in the form of
                            NFTs and rNFTs as the Smart Contracts are autonomously run on the Stacks
                            Network and Stacks Subnets and Wannabe PSA cannot interfere with your
                            digital assets held in your wallet such as Hiro Wallet or Xverse.
                        </Styled.Row>
                        <Styled.Row>
                            <Typography variant="body1" weight="bold">
                                B.
                            </Typography>{' '}
                            Termination by User
                            <br />
                            You are entitled to terminate these Terms of Use as a legally binding
                            agreement at any time and for any reason with effect for the future.
                            Such termination does not affect the obligations that have accrued
                            before the termination. Due to the fact that (i) the Smart Contracts are
                            autonomously run on the Stacks Network and Stacks Subnets and Wannabe
                            PSA cannot interfere with your digital assets, concerns and delivery of
                            digital content that is not delivered on a physical carrier and (ii) you
                            agree to begin the performance of the service before the deadline for
                            withdrawal – you are not entitled to withdraw from the Agreement
                            according to the Polish Act on protection of consumer rights. Such
                            termination allows you to still own and resell your digital assets in
                            the form of NFTs and rNFTs as the Smart Contracts are autonomously run
                            on the Stacks Network and Stacks Subnets and Wannabe PSA cannot
                            interfere with your digital assets held in your wallet such as Hiro
                            Wallet or Xverse.
                        </Styled.Row>
                        <Styled.Row>
                            <Typography
                                variant="body2"
                                color={theme.color.whiteAlpha.a60}
                                weight={'light'}
                            >
                                * Read full Terms & Conditions
                            </Typography>
                        </Styled.Row>
                    </Styled.Scrollable>
                    <Typography variant="body1">
                        <Styled.Label isAvailableToAccept={isAvailableToAccept}>
                            <Styled.Checkbox
                                type="checkbox"
                                checked={accept}
                                onChange={handleChangeAccept}
                                disabled={!isAvailableToAccept}
                            />
                            I have read, I understand and I accept{' '}
                            <Styled.Link
                                href="https://www.creatureracer.com/terms-conditions/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Terms and Conditions
                            </Styled.Link>{' '}
                            and{' '}
                            <Styled.Link
                                href="https://www.creatureracer.com/privacy-policy/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Privacy Policy
                            </Styled.Link>
                        </Styled.Label>
                    </Typography>
                    <Styled.Actions>
                        <Button secondary label="Cancel" onClick={hide} />
                        <Button
                            primary
                            label="Lets race!"
                            onClick={handleAccept}
                            type="submit"
                            disabled={!accept}
                        />
                    </Styled.Actions>
                </Styled.Agreement>
            </form>
        </Modal>
    );
};
