import daum from 'daum'

var Consts = {
    //MODE:   'APP',
    MODE:   'WEB',
    INSERT: 'INSERT',
    UPDATE: 'UPDATE',
    DAUM_API_KEY: '743cebea4a3a6adfb3f4a0ed4ada5eb7', // KOSIROCK
    DAUM_SERVER_URL: 'https://apis.daum.net',
    //SERVER_URL: 'http://1.234.82.105' // 운영서버
    //SERVER_URL: 'http://192.168.2.23'
    SERVER_URL: 'http://192.168.0.9'
    //SERVER_URL: 'http://192.168.0.18'
};

var accToken    = "";
var reqToken    = "";

var clientId    = "d3719415413bf92fc1c7d42bceb3dff4"; //Kakao REST API key
var redirectUri = "http://kosirock1.cafe24.com/oauth/kakao/callback"; //http://localhost/oauth/kakao/callback";


var bizId     = 'daoutest6';
var monthDay  = getMonthDay();
var secureKey = '063fa69f6169ed55111d4dc59f984cbe332e272cfc1dd4f593dd2eab3a3068f4';

String.prototype.trim = function() { return this.replace(/(^\s*)|(\s*$)/gi, ""); }

function getServerUrl() {
    return Consts.MODE === 'APP' ? Consts.SERVER_URL : '';
}

function getDaumServerUrl() {
    return Consts.DAUM_SERVER_URL;
}

export const getDistanceFromLatLonInKm = (lat1,lng1,lat2,lng2) => {
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lng2-lng1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

export const getDiameter = (distance, isShowClusterList, height, width) => {
    let newHeight;
    if(!isShowClusterList) {
        newHeight = height-53-52;
    } else {
        newHeight = height-53-52-240;
    }
    const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(newHeight, 2));
    return Math.floor(distance*width/diagonal*1000); // m
}


function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();
    if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

function getMonthDay() {
    var d = new Date();
    var s =
        leadingZeros(d.getMonth() + 1, 2) +
        leadingZeros(d.getDate(), 2);
    return s;
}

function getCurrentDate() {
    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2);
    return s;
}

function getDate(date) {
    var s =
        leadingZeros(date.getFullYear(), 4) + '-' +
        leadingZeros(date.getMonth() + 1, 2) + '-' +
        leadingZeros(date.getDate(), 2);
    return s;
}

function getCurrentTimestamp() {
    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2) + ' ' +
        leadingZeros(d.getHours(), 2) + ':' +
        leadingZeros(d.getMinutes(), 2) + ':' +
        leadingZeros(d.getSeconds(), 2);
    return s;
}

function getTimestamp(date) {
    var s =
        leadingZeros(date.getFullYear(), 4) + '-' +
        leadingZeros(date.getMonth() + 1, 2) + '-' +
        leadingZeros(date.getDate(), 2) + ' ' +
        leadingZeros(date.getHours(), 2) + ':' +
        leadingZeros(date.getMinutes(), 2) + ':' +
        leadingZeros(date.getSeconds(), 2);
    return s;
}

var doPositionList = [
    { name: '서울특별시',  lat: 37.5564540 , lng: 127.0621130 },
    { name: '인천광역시',  lat: 37.3947280 , lng: 126.6752660 },
    { name: '경기도',  lat: 37.3892500 , lng: 127.4719210 },
    { name: '강원도',  lat: 37.7264630 , lng: 128.2760440 },
    { name: '충청북도',  lat: 36.8831320 , lng: 127.7024540 },
    { name: '세종특별자치시',  lat: 36.4800980 , lng: 127.2890350 },
    { name: '충청남도',  lat: 36.5504500 , lng: 126.7789500 },
    { name: '대전광역시',  lat: 36.3503820 , lng: 127.3847380 },
    { name: '경상북도',  lat: 36.4879500 , lng: 128.6747440 },
    { name: '전라북도',  lat: 35.7326390 , lng: 127.1423370 },
    { name: '대구광역시',  lat: 35.8672080 , lng: 128.6086080 },
    { name: '울산광역시',  lat: 35.5315100 , lng: 129.3644530 },
    { name: '경상남도',  lat: 35.4327590 , lng: 128.2469000 },
    { name: '부산광역시',  lat: 35.1718080 , lng: 129.0902060 },
    { name: '광주광역시',  lat: 35.1565270 , lng: 126.8527710 },
    { name: '전라남도',  lat: 34.9415470 , lng: 126.9883470 },
    { name: '제주도',  lat: 33.4079640 , lng: 126.5215950 },
];

