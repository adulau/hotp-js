/*
  A simple Javascript HOTP implementation (HMAC-Based One-Time Password Algorithm) as described in RFC 4226. 
 
  The library is relying on crypto-js (http://code.google.com/p/crypto-js/) for the javascript HMAC-SHA1 implementation. 
 
  The library can be used to create software token (don't forget to protect the key of the token...).
 
  If you want to use the library, you'll need to load the crypto-js (sha1 and hmac) and  hotp.js.

  Calling the library is easy, you just have to set the hex key of the token, the counter plus the output format.

     otp = hotp("3132333435363738393031323334353637383930","4","dec6");

  Current output formats are : hex40 (format used by ootp, a free software library) and dec6 (the 6 decimal digit as described in the RFC 4226).

  A demo page with the test vector of the RFC 4226 : http://www.foo.be/hotp/example.html*

  http://www.gitorious.org/hotp-js/
  
  Copyright (C) 2009 Alexandre Dulaunoy

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/


function hotp(key, counter, format) {

    function hotp_hexkeytobytestream(s) {
        // s is the key to be converted in bytes
        var b = new Array();
        var last = s.length;
        for (var i = 0; i < last; i = i + 2) {
            var x = s[i] + s[i + 1];
            x.toUpperCase();
            x = "0x" + x;
            x = parseInt(x);
            b[i] = String.fromCharCode(x);
        }
        var ret = new String();
        ret = b.join('');
        return ret;

    }
    function hotp_movingfactortohex(count) {
        // count is the moving factor in OTP to be converted in bytes
        v = decimaltohex(count, 16);
        var decb = new Array();
        lhex = Crypto.util.hexToBytes(v);
        for (var i = 0; i < lhex.length; i++) {
            decb[i] = String.fromCharCode(lhex[i]);
        }
        var retval = new String();
        retval = decb.join('');
        return retval;
    }

    function decimaltohex(d, padding) {
        // d is the decimal value
        // padding is the padding to apply (O pad)
        var hex = Number(d).toString(16);
        padding = typeof(padding) === "undefined" || padding === null ? padding = 2 : padding;
        while (hex.length < padding) {
            hex = "0" + hex;
        }
        return hex;
    }

    function truncatedvalue(h, p) {
        // h is the hash value
        // p is precision
        offset = h[19] & 0xf;
        v = (h[offset] & 0x7f) << 24 | (h[offset + 1] & 0xff) << 16 | (h[offset + 2] & 0xff) << 8 | (h[offset + 3] & 0xff);
        v = "" + v;
        v = v.substr(v.length - p, p);
        return v;
    }

    var hmacBytes = Crypto.HMAC(Crypto.SHA1, Crypto.charenc.Binary.stringToBytes((hotp_movingfactortohex(counter))), Crypto.charenc.Binary.stringToBytes(hotp_hexkeytobytestream(key)));

    if (format == "hex40") {
        return hmacBytes.substring(0, 10);
    } else if (format == "dec6") {
        return truncatedvalue(Crypto.util.hexToBytes(hmacBytes), 6);
    }
    else {
        return "unknown format";
    }

}
