import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useEffect } from 'react'
import { createOrder } from '../../apis/order'

const style = { layout: 'vertical' }

const ButtonWrapper = ({ showSpinner, currency, amount, orderData }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: { ...options, currency }
        })
    }, [currency])

    return (
        <>
            {isPending ? <div className='spinner' /> : null}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [{ amount: { currency_code: currency, value: amount } }]
                        })
                        .then((orderId) => orderId)
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(async (res) => {
                        if (res.status === 'COMPLETED') {
                            console.log('check res:', res)
                            const resCreate = await createOrder({ ...orderData, dateOfPayment: res.update_time })
                            console.log(resCreate)
                        }
                    })
                }}
            />
        </>
    )
}

export default function Paypal({ amount, orderData }) {
    return (
        <div className='min-w-[400px] min-h-[200px]'>
            <PayPalScriptProvider options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}>
                <ButtonWrapper showSpinner={false} amount={amount} currency={'USD'} orderData={orderData} />
            </PayPalScriptProvider>
        </div>
    )
}
