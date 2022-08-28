var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var url = 'http://apis.data.go.kr/B552584/EvCharger/getChargerInfo';
let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'QYwPNLotcWZeUag7UKaeq%2FbLIfqxjjm6M5q%2B9CWvi44h3l6DwPtMHqpaiUE3IlbxUl%2B7T8%2FHC9OlI4mmprCMlg%3D%3D'; /* Service Key*/


//client 호출 url
router.get('/api/getChargerInfo', function(req, res, next) {
    let { pageNo, numOfRows, zcode } = req.query
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(`${pageNo}`); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(`${numOfRows}`); /* */
    queryParams += '&' + encodeURIComponent('zcode') + '=' + encodeURIComponent(`${zcode}`); /* */
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* */

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
