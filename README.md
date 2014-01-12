hotp-js - A simple JavaScript HOTP implementation
=================================================

A simple JavaScript HOTP implementation (HMAC-Based One-Time Password Algorithm) as described in [RFC4226](http://tools.ietf.org/html/rfc4226). The library is relying on [crypto-js](http://code.google.com/p/crypto-js/) for the javascript HMAC-SHA1 implementation.

How to use it
-------------

Load the htop.js, set the private key of the token and the count step.

```javascript
otp = hotp("3132333435363738393031323334353637383930","4","dec6");
```

The following output formats are supported:

* hex40 - truncated 10 bytes hexadecimal representation
* dec6  - truncated 6 bytes decimal representation (HOTP)
* dec7  - truncated 7 bytes decimal representation
* dec8  - truncated 8 bytes decimal representation

Security recommendations
------------------------

* Don't forget to protect the key of the token along with the count value (e.g. local encryption of the software token).
* Code is experimental.

License
-------

```
Copyright (C) 2009 Alexandre Dulaunoy

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

```

