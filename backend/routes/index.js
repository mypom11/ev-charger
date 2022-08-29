var express = require('express');
var request = require('request');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));;
});

const serviceKey = 'QYwPNLotcWZeUag7UKaeq%2FbLIfqxjjm6M5q%2B9CWvi44h3l6DwPtMHqpaiUE3IlbxUl%2B7T8%2FHC9OlI4mmprCMlg%3D%3D'
var url = 'http://apis.data.go.kr/B552584/EvCharger/getChargerInfo';
// function makeQuery(pageNo, numOfRows, zcode){
//     queryParams = `?${encodeURIComponent('serviceKey')}=${serviceKey}&${encodeURIComponent('pageNo')}=${encodeURIComponent(pageNo)}&${encodeURIComponent('numOfRows')}=${encodeURIComponent(numOfRows)}&${encodeURIComponent('zcode')}=${encodeURIComponent(zcode)}&${encodeURIComponent('dataType')}=${encodeURIComponent('JSON')}`
// }

function makeQuery(pageNo, numOfRows, zcode){
    return `?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&zcode=${zcode}&dataType=JSON`
}


//client 호출 url
router.get('/api/getChargerInfo', function(req, res, next) {
    let { pageNo, numOfRows, zcode } = req.query
    let queryParams = makeQuery(pageNo, numOfRows, zcode)
    //공공데이터 호출
    request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        // console.log('Status', response.statusCode);
        // console.log('Headers', JSON.stringify(response.headers));
        // const test = JSON.parse(body)
        // console.log('Reponse received', test);

        res.send(body)
    });
  });


module.exports = router;
