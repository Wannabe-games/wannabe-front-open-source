import type { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import { Button } from '@/components/atoms/Button';
import { ICON } from '@/components/atoms/Icon/Icon.types';
import { theme } from '@/theme/mainTheme';
import { CURRENCY } from '@/types/currency';

import { Menu } from './';
import { IMenu } from './Menu.types';

interface IMenuProps extends IMenu {
    isAuthenticated: boolean;
}

export default {
    title: 'Molecules/Menu',
    component: Menu,
    decorators: [withDesign],
} as Meta<IMenuProps>;

const Template: Story<IMenuProps> = ({ isAuthenticated }: IMenuProps) => {
    const goldAmount = 833;
    const [tetherAmount, stacksAmount] = ['2 903', '2 947'];

    return (
        <Menu>
            {isAuthenticated && (
                <>
                    <Menu.List>
                        <Menu.ListItem icon={ICON.DASHBOARD}>
                            <Menu.Link to="/">Dashboard</Menu.Link>
                        </Menu.ListItem>
                        <Menu.ListItem icon={ICON.USER}>
                            <Menu.Link to="/">Profile</Menu.Link>
                        </Menu.ListItem>
                    </Menu.List>

                    <Menu.GoldCoin amount={goldAmount} />

                    <Menu.WalletWrapper>
                        <Menu.Wallet>
                            ~{' '}
                            <Menu.WalletCurrency amount={tetherAmount} currency={CURRENCY.TETHER} />
                            <Menu.WalletCurrency amount={stacksAmount} currency={CURRENCY.STACKS} />
                        </Menu.Wallet>
                    </Menu.WalletWrapper>
                </>
            )}

            <Menu.List>
                {isAuthenticated ? (
                    <>
                        <Menu.ListItem>
                            <Button secondary label="Buy crypto" onClick={() => ({})} />
                        </Menu.ListItem>
                        <Menu.ListItem>
                            <Menu.Link to="/" color={theme.color.yellow}>
                                Logout
                            </Menu.Link>
                        </Menu.ListItem>
                    </>
                ) : (
                    <>
                        <Menu.ListItem>
                            <Menu.Link to="/">
                                <Button secondary label="Create an account" onClick={() => ({})} />
                            </Menu.Link>
                        </Menu.ListItem>
                    </>
                )}
            </Menu.List>
        </Menu>
    );
};

export const Default = Template.bind({});
Default.args = {
    isAuthenticated: true,
};
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=52%3A90',
    },
};