export const customDoList = doPositionList.map(function(position, index){
    var content = '<div onclick="doClickDoOverlay('+index+')" class="overlay" '+
        //'style="width: 50px; height: 50px; border-radius: 25px; line-height: 51px; background-color: rgba(255,153,204, 0.8); border-color: rgba(166, 47, 92, 1.0); border-style: solid; border-width: 1px; font-weight: bold; font-size: 0.8em; text-align: center;">'+
        'style="width: 65px; height: 30px; border-radius: 8px; line-height: 31px; color: white; background-color: rgba(255, 153, 153, 0.8); border-color: rgba(255, 153, 153, 1.0); border-style: solid; border-width: 2px; font-weight: bold; font-size: 0.8em; text-align: center;">'+
        '<span style="text-decoration: none; color: #fff;">'+position.name+'</span>'+
        '</div>';

    var customOverlay = new daum.maps.CustomOverlay({
        position: new daum.maps.LatLng(position.lat, position.lng),
        content:  content
    });
    customOverlay.position = new daum.maps.LatLng(position.lat, position.lng);
    return customOverlay;
});


var cityPositionList = [
    { name: '강북구',  lat: 37.643416   , lng: 127.0112374  },
    { name: '강남구',  lat: 37.497654   , lng: 127.046795   },
    { name: '광진구',  lat: 37.545927   , lng: 127.086575   },
    { name: '강동구',  lat: 37.547053   , lng: 127.154992   },
    { name: '노원구',  lat: 37.655677   , lng: 127.070365   },
    { name: '강서구',  lat: 37.5655222 , lng: 126.8208219  },
    { name: '도봉구',  lat: 37.667089   , lng: 127.031649   },
    { name: '관악구',  lat: 37.474021   , lng: 126.944461   },
    { name: '동대문구', lat: 37.583224   , lng: 127.05236    },
    { name: '구로구',  lat: 37.496915   , lng: 126.885806   },
    { name: '마포구',  lat: 37.5588     , lng: 126.909762   },
    { name: '금천구',  lat: 37.465483   , lng: 126.902227   },
    { name: '서대문구', lat: 37.581167   , lng: 126.935317   },
    { name: '동작구',  lat: 37.498006   , lng: 126.930764   },
    { name: '성동구',  lat: 37.550952   , lng: 127.041232   },
    { name: '서초구',  lat: 37.47429     , lng: 127.006922  },
    { name: '성북구',  lat: 37.606199   , lng: 127.02766    },
    { name: '송파구',  lat: 37.502288   , lng: 127.098753   },
    { name: '은평구',  lat: 37.623202   , lng: 126.926009   },
    { name: '양천구',  lat: 37.520274   , lng: 126.856671   },
    { name: '종로구',  lat: 37.5941987 , lng: 126.9801843  },
    { name: '영등포구', lat: 37.517658   , lng: 126.910788   },
    { name: '용산구',  lat: 37.53052    , lng: 126.982926   },
    { name: '중구',   lat:  37.5553471 , lng:  126.9891209 },
    { name: '중랑구',  lat: 37.591341   , lng: 127.089261   },

    { name: '남구', lat: 35.1281530, lng: 129.0910790},
    { name: '금정구', lat: 35.2593970, lng: 129.0893810},
    { name: '서구', lat: 35.0951400, lng: 129.0191790},
    { name: '동구', lat: 35.1286550, lng: 129.0452510},
    { name: '연제구', lat: 35.1818340, lng: 129.0937240},
    { name: '북구', lat: 35.2351480, lng: 129.0216640},
    { name: '부산진구', lat: 35.1665930, lng: 129.0446060},
    { name: '사상구', lat: 35.1568760, lng: 128.9874600},
    { name: '중구', lat: 35.1064440, lng: 129.0307670},
    { name: '기장군', lat: 35.2435220, lng: 129.2229660},
    { name: '동래구', lat: 35.2041080, lng: 129.0795540},
    { name: '해운대구', lat: 35.1631600, lng: 129.1638520},
    { name: '사하구', lat: 35.0812790, lng: 128.9709290},
    { name: '영도구', lat: 35.0759730, lng: 129.0653990},
    { name: '수영구', lat: 35.159978 , lng: 129.114611},
    { name: '강서구', lat: 35.1481750, lng: 128.8774710},

    { name: '가평군', lat: 37.83154   , lng: 127.509883},
    { name: '고양시', lat: 37.65836   , lng: 126.83202},
    { name: '과천시', lat: 37.429246  , lng: 126.987445},
    { name: '광명시', lat: 37.478488  , lng: 126.864289},
    { name: '광주시', lat: 37.417141  , lng: 127.256141},
    { name: '구리시', lat: 37.594312  , lng: 127.129565},
    { name: '군포시', lat: 37.36167   , lng: 126.935174},
    { name: '김포시', lat: 37.615246  , lng: 126.715632},
    { name: '남양주시',lat: 37.636003  , lng: 127.216528},
    { name: '동두천시',lat: 37.903411  , lng: 127.060507},
    { name: '부천시', lat: 37.503414  , lng: 126.766031},
    { name: '성남시', lat: 37.444917  , lng: 127.138868},
    { name: '수원시', lat: 37.263573  , lng: 127.028601},
    { name: '시흥시', lat: 37.379888  , lng: 126.803103},
    { name: '안산시', lat: 37.321878  , lng: 126.830885},
    { name: '안성시', lat: 37.00797   , lng: 127.279679},
    { name: '안양시', lat: 37.394253  , lng: 126.956821},
    { name: '양주시', lat: 37.785288  , lng: 127.045845},
    { name: '양평군', lat: 37.49122   , lng: 127.487561},
    { name: '여주시', lat: 37.298024  , lng: 127.637163},
    { name: '연천군', lat: 38.096444  , lng: 127.074834},
    { name: '오산시', lat: 37.14981   , lng: 127.077221},
    { name: '용인시', lat: 37.241086  , lng: 127.177554},
    { name: '의왕시', lat: 37.344701  , lng: 126.96831},
    { name: '의정부시',lat: 37.738098  , lng: 127.033682},
    { name: '이천시', lat: 37.271995  , lng: 127.434822},
    { name: '파주시', lat: 37.759869  , lng: 126.780178},
    { name: '평택시', lat: 36.992108  , lng: 127.112945},
    { name: '포천시', lat: 37.894915  , lng: 127.200355},
    { name: '하남시', lat: 37.539265  , lng: 127.214892},
    { name: '화성시', lat: 37.199493  , lng: 126.831189},
];

export const customCityList = cityPositionList.map(function(position, index){
    var content = '<div onclick="doClickCityOverlay('+index+')" class="overlay" '+
        //'style="width: 50px; height: 50px; border-radius: 25px; line-height: 51px; background-color: rgba(255,153,204, 0.8); border-color: rgba(166, 47, 92, 1.0); border-style: solid; border-width: 1px; font-weight: bold; font-size: 0.8em; text-align: center;">'+
        'style="width: 65px; height: 30px; border-radius: 8px; line-height: 31px; color: white; background-color: rgba(255, 153, 153, 0.8); border-color: rgba(255, 153, 153, 1.0); border-style: solid; border-width: 2px; font-weight: bold; font-size: 0.8em; text-align: center;">'+
        '<span style="text-decoration: none; color: #fff;">'+position.name+'</span>'+
        '</div>';

    var customOverlay = new daum.maps.CustomOverlay({
        position: new daum.maps.LatLng(position.lat, position.lng),
        content:  content
    });
    customOverlay.position = new daum.maps.LatLng(position.lat, position.lng);
    return customOverlay;
});

function SHA256(s){

    var chrsz   = 8;
    var hexcase = 0;

    function safe_add (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

    function core_sha256 (m, l) {

        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
            0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
            0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
            0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
            0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
            0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
            0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
            0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
            0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
            0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
            0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);

        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for ( var i = 0; i<m.length; i+=16 ) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for ( var j = 0; j<64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    function str2binb (str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
        }
        return bin;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    function binb2hex (binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
                hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
        }
        return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));

}