import React, {useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';
import {Row, Col, Button, Form, Form as AForm, Radio, Input, Switch, Typography, Divider} from 'antd';
import { FormSpy, Field as FField, Form as FForm, useForm } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import {AntForm, composeValidators, email, required} from './AntForm';
import {useSelector} from "react-redux";

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

export const RadioControl = ({
                                 name,
                                 input,
                                 disabled = false,
                                 meta: {
                                     error,
                                     submitError,
                                     touched,
                                     pristine,
                                     dirtySinceLastSubmit,
                                     submitting,
                                     ...meta
                                 },
                                 ...rest
                             }) => (
    <AForm.Item
        hasFeedback
        validateStatus={(error || submitError) && touched ? 'error' : ''}
        help={
            (error || submitError) &&
            touched && <span className='error'>{error || submitError}</span>
        }
    >
        <Radio.Group>
            {rest && rest.icon}
        </Radio.Group>
        {/*<pre>{JSON.stringify(meta, 0, 2)}</pre>*/}
    </AForm.Item>
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
                render={(props) => {
                    console.log('SelectPlanForm, props: ', props);

                    return (
                        <AForm onFinish={props.handleSubmit}>
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
                                        component={RadioControl}
                                        type='radio'
                                        parse={value => value}
                                        format={capitalize}
                                    >
                                        {({ name, input, disabled = false, meta: { error, submitError, touched, pristine, dirtySinceLastSubmit, submitting, ...meta }, ...rest }) => (
                                            <>
                                                <Radio.Group>
                                                    {prices?.length > 0 && prices?.map((price, index) => (
                                                        <RoundedContainer
                                                            key={index}
                                                            className={`hvr-float-shadow ${props.values.productPlan === price?.product?.id ? 'hvr-float-shadow-selected' : ''}`}
                                                            xl={5}
                                                            md={12}
                                                            sm={16}
                                                            xs={24}
                                                            style={{
                                                                float: 'left',
                                                                minWidth: '260px',
                                                                borderTop: `12px solid ${productPricesContainerColors[index]}`,
                                                                minHeight: '420px',
                                                                marginRight: `${index !== 0 ? 0 : 24}px`,
                                                                marginBottom: '2em'
                                                            }}
                                                        >
                                                            <Radio {...input} {...rest} value={price.product.id} disabled={submitting} key={price.id}>
                                                                <Row justify='start' style={{ textAlign: 'left', marginBottom: '.5em' }}>
                                                                    {/* PACKAGE TITLE */}
                                                                    <Col span={24}>
                                                                    <span style={{ borderBottom: `3px solid ${productPricesContainerColors[index]}` }}>
                                                                        {price?.product?.name?.toUpperCase()}
                                                                    </span>
                                                                    </Col>
                                                                </Row>
                                                                {/* MONTHLY PRICING */}
                                                                <Row justify='start' style={{ textAlign: 'left' }}>
                                                                    <Col span={24}>
                                                                        <StyledTitle level={4}>
                                                                            &#36;
                                                                            {isMonth
                                                                                ? `${price?.amount / 100}`
                                                                                : `${price?.amount / 12 / 100}`}
                                                                            /month
                                                                        </StyledTitle>
                                                                    </Col>
                                                                </Row>
                                                                <br />
                                                                <Row>
                                                                    <Col>
                                                                        Placeholder
                                                                    </Col>
                                                                    <Divider style={{ color: '#626266' }} />
                                                                    <Row justify='start' style={{ textAlign: 'left' }}>
                                                                        <Col span={24}>
                                                                            <ul>
                                                                                <li>
                                                                                <span style={{ fontWeight: 'bold', fontSize: 16 }}>
                                                                                    Includes
                                                                                </span>
                                                                                </li>
                                                                                {price?.product?.description}
                                                                            </ul>
                                                                        </Col>
                                                                    </Row>
                                                                </Row>
                                                            </Radio>
                                                        </RoundedContainer>
                                                    ))}
                                                </Radio.Group>
                                            </>
                                        )}
                                    </FField>
                                </Col>
                            </Row>
                            <pre>{JSON.stringify(props.values, 0, 2)}</pre>
                        </AForm>
                    )}}
            />
        </CenteredContainer>
    )};