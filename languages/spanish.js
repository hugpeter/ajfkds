const spanish = {
    login: {
        user: 'Usuario',
        password: 'Contraseña',
        rememberUsername: 'Recuérdame',
        login: 'Iniciar Sesión',
        loginError:'Nombre de usuario o contraseña no reconocidos.'
    },
    navigation: {
        dispatchTab: 'Envío',
        pickupTab: 'Recoger',
        deliveryTab: 'Entrega',
        settingsTab: 'Ajustes'
    },
    dispatch: {
        title: 'Envío',
        date: 'Fecha',
        vendorNumber: 'Vendedor #',
        orderId: 'Orden #',
        loading: 'Estamos recibiendo sus pedidos para entregar ahora!',
        noDispatches: 'No tiene ninguna entrega asignada a usted en este momento.'
    },
    pickup: {
        title: 'Recoger',
        id: 'Item Id',
        qty: 'Cant.',
        verifyItem: 'Verificar Artículo',
        success: '¡El artículo emparejó con éxito!',
        failure: 'Artículo no coincidente...',
        scanItem: 'Código QR del artículo de escaneo',
        backToList: 'Regreso',
        signatureButton: 'Firma del Vendedor'
    },
    delivery: {
        title: 'Entrega',
        signatureButton: 'Firma del Cliente'
    },
    settings: {
        title: 'Ajustes',
        languages: {
            english: 'Inglés',
            spanish: 'Español'
        },
        logOut: 'Cerrar Sesión',
        privacyPolicy: 'Política de Privacidad',
        chooseLanguage: 'Cambiar Idioma'
    },
    common: {
        noOrderSelected: 'No se ha seleccionado ningún pedido...'
    },
    signature: {
        title: 'Por favor firme abajo'
    }
};

export default spanish;