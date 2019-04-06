const prdConnection = 'https://checheritos.com/Kiosko.Services.Api/api';
const tstConnection = 'http://test.checheritos.com/Kiosko.Services.Api/api';
const tstServer = 'http://192.168.0.44/Kiosko.Services.Api/api';

const conn = {
    prd: prdConnection,
    tst: tstConnection,
    tstSrv: tstServer
};

export default conn.tstSrv;