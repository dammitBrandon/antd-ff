import React, {useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';
import {Row, Col, Button, Form, Form as AForm, Radio, Input, Switch, Typography, Divider} from 'antd';
import { FormSpy, Field as FField, Form as FForm, useForm } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import {AntForm, composeValidators, email, required} from './AntForm';
import {useSelector} from "react-redux";

const RadioControlInputAdapter = ({ name, input, label, style, disabled = false, meta, prices, ...props }, ) => {
    const { change } = useForm();

    return (
        <>
            <Radio.Group name={name} {...props} onChange={(event) => {
                console.log('RadioControl testing, event', event);
            }}>
                {prices?.length > 0 && prices?.map((price, index) => (
                    <Radio
                        key={`${price.id}-${index}`}
                        value={price.id}
                        disabled={meta.submitting}
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            change('productId', price.product.id);
                            change('priceId', price.id);
                        }}

                    >
                        Product Name: {price?.product?.name?.toUpperCase()} <br/>
                        Interval: {price?.recurring.interval?.toUpperCase()} <br/>
                        Product ID: {price?.product?.id} <br/>
                        Price ID: {price?.id} <br/>

                    </Radio>
                ))}
            </Radio.Group>
        </>
    );
};

export const capitalize = value => {
    if (typeof value !== 'string') return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
};

const PRICES = [
    {
        "id": "price_1QvgprFSbJleY6EsJv04oWNm",
        "active": true,
        "currency": "usd",
        "amount": 48000,
        "product": {
            "id": "prod_RpLWz6JsavZmLl",
            "active": true,
            "description": "TutorD Basic product plan. Single seater organization plan 1 educator who can manage up to 150 active learners.",
            "statement_descriptor": null,
            "name": "Basic"
        },
        "lookup_key": "tutord-basic_annual_price",
        "recurring": {
            "aggregate_usage": null,
            "interval": "year",
            "interval_count": 1,
            "meter": null,
            "trial_period_days": null,
            "usage_type": "licensed"
        }
    },
    {
        "id": "price_1QvgprFSbJleY6EsFtVoJvUh",
        "active": true,
        "currency": "usd",
        "amount": 5500,
        "product": {
            "id": "prod_RpLWz6JsavZmLl",
            "active": true,
            "description": "TutorD Basic product plan. Single seater organization plan 1 educator who can manage up to 150 active learners.",
            "statement_descriptor": null,
            "name": "Basic"
        },
        "lookup_key": "tutord-basic_monthly_price",
        "recurring": {
            "aggregate_usage": null,
            "interval": "month",
            "interval_count": 1,
            "meter": null,
            "trial_period_days": null,
            "usage_type": "licensed"
        }
    },
    {
        "id": "price_1QvgoYFSbJleY6EsawfkuuxB",
        "active": true,
        "currency": "usd",
        "amount": 126000,
        "product": {
            "id": "prod_RpLVuUpnAlO7dW",
            "active": true,
            "description": "TutorD Team Plus product plan. Unlimited Teachers and Admins, organization plan, manage up to 1k active students with unlimited messages.",
            "statement_descriptor": null,
            "name": "Team Plus"
        },
        "lookup_key": "tutord-team_plus_annual_price",
        "recurring": {
            "aggregate_usage": null,
            "interval": "year",
            "interval_count": 1,
            "meter": null,
            "trial_period_days": null,
            "usage_type": "licensed"
        }
    },
    {
        "id": "price_1QvgoYFSbJleY6EsLL7HlrFj",
        "active": true,
        "currency": "usd",
        "amount": 15000,
        "product": {
            "id": "prod_RpLVuUpnAlO7dW",
            "active": true,
            "description": "TutorD Team Plus product plan. Unlimited Teachers and Admins, organization plan, manage up to 1k active students with unlimited messages.",
            "statement_descriptor": null,
            "name": "Team Plus"
        },
        "lookup_key": "tutord-team_plus_monthly_price",
        "recurring": {
            "aggregate_usage": null,
            "interval": "month",
            "interval_count": 1,
            "meter": null,
            "trial_period_days": null,
            "usage_type": "licensed"
        }
    }
];

const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

const Title = styled(Typography.Title)`
  color: ${props => { return props.theme.white; }};
  font-weight: bolder;
  font-family: Montserrat;
  margin: 0;
  font-size: 6em;
`;

export const StyledSwitchInput = styled(Switch)`

  &.ant-switch-checked {
    background-color: #8053d7;
  }
`;

export const RoundedContainer = styled(Col)`
  /* height: clamp(10rem, 18rem, 24rem); */
  background: #fff;
  background-size: 100% 100%;
  text-align: center;
  /* height: 35rem; */
  border-radius: 8px;
  padding: 40px;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.2)
  );
  backdrop-filter: blur(2em);
  display: flex;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

export const StyledTitle = ({ level, children }) => (
    <Title level={level}>
        {children}
    </Title>
);

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))

};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const SelectPlanForm = () => {
    const [isMonth, setIsMonth] = useState(true);
    const handlePlanChange = useCallback((value) => setIsMonth(value), []);
    const productPricesContainerColors = useMemo(
        () => (isMonth ? ['#8053d7', 'darkorange'] : ['#AA82F6', '#d7753e']),
        [isMonth]
    );

    const monthlyPrices = useMemo(
        () => PRICES?.filter((price) => price?.recurring?.interval === 'month'),
        [PRICES]
    );

    const annualPrices = useMemo(
        () => PRICES?.filter((price) => price?.recurring?.interval === 'year'),
        [PRICES]
    );

    const prices = useMemo(() => {
        if (isMonth) {
            return monthlyPrices;
        }

        return annualPrices;
    }, [annualPrices, isMonth, monthlyPrices]);

    return (
        <CenteredContainer>
            SelectPlanForm
            <FForm
                name='select-product-plan-form'
                style={{ textAlign: 'center' }}
                onSubmit={onSubmit}
                initialValues={{
                    productId: '',
                    productName: '',
                    priceId: '',
                    sponsorshipProviderOptIn: false,
                    productPlan: ''
                }}
                render={({
                             pristine,
                             submitError,
                             handleSubmit,
                             submitting,
                             hasValidationErrors,
                             hasSubmitErrors,
                             dirtySinceLastSubmit,
                             values,
                             ...rest
                }) => {

                    return (
                        <AForm onFinish={handleSubmit}>
                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} justify='center'>
                                <Col>Choose A Plan</Col>
                            </Row>
                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} justify='center'
                                 style={{textAlign: 'center'}}>
                                <StyledTitle>Pick a plan for your organization</StyledTitle>
                            </Row>
                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} justify='center'>
                                <Col>
                                    <StyledSwitchInput
                                        onChange={handlePlanChange}
                                        style={{display: 'block', marginBottom: '20px'}}
                                        checkedChildren='Month'
                                        unCheckedChildren='Annual'
                                        defaultChecked
                                        checked={isMonth}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} justify='center' style={{textAlign: 'center'}}>
                                <Col>
                                    <FField
                                        name='productId'
                                        type='radio'
                                        parse={value => value}
                                        format={capitalize}
                                        component={RadioControlInputAdapter}
                                        prices={prices}
                                    />
                                </Col>
                            </Row>
                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                        </AForm>
                    )}}
            />
        </CenteredContainer>
    )};