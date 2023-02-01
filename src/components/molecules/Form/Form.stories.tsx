import { FieldError, useForm } from 'react-hook-form';
import { withDesign } from 'storybook-addon-designs';
import * as Yup from 'yup';

import { Button } from '@/components/atoms/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Form } from './';

export default {
    title: 'Molecules/Form',
    component: Form,
    decorators: [withDesign],
} as ComponentMeta<typeof Form>;

const formSchema = Yup.object().shape({
    nickname: Yup.string(),
    email: Yup.string().required('Confirm Password is required'),
    password: Yup.string()
        .required('Password is required')
        .min(4, 'Password length should be at least 4 characters'),
    passwordConfirm: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must and should match'),
});

const validationOpt = { resolver: yupResolver(formSchema) };

const Template: ComponentStory<typeof Form> = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm(validationOpt);

    const onSubmit = handleSubmit(() => {
        // const { email, password } = data;
    });

    return (
        <Form>
            <Form.Input control={control} name="nickname" type="text" placeholder="Nickname" />

            <Form.Input control={control} name="email" type="text" placeholder="E-mail" required />
            {errors.email && <Form.Error>{(errors.email as FieldError).message}</Form.Error>}

            <Form.Input
                control={control}
                name="password"
                type="password"
                placeholder="Password"
                required
            />
            {errors.password && <Form.Error>{(errors.password as FieldError).message}</Form.Error>}

            <Form.Input
                control={control}
                name="passwordConfirm"
                type="password"
                placeholder="Confirm Password"
                required
            />
            {errors.passwordConfirm && (
                <Form.Error>{(errors.passwordConfirm as FieldError).message}</Form.Error>
            )}

            <Button secondary label="Submit" onClick={onSubmit} />
        </Form>
    );
};

export const Default = Template.bind({});
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/7bRDTsHtoGnWYMPIS40BN6/CreatureRacer?node-id=105%3A624',
    },
};
