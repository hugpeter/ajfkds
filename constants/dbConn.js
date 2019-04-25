const prdConnection = 'http://192.168.111.64/Kiosco.Services.Api/api';
const tstConnection = 'https://test.checheritos.com/Kiosko.Services.Api/api';
const tstServer = 'https://4192.168.0.4/Kiosko.Services.Api/api';

const conn = {
    prd: prdConnection,
    tst: tstConnection,
    tstSrv: tstServer
};

export default conn.prd;