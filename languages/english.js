const english = {
    login: {
        user: 'Username',
        password: 'Password',
        rememberUsername: 'Remember Me',
        login: 'Login',
        loginError:'Unrecognized Username or Password'
    },
    navigation: {
        dispatchTab: 'Dispatch',
        pickupTab: 'Pick-Up',
        deliveryTab: 'Delivery',
        settingsTab: 'Settings'
    },
    dispatch: {
        title: 'Dispatch',
        date: 'Date',
        vendorNumber: 'Vendor #',
        orderId: 'Order #',
        loading: 'We are getting your orders to deliver now!',
        noDispatches: 'You do not have any deliveries assigned to you at this moment.'
    },
    pickup: {
        title: 'Pick-Up',
        id: 'Item Id',
        qty: 'Qty',
        verifyItem: 'Verify Item',
        success: 'Item Matched Successfully!',
        failure: 'Item Not Matched...',
        scanItem: 'Scan Item QR Code',
        backToList: 'Back to item List',
        signatureButton: 'Vendor Signature'
    },
    delivery: {
        title: 'Delivery',
        signatureButton: 'Customer Signature'
    },
    settings: {
        title: 'Settings',
        languages: {
            english: 'English',
            spanish: 'Spanish'
        },
        logOut: 'Logout',
        privacyPolicy: 'Privacy Policy',
        chooseLanguage: 'Change Language'
    },
    common: {
        noOrderSelected: 'No order has been selected...'
    },
    signature: {
        title: 'Please Sign Below'
    }
};

export default english;