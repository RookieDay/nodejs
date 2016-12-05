{
  "source": "https://nodejs.org/dist/latest-v5.x/docs/api/doc/api/tls.md",
  "modules": [
    {
      "textRaw": "TLS (SSL)",
      "name": "tls_(ssl)",
      "stability": 2,
      "stabilityText": "Stable",
      "desc": "<p>Use <code>require(&#39;tls&#39;)</code> to access this module.\n\n</p>\n<p>The <code>tls</code> module uses OpenSSL to provide Transport Layer Security and/or\nSecure Socket Layer: encrypted stream communication.\n\n</p>\n<p>TLS/SSL is a public/private key infrastructure. Each client and each\nserver must have a private key. A private key is created like this:\n\n</p>\n<pre><code>openssl genrsa -out ryans-key.pem 2048</code></pre>\n<p>All servers and some clients need to have a certificate. Certificates are public\nkeys signed by a Certificate Authority or self-signed. The first step to\ngetting a certificate is to create a &quot;Certificate Signing Request&quot; (CSR)\nfile. This is done with:\n\n</p>\n<pre><code>openssl req -new -sha256 -key ryans-key.pem -out ryans-csr.pem</code></pre>\n<p>To create a self-signed certificate with the CSR, do this:\n\n</p>\n<pre><code>openssl x509 -req -in ryans-csr.pem -signkey ryans-key.pem -out ryans-cert.pem</code></pre>\n<p>Alternatively you can send the CSR to a Certificate Authority for signing.\n\n</p>\n<p>For Perfect Forward Secrecy, it is required to generate Diffie-Hellman\nparameters:\n\n</p>\n<pre><code>openssl dhparam -outform PEM -out dhparam.pem 2048</code></pre>\n<p>To create a .pfx or .p12, do this:\n\n</p>\n<pre><code>openssl pkcs12 -export -in agent5-cert.pem -inkey agent5-key.pem \\\n      -certfile ca-cert.pem -out agent5.pfx</code></pre>\n<ul>\n<li><code>in</code>:  certificate</li>\n<li><code>inkey</code>: private key</li>\n<li><code>certfile</code>: all CA certs concatenated in one file like\n<code>cat ca1-cert.pem ca2-cert.pem &gt; ca-cert.pem</code></li>\n</ul>\n",
      "miscs": [
        {
          "textRaw": "ALPN, NPN and SNI",
          "name": "ALPN, NPN and SNI",
          "type": "misc",
          "desc": "<p>ALPN (Application-Layer Protocol Negotiation Extension), NPN (Next\nProtocol Negotiation) and, SNI (Server Name Indication) are TLS\nhandshake extensions:\n\n</p>\n<ul>\n<li>ALPN/NPN - Allows the use of one TLS server for multiple protocols (HTTP,\nSPDY, HTTP/2)</li>\n<li>SNI - Allows the use of one TLS server for multiple hostnames with different\nSSL certificates.</li>\n</ul>\n"
        },
        {
          "textRaw": "Client-initiated renegotiation attack mitigation",
          "name": "Client-initiated renegotiation attack mitigation",
          "type": "misc",
          "desc": "<p>The TLS protocol lets the client renegotiate certain aspects of the TLS session.\nUnfortunately, session renegotiation requires a disproportionate amount of\nserver-side resources, which makes it a potential vector for denial-of-service\nattacks.\n\n</p>\n<p>To mitigate this, renegotiation is limited to three times every 10 minutes. An\nerror is emitted on the [<code>tls.TLSSocket</code>][] instance when the threshold is\nexceeded. These limits are configurable:\n\n</p>\n<ul>\n<li><p><code>tls.CLIENT_RENEG_LIMIT</code>: renegotiation limit, default is 3.</p>\n</li>\n<li><p><code>tls.CLIENT_RENEG_WINDOW</code>: renegotiation window in seconds, default is\n10 minutes.</p>\n</li>\n</ul>\n<p>Do not change the defaults without a full understanding of the implications.\n\n</p>\n<p>To test the server, connect to it with <code>openssl s_client -connect address:port</code>\nand tap <code>R&lt;CR&gt;</code> (i.e., the letter <code>R</code> followed by a carriage return) a few\ntimes.\n\n</p>\n"
        },
        {
          "textRaw": "Perfect Forward Secrecy",
          "name": "Perfect Forward Secrecy",
          "type": "misc",
          "desc": "<p>The term &quot;[Forward Secrecy]&quot; or &quot;Perfect Forward Secrecy&quot; describes a feature of\nkey-agreement (i.e., key-exchange) methods. Practically it means that even if\nthe private key of a server is compromised, communication can only be\ndecrypted by eavesdroppers if they manage to obtain the key-pair specifically\ngenerated for each session.\n\n</p>\n<p>This is achieved by randomly generating a key pair for key-agreement on every\nhandshake (in contrast to using the same key for all sessions). Methods\nimplementing this technique, thus offering Perfect Forward Secrecy, are\ncalled &quot;ephemeral&quot;.\n\n</p>\n<p>Currently two methods are commonly used to achieve Perfect Forward Secrecy (note\nthe character &quot;E&quot; appended to the traditional abbreviations):\n\n</p>\n<ul>\n<li>[DHE] - An ephemeral version of the Diffie Hellman key-agreement protocol.</li>\n<li>[ECDHE] - An ephemeral version of the Elliptic Curve Diffie Hellman\nkey-agreement protocol.</li>\n</ul>\n<p>Ephemeral methods may have some performance drawbacks, because key generation\nis expensive.\n\n</p>\n"
        }
      ],
      "modules": [
        {
          "textRaw": "Modifying the Default TLS Cipher suite",
          "name": "modifying_the_default_tls_cipher_suite",
          "desc": "<p>Node.js is built with a default suite of enabled and disabled TLS ciphers.\nCurrently, the default cipher suite is:\n\n</p>\n<pre><code>ECDHE-RSA-AES128-GCM-SHA256:\nECDHE-ECDSA-AES128-GCM-SHA256:\nECDHE-RSA-AES256-GCM-SHA384:\nECDHE-ECDSA-AES256-GCM-SHA384:\nDHE-RSA-AES128-GCM-SHA256:\nECDHE-RSA-AES128-SHA256:\nDHE-RSA-AES128-SHA256:\nECDHE-RSA-AES256-SHA384:\nDHE-RSA-AES256-SHA384:\nECDHE-RSA-AES256-SHA256:\nDHE-RSA-AES256-SHA256:\nHIGH:\n!aNULL:\n!eNULL:\n!EXPORT:\n!DES:\n!RC4:\n!MD5:\n!PSK:\n!SRP:\n!CAMELLIA</code></pre>\n<p>This default can be overriden entirely using the <code>--tls-cipher-list</code> command\nline switch. For instance, the following makes\n<code>ECDHE-RSA-AES128-GCM-SHA256:!RC4</code> the default TLS cipher suite:\n\n</p>\n<pre><code>node --tls-cipher-list=&quot;ECDHE-RSA-AES128-GCM-SHA256:!RC4&quot;</code></pre>\n<p>Note that the default cipher suite included within Node.js has been carefully\nselected to reflect current security best practices and risk mitigation.\nChanging the default cipher suite can have a significant impact on the security\nof an application. The <code>--tls-cipher-list</code> switch should by used only if\nabsolutely necessary.\n\n</p>\n",
          "type": "module",
          "displayName": "Modifying the Default TLS Cipher suite"
        }
      ],
      "classes": [
        {
          "textRaw": "Class: CryptoStream",
          "type": "class",
          "name": "CryptoStream",
          "stability": 0,
          "stabilityText": "Deprecated: Use [`tls.TLSSocket`][] instead.",
          "desc": "<p>This is an encrypted stream.\n\n</p>\n",
          "properties": [
            {
              "textRaw": "cryptoStream.bytesWritten",
              "name": "bytesWritten",
              "desc": "<p>A proxy to the underlying socket&#39;s bytesWritten accessor, this will return\nthe total bytes written to the socket, <em>including the TLS overhead</em>.\n\n</p>\n"
            }
          ]
        },
        {
          "textRaw": "Class: SecurePair",
          "type": "class",
          "name": "SecurePair",
          "desc": "<p>Returned by tls.createSecurePair.\n\n</p>\n",
          "events": [
            {
              "textRaw": "Event: 'secure'",
              "type": "event",
              "name": "secure",
              "desc": "<p>This event is emitted from the SecurePair once the pair has successfully\nestablished a secure connection.\n\n</p>\n<p>As with checking for the server <a href=\"#tls_event_secureconnection\"><code>secureConnection</code></a>\nevent, <code>pair.cleartext.authorized</code> should be inspected to confirm whether the\ncertificate used is properly authorized.\n\n</p>\n",
              "params": []
            }
          ]
        },
        {
          "textRaw": "Class: tls.Server",
          "type": "class",
          "name": "tls.Server",
          "desc": "<p>This class is a subclass of <code>net.Server</code> and has the same methods on it.\nInstead of accepting only raw TCP connections, this accepts encrypted\nconnections using TLS or SSL.\n\n</p>\n",
          "events": [
            {
              "textRaw": "Event: 'clientError'",
              "type": "event",
              "name": "clientError",
              "desc": "<p><code>function (exception, tlsSocket) { }</code>\n\n</p>\n<p>When a client connection emits an <code>&#39;error&#39;</code> event before a secure connection is\nestablished it will be forwarded here.\n\n</p>\n<p><code>tlsSocket</code> is the [<code>tls.TLSSocket</code>][] that the error originated from.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'newSession'",
              "type": "event",
              "name": "newSession",
              "desc": "<p><code>function (sessionId, sessionData, callback) { }</code>\n\n</p>\n<p>Emitted on creation of a TLS session. May be used to store sessions in external\nstorage. <code>callback</code> must be invoked eventually, otherwise no data will be\nsent or received from the secure connection.\n\n</p>\n<p>NOTE: adding this event listener will only have an effect on connections\nestablished after the addition of the event listener.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'OCSPRequest'",
              "type": "event",
              "name": "OCSPRequest",
              "desc": "<p><code>function (certificate, issuer, callback) { }</code>\n\n</p>\n<p>Emitted when the client sends a certificate status request. The server&#39;s\ncurrent certificate can be parsed to obtain the OCSP URL and certificate ID;\nafter obtaining an OCSP response <code>callback(null, resp)</code> is then invoked, where\n<code>resp</code> is a <code>Buffer</code> instance. Both <code>certificate</code> and <code>issuer</code> are <code>Buffer</code>\nDER-representations of the primary and issuer&#39;s certificates. They can be used\nto obtain the OCSP certificate ID and OCSP endpoint URL.\n\n</p>\n<p>Alternatively, <code>callback(null, null)</code> may be called, meaning that there was no\nOCSP response.\n\n</p>\n<p>Calling <code>callback(err)</code> will result in a <code>socket.destroy(err)</code> call.\n\n</p>\n<p>Typical flow:\n\n</p>\n<ol>\n<li>Client connects to the server and sends an <code>&#39;OCSPRequest&#39;</code> to it (via status\ninfo extension in ClientHello).</li>\n<li>Server receives the request and invokes the <code>&#39;OCSPRequest&#39;</code> event listener\nif present.</li>\n<li>Server extracts the OCSP URL from either the <code>certificate</code> or <code>issuer</code> and\nperforms an [OCSP request] to the CA.</li>\n<li>Server receives <code>OCSPResponse</code> from the CA and sends it back to the client\nvia the <code>callback</code> argument</li>\n<li>Client validates the response and either destroys the socket or performs a\nhandshake.</li>\n</ol>\n<p>NOTE: <code>issuer</code> could be <code>null</code> if the certificate is self-signed or if the\nissuer is not in the root certificates list. (An issuer may be provided via the\n<code>ca</code> option.)\n\n</p>\n<p>NOTE: adding this event listener will only have an effect on connections\nestablished after the addition of the event listener.\n\n</p>\n<p>NOTE: An npm module like [asn1.js] may be used to parse the certificates.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'resumeSession'",
              "type": "event",
              "name": "resumeSession",
              "desc": "<p><code>function (sessionId, callback) { }</code>\n\n</p>\n<p>Emitted when the client wants to resume the previous TLS session. The event\nlistener may perform a lookup in external storage using the given <code>sessionId</code>\nand invoke <code>callback(null, sessionData)</code> once finished. If the session can&#39;t be\nresumed (i.e., doesn&#39;t exist in storage) one may call <code>callback(null, null)</code>.\nCalling <code>callback(err)</code> will terminate incoming connection and destroy the\nsocket.\n\n</p>\n<p>NOTE: adding this event listener will only have an effect on connections\nestablished after the addition of the event listener.\n\n</p>\n<p>Here&#39;s an example for using TLS session resumption:\n\n</p>\n<pre><code class=\"js\">var tlsSessionStore = {};\nserver.on(&#39;newSession&#39;, (id, data, cb) =&gt; {\n  tlsSessionStore[id.toString(&#39;hex&#39;)] = data;\n  cb();\n});\nserver.on(&#39;resumeSession&#39;, (id, cb) =&gt; {\n  cb(null, tlsSessionStore[id.toString(&#39;hex&#39;)] || null);\n});</code></pre>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'secureConnection'",
              "type": "event",
              "name": "secureConnection",
              "desc": "<p><code>function (tlsSocket) {}</code>\n\n</p>\n<p>This event is emitted after the handshaking process for a new connection has\nsuccessfully completed. The argument is an instance of [<code>tls.TLSSocket</code>][] and\nhas all the common stream methods and events.\n\n</p>\n<p><code>socket.authorized</code> is a boolean value which indicates if the\nclient has been verified by one of the supplied certificate authorities for the\nserver. If <code>socket.authorized</code> is false, then <code>socket.authorizationError</code> is\nset to describe how authorization failed. Implied but worth mentioning:\ndepending on the settings of the TLS server, unauthorized connections may\nbe accepted.\n\n</p>\n<p><code>socket.npnProtocol</code> is a string containing the selected NPN protocol\nand <code>socket.alpnProtocol</code> is a string containing the selected ALPN\nprotocol. When both NPN and ALPN extensions are received, ALPN takes\nprecedence over NPN and the next protocol is selected by ALPN. When\nALPN has no selected protocol, this returns false.\n\n</p>\n<p><code>socket.servername</code> is a string containing the server name requested with\nSNI.\n\n</p>\n",
              "params": []
            }
          ],
          "methods": [
            {
              "textRaw": "server.addContext(hostname, context)",
              "type": "method",
              "name": "addContext",
              "desc": "<p>Add secure context that will be used if the client request&#39;s SNI hostname\nmatches the supplied <code>hostname</code> (wildcards can be used). <code>context</code> can contain\n<code>key</code>, <code>cert</code>, <code>ca</code> or any other properties from\n[<code>tls.createSecureContext()</code>][] <code>options</code> argument.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "hostname"
                    },
                    {
                      "name": "context"
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "server.address()",
              "type": "method",
              "name": "address",
              "desc": "<p>Returns the bound address, the address family name, and port of the\nserver as reported by the operating system.  See [<code>net.Server.address()</code>][] for\nmore information.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "server.close([callback])",
              "type": "method",
              "name": "close",
              "desc": "<p>Stops the server from accepting new connections. This function is\nasynchronous, the server is finally closed when the server emits a <code>&#39;close&#39;</code>\nevent.  Optionally, you can pass a callback to listen for the <code>&#39;close&#39;</code> event.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "server.getTicketKeys()",
              "type": "method",
              "name": "getTicketKeys",
              "desc": "<p>Returns a <code>Buffer</code> instance holding the keys currently used for\nencryption/decryption of the [TLS Session Tickets][]\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "server.listen(port[, hostname][, callback])",
              "type": "method",
              "name": "listen",
              "desc": "<p>Begin accepting connections on the specified <code>port</code> and <code>hostname</code>. If the\n<code>hostname</code> is omitted, the server will accept connections on any IPv6 address\n(<code>::</code>) when IPv6 is available, or any IPv4 address (<code>0.0.0.0</code>) otherwise. A\nport value of zero will assign a random port.\n\n</p>\n<p>This function is asynchronous. The last parameter <code>callback</code> will be called\nwhen the server has been bound.\n\n</p>\n<p>See <code>net.Server</code> for more information.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "port"
                    },
                    {
                      "name": "hostname",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "server.setTicketKeys(keys)",
              "type": "method",
              "name": "setTicketKeys",
              "desc": "<p>Updates the keys for encryption/decryption of the [TLS Session Tickets][].\n\n</p>\n<p>NOTE: the buffer should be 48 bytes long. See <code>ticketKeys</code> option in\n<a href=\"#tls_tls_createserver_options_secureconnectionlistener\">tls.createServer</a> for\nmore information on how it is used.\n\n</p>\n<p>NOTE: the change is effective only for future server connections. Existing\nor currently pending server connections will use the previous keys.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "keys"
                    }
                  ]
                }
              ]
            }
          ],
          "properties": [
            {
              "textRaw": "server.connections",
              "name": "connections",
              "desc": "<p>The number of concurrent connections on the server.\n\n</p>\n"
            },
            {
              "textRaw": "server.maxConnections",
              "name": "maxConnections",
              "desc": "<p>Set this property to reject connections when the server&#39;s connection count\nexceeds the specified threshold.\n\n\n</p>\n"
            }
          ]
        },
        {
          "textRaw": "Class: tls.TLSSocket",
          "type": "class",
          "name": "tls.TLSSocket",
          "desc": "<p>This is a wrapped version of [<code>net.Socket</code>][] that does transparent encryption\nof written data and all required TLS negotiation.\n\n</p>\n<p>This instance implements the duplex [Stream][] interface. It has all the\ncommon stream methods and events.\n\n</p>\n<p>Methods that return TLS connection metadata (e.g.\n[<code>tls.TLSSocket.getPeerCertificate()</code>][] will only return data while the\nconnection is open.\n\n</p>\n",
          "methods": [
            {
              "textRaw": "new tls.TLSSocket(socket[, options])",
              "type": "method",
              "name": "TLSSocket",
              "desc": "<p>Construct a new TLSSocket object from an existing TCP socket.\n\n</p>\n<p><code>socket</code> is an instance of [<code>net.Socket</code>][]\n\n</p>\n<p><code>options</code> is an optional object that might contain following properties:\n\n</p>\n<ul>\n<li><p><code>secureContext</code>: An optional TLS context object from\n [<code>tls.createSecureContext()</code>][]</p>\n</li>\n<li><p><code>isServer</code>: If <code>true</code> the TLS socket will be instantiated in server-mode.\nDefault: <code>false</code></p>\n</li>\n<li><p><code>server</code>: An optional [<code>net.Server</code>][] instance</p>\n</li>\n<li><p><code>requestCert</code>: Optional, see [<code>tls.createSecurePair()</code>][]</p>\n</li>\n<li><p><code>rejectUnauthorized</code>: Optional, see [<code>tls.createSecurePair()</code>][]</p>\n</li>\n<li><p><code>NPNProtocols</code>: Optional, see [<code>tls.createServer()</code>][]</p>\n</li>\n<li><p><code>ALPNProtocols</code>: Optional, see [<code>tls.createServer()</code>][]</p>\n</li>\n<li><p><code>SNICallback</code>: Optional, see [<code>tls.createServer()</code>][]</p>\n</li>\n<li><p><code>session</code>: Optional, a <code>Buffer</code> instance, containing a TLS session</p>\n</li>\n<li><p><code>requestOCSP</code>: Optional, if <code>true</code> the OCSP status request extension will\nbe added to the client hello and an <code>&#39;OCSPResponse&#39;</code> event will be emitted\non the socket before establishing a secure communication</p>\n</li>\n</ul>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "socket"
                    },
                    {
                      "name": "options",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "tlsSocket.address()",
              "type": "method",
              "name": "address",
              "desc": "<p>Returns the bound address, the address family name, and port of the\nunderlying socket as reported by the operating system. Returns an\nobject with three properties, e.g.,\n<code>{ port: 12346, family: &#39;IPv4&#39;, address: &#39;127.0.0.1&#39; }</code>\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "tlsSocket.getCipher()",
              "type": "method",
              "name": "getCipher",
              "desc": "<p>Returns an object representing the cipher name and the SSL/TLS protocol version\nthat first defined the cipher.\n\n</p>\n<p>Example:\n<code>{ name: &#39;AES256-SHA&#39;, version: &#39;TLSv1/SSLv3&#39; }</code>\n\n</p>\n<p>See SSL_CIPHER_get_name() and SSL_CIPHER_get_version() in\n<a href=\"https://www.openssl.org/docs/manmaster/ssl/SSL_CIPHER_get_name.html\">https://www.openssl.org/docs/manmaster/ssl/SSL_CIPHER_get_name.html</a> for more\ninformation.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "tlsSocket.getEphemeralKeyInfo()",
              "type": "method",
              "name": "getEphemeralKeyInfo",
              "desc": "<p>Returns an object representing the type, name, and size of parameter of\nan ephemeral key exchange in [Perfect Forward Secrecy][] on a client\nconnection. It returns an empty object when the key exchange is not\nephemeral. As this is only supported on a client socket, it returns <code>null</code>\nif called on a server socket. The supported types are &#39;DH&#39; and &#39;ECDH&#39;. The\n<code>name</code> property is only available in &#39;ECDH&#39;.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code>{ type: &#39;ECDH&#39;, name: &#39;prime256v1&#39;, size: 256 }</code></pre>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "tlsSocket.getPeerCertificate([ detailed ])",
              "type": "method",
              "name": "getPeerCertificate",
              "desc": "<p>Returns an object representing the peer&#39;s certificate. The returned object has\nsome properties corresponding to the fields of the certificate. If the\n<code>detailed</code> argument is <code>true</code> the full chain with the <code>issuer</code> property will be\nreturned, if <code>false</code> only the top certificate without the <code>issuer</code> property.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code>{ subject:\n   { C: &#39;UK&#39;,\n     ST: &#39;Acknack Ltd&#39;,\n     L: &#39;Rhys Jones&#39;,\n     O: &#39;node.js&#39;,\n     OU: &#39;Test TLS Certificate&#39;,\n     CN: &#39;localhost&#39; },\n  issuerInfo:\n   { C: &#39;UK&#39;,\n     ST: &#39;Acknack Ltd&#39;,\n     L: &#39;Rhys Jones&#39;,\n     O: &#39;node.js&#39;,\n     OU: &#39;Test TLS Certificate&#39;,\n     CN: &#39;localhost&#39; },\n  issuer:\n   { ... another certificate ... },\n  raw: &lt; RAW DER buffer &gt;,\n  valid_from: &#39;Nov 11 09:52:22 2009 GMT&#39;,\n  valid_to: &#39;Nov  6 09:52:22 2029 GMT&#39;,\n  fingerprint: &#39;2A:7A:C2:DD:E5:F9:CC:53:72:35:99:7A:02:5A:71:38:52:EC:8A:DF&#39;,\n  serialNumber: &#39;B9B0D332A1AA5635&#39; }</code></pre>\n<p>If the peer does not provide a certificate, it returns <code>null</code> or an empty\nobject.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "detailed",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "tlsSocket.getProtocol()",
              "type": "method",
              "name": "getProtocol",
              "desc": "<p>Returns a string containing the negotiated SSL/TLS protocol version of the\ncurrent connection. <code>&#39;unknown&#39;</code> will be returned for connected sockets that have\nnot completed the handshaking process. <code>null</code> will be returned for server\nsockets or disconnected client sockets.\n\n</p>\n<p>Examples:\n</p>\n<pre><code>&#39;SSLv3&#39;\n&#39;TLSv1&#39;\n&#39;TLSv1.1&#39;\n&#39;TLSv1.2&#39;\n&#39;unknown&#39;</code></pre>\n<p>See <a href=\"https://www.openssl.org/docs/manmaster/ssl/SSL_get_version.html\">https://www.openssl.org/docs/manmaster/ssl/SSL_get_version.html</a> for more\ninformation.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "tlsSocket.getSession()",
              "type": "method",
              "name": "getSession",
              "desc": "<p>Returns the ASN.1 encoded TLS session or <code>undefined</code> if none was negotiated.\nCould be used to speed up handshake establishment when reconnecting to the\nserver.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "tlsSocket.getTLSTicket()",
              "type": "method",
              "name": "getTLSTicket",
              "desc": "<p>NOTE: Works only with client TLS sockets. Useful only for debugging, for\nsession reuse provide <code>session</code> option to [<code>tls.connect()</code>][].\n\n</p>\n<p>Returns the TLS session ticket or <code>undefined</code> if none was negotiated.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "tlsSocket.renegotiate(options, callback)",
              "type": "method",
              "name": "renegotiate",
              "desc": "<p>Initiate TLS renegotiation process. The <code>options</code> object may contain the\nfollowing fields: <code>rejectUnauthorized</code>, <code>requestCert</code>. (See [<code>tls.createServer\n()</code>][] for details.) <code>callback(err)</code> will be executed with <code>null</code> as <code>err</code>,\nonce the renegotiation is successfully completed.\n\n</p>\n<p>NOTE: Can be used to request peer&#39;s certificate after the secure connection\nhas been established.\n\n</p>\n<p>ANOTHER NOTE: When running as the server, socket will be destroyed\nwith an error after <code>handshakeTimeout</code> timeout.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "options"
                    },
                    {
                      "name": "callback"
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "tlsSocket.setMaxSendFragment(size)",
              "type": "method",
              "name": "setMaxSendFragment",
              "desc": "<p>Set maximum TLS fragment size (default and maximum value is: <code>16384</code>, minimum\nis: <code>512</code>). Returns <code>true</code> on success, <code>false</code> otherwise.\n\n</p>\n<p>Smaller fragment sizes decrease the buffering latency on the client: larger\nfragments are buffered by the TLS layer until the entire fragment is received\nand its integrity is verified; large fragments can span multiple roundtrips\nand their processing can be delayed due to packet loss or reordering. However,\nsmaller fragments add extra TLS framing bytes and CPU overhead, which may\ndecrease overall server throughput.\n\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "size"
                    }
                  ]
                }
              ]
            }
          ],
          "events": [
            {
              "textRaw": "Event: 'OCSPResponse'",
              "type": "event",
              "name": "OCSPResponse",
              "desc": "<p><code>function (response) { }</code>\n\n</p>\n<p>This event will be emitted if the <code>requestOCSP</code> option was set. <code>response</code> is a\n<code>Buffer</code> containing the server&#39;s OCSP response.\n\n</p>\n<p>Traditionally, the <code>response</code> is a signed object from the server&#39;s CA that\ncontains information about server&#39;s certificate revocation status.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'secureConnect'",
              "type": "event",
              "name": "secureConnect",
              "desc": "<p>This event is emitted after the handshaking process for a new connection has\nsuccessfully completed. The listener will be called regardless of whether or not\nthe server&#39;s certificate has been authorized. It is the user&#39;s responsibility to\ntest <code>tlsSocket.authorized</code> to see if the server certificate was signed by one\nof the specified CAs. If <code>tlsSocket.authorized === false</code> then the error can be\nfound in <code>tlsSocket.authorizationError</code>. Also, if either ALPN or NPN was used\n<code>tlsSocket.alpnProtocol</code> or <code>tlsSocket.npnProtocol</code> can be checked for the\nnegotiated protocol.\n\n</p>\n",
              "params": []
            }
          ],
          "properties": [
            {
              "textRaw": "tlsSocket.authorized",
              "name": "authorized",
              "desc": "<p>A boolean that is <code>true</code> if the peer certificate was signed by one of the\nspecified CAs, otherwise <code>false</code>.\n\n</p>\n"
            },
            {
              "textRaw": "tlsSocket.authorizationError",
              "name": "authorizationError",
              "desc": "<p>The reason why the peer&#39;s certificate has not been verified. This property\nbecomes available only when <code>tlsSocket.authorized === false</code>.\n\n</p>\n"
            },
            {
              "textRaw": "tlsSocket.encrypted",
              "name": "encrypted",
              "desc": "<p>Static boolean value, always <code>true</code>. May be used to distinguish TLS sockets\nfrom regular ones.\n\n</p>\n"
            },
            {
              "textRaw": "tlsSocket.localAddress",
              "name": "localAddress",
              "desc": "<p>The string representation of the local IP address.\n\n</p>\n"
            },
            {
              "textRaw": "tlsSocket.localPort",
              "name": "localPort",
              "desc": "<p>The numeric representation of the local port.\n\n</p>\n"
            },
            {
              "textRaw": "tlsSocket.remoteAddress",
              "name": "remoteAddress",
              "desc": "<p>The string representation of the remote IP address. For example,\n<code>&#39;74.125.127.100&#39;</code> or <code>&#39;2001:4860:a005::68&#39;</code>.\n\n</p>\n"
            },
            {
              "textRaw": "tlsSocket.remoteFamily",
              "name": "remoteFamily",
              "desc": "<p>The string representation of the remote IP family. <code>&#39;IPv4&#39;</code> or <code>&#39;IPv6&#39;</code>.\n\n</p>\n"
            },
            {
              "textRaw": "tlsSocket.remotePort",
              "name": "remotePort",
              "desc": "<p>The numeric representation of the remote port. For example, <code>443</code>.\n\n</p>\n"
            }
          ]
        }
      ],
      "methods": [
        {
          "textRaw": "tls.connect(options[, callback])",
          "type": "method",
          "name": "connect",
          "desc": "<p>Creates a new client connection to the given <code>port</code> and <code>host</code> (old API) or\n<code>options.port</code> and <code>options.host</code>. (If <code>host</code> is omitted, it defaults to\n<code>localhost</code>.) <code>options</code> should be an object which specifies:\n\n</p>\n<ul>\n<li><p><code>host</code>: Host the client should connect to.</p>\n</li>\n<li><p><code>port</code>: Port the client should connect to.</p>\n</li>\n<li><p><code>socket</code>: Establish secure connection on a given socket rather than\ncreating a new socket. If this option is specified, <code>host</code> and <code>port</code>\nare ignored.</p>\n</li>\n<li><p><code>path</code>: Creates unix socket connection to path. If this option is\nspecified, <code>host</code> and <code>port</code> are ignored.</p>\n</li>\n<li><p><code>pfx</code>: A string or <code>Buffer</code> containing the private key, certificate, and\nCA certs of the client in PFX or PKCS12 format.</p>\n</li>\n<li><p><code>key</code>: A string, <code>Buffer</code>, array of strings, or array of <code>Buffer</code>s\ncontaining the private key of the client in PEM format.</p>\n</li>\n<li><p><code>passphrase</code>: A string containing the passphrase for the private key or pfx.</p>\n</li>\n<li><p><code>cert</code>: A string, <code>Buffer</code>, array of strings, or array of <code>Buffer</code>s\ncontaining the certificate key of the client in PEM format.</p>\n</li>\n<li><p><code>ca</code>: A string, <code>Buffer</code>, array of strings, or array of <code>Buffer</code>s of trusted\ncertificates in PEM format. If this is omitted several well known &quot;root&quot;\nCAs (like VeriSign) will be used. These are used to authorize connections.</p>\n</li>\n<li><p><code>ciphers</code>: A string describing the ciphers to use or exclude, separated by\n<code>:</code>. Uses the same default cipher suite as [<code>tls.createServer()</code>][].</p>\n</li>\n<li><p><code>rejectUnauthorized</code>: If <code>true</code>, the server certificate is verified against\nthe list of supplied CAs. An <code>&#39;error&#39;</code> event is emitted if verification\nfails; <code>err.code</code> contains the OpenSSL error code. Default: <code>true</code>.</p>\n</li>\n<li><p><code>NPNProtocols</code>: An array of strings or <code>Buffer</code>s containing supported NPN\nprotocols. <code>Buffer</code>s should have the following format:\n<code>0x05hello0x05world</code>, where the first byte is the next protocol name&#39;s\nlength. (Passing an array is usually be much simpler: <code>[&#39;hello&#39;, &#39;world&#39;]</code>.)</p>\n</li>\n<li><p><code>ALPNProtocols</code>: An array of strings or <code>Buffer</code>s containing the\nsupported ALPN protocols. <code>Buffer</code>s should have following format:\n<code>0x05hello0x05world</code>, where the first byte is the next protocol\nname&#39;s length. (Passing an array is usually be much simpler:\n<code>[&#39;hello&#39;, &#39;world&#39;]</code>.)</p>\n</li>\n<li><p><code>servername</code>: Server name for the SNI (Server Name Indication) TLS\nextension.</p>\n</li>\n<li><p><code>checkServerIdentity(servername, cert)</code>: Provide an override for checking\nthe server&#39;s hostname against the certificate. Should return an error if\nverification fails. Returns <code>undefined</code> if passing.</p>\n</li>\n<li><p><code>secureProtocol</code>: The SSL method to use, e.g., <code>SSLv3_method</code> to force\nSSL version 3. The possible values depend on the version of OpenSSL\ninstalled in the environment and are defined in the constant\n[SSL_METHODS][].</p>\n</li>\n<li><p><code>secureContext</code>: An optional TLS context object from\n<code>tls.createSecureContext( ... )</code>. It can be used for caching client\ncertificates, keys, and CA certificates.</p>\n</li>\n<li><p><code>session</code>: A <code>Buffer</code> instance, containing TLS session.</p>\n</li>\n<li><p><code>minDHSize</code>: Minimum size of the DH parameter in bits to accept a TLS\nconnection. When a server offers a DH parameter with a size less\nthan this, the TLS connection is destroyed and an error is thrown. Default:\n1024.</p>\n</li>\n</ul>\n<p>The <code>callback</code> parameter will be added as a listener for the\n[<code>&#39;secureConnect&#39;</code>][] event.\n\n</p>\n<p><code>tls.connect()</code> returns a [<code>tls.TLSSocket</code>][] object.\n\n</p>\n<p>Here is an example of a client of echo server as described previously:\n\n</p>\n<pre><code class=\"js\">const tls = require(&#39;tls&#39;);\nconst fs = require(&#39;fs&#39;);\n\nconst options = {\n  // These are necessary only if using the client certificate authentication\n  key: fs.readFileSync(&#39;client-key.pem&#39;),\n  cert: fs.readFileSync(&#39;client-cert.pem&#39;),\n\n  // This is necessary only if the server uses the self-signed certificate\n  ca: [ fs.readFileSync(&#39;server-cert.pem&#39;) ]\n};\n\nvar socket = tls.connect(8000, options, () =&gt; {\n  console.log(&#39;client connected&#39;,\n              socket.authorized ? &#39;authorized&#39; : &#39;unauthorized&#39;);\n  process.stdin.pipe(socket);\n  process.stdin.resume();\n});\nsocket.setEncoding(&#39;utf8&#39;);\nsocket.on(&#39;data&#39;, (data) =&gt; {\n  console.log(data);\n});\nsocket.on(&#39;end&#39;, () =&gt; {\n  server.close();\n});</code></pre>\n<p>Or\n\n</p>\n<pre><code class=\"js\">const tls = require(&#39;tls&#39;);\nconst fs = require(&#39;fs&#39;);\n\nconst options = {\n  pfx: fs.readFileSync(&#39;client.pfx&#39;)\n};\n\nvar socket = tls.connect(8000, options, () =&gt; {\n  console.log(&#39;client connected&#39;,\n              socket.authorized ? &#39;authorized&#39; : &#39;unauthorized&#39;);\n  process.stdin.pipe(socket);\n  process.stdin.resume();\n});\nsocket.setEncoding(&#39;utf8&#39;);\nsocket.on(&#39;data&#39;, (data) =&gt; {\n  console.log(data);\n});\nsocket.on(&#39;end&#39;, () =&gt; {\n  server.close();\n});</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "port"
                },
                {
                  "name": "host",
                  "optional": true
                },
                {
                  "name": "options",
                  "optional": true
                },
                {
                  "name": "callback",
                  "optional": true
                }
              ]
            },
            {
              "params": [
                {
                  "name": "options"
                },
                {
                  "name": "callback",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "tls.connect(port[, host][, options][, callback])",
          "type": "method",
          "name": "connect",
          "desc": "<p>Creates a new client connection to the given <code>port</code> and <code>host</code> (old API) or\n<code>options.port</code> and <code>options.host</code>. (If <code>host</code> is omitted, it defaults to\n<code>localhost</code>.) <code>options</code> should be an object which specifies:\n\n</p>\n<ul>\n<li><p><code>host</code>: Host the client should connect to.</p>\n</li>\n<li><p><code>port</code>: Port the client should connect to.</p>\n</li>\n<li><p><code>socket</code>: Establish secure connection on a given socket rather than\ncreating a new socket. If this option is specified, <code>host</code> and <code>port</code>\nare ignored.</p>\n</li>\n<li><p><code>path</code>: Creates unix socket connection to path. If this option is\nspecified, <code>host</code> and <code>port</code> are ignored.</p>\n</li>\n<li><p><code>pfx</code>: A string or <code>Buffer</code> containing the private key, certificate, and\nCA certs of the client in PFX or PKCS12 format.</p>\n</li>\n<li><p><code>key</code>: A string, <code>Buffer</code>, array of strings, or array of <code>Buffer</code>s\ncontaining the private key of the client in PEM format.</p>\n</li>\n<li><p><code>passphrase</code>: A string containing the passphrase for the private key or pfx.</p>\n</li>\n<li><p><code>cert</code>: A string, <code>Buffer</code>, array of strings, or array of <code>Buffer</code>s\ncontaining the certificate key of the client in PEM format.</p>\n</li>\n<li><p><code>ca</code>: A string, <code>Buffer</code>, array of strings, or array of <code>Buffer</code>s of trusted\ncertificates in PEM format. If this is omitted several well known &quot;root&quot;\nCAs (like VeriSign) will be used. These are used to authorize connections.</p>\n</li>\n<li><p><code>ciphers</code>: A string describing the ciphers to use or exclude, separated by\n<code>:</code>. Uses the same default cipher suite as [<code>tls.createServer()</code>][].</p>\n</li>\n<li><p><code>rejectUnauthorized</code>: If <code>true</code>, the server certificate is verified against\nthe list of supplied CAs. An <code>&#39;error&#39;</code> event is emitted if verification\nfails; <code>err.code</code> contains the OpenSSL error code. Default: <code>true</code>.</p>\n</li>\n<li><p><code>NPNProtocols</code>: An array of strings or <code>Buffer</code>s containing supported NPN\nprotocols. <code>Buffer</code>s should have the following format:\n<code>0x05hello0x05world</code>, where the first byte is the next protocol name&#39;s\nlength. (Passing an array is usually be much simpler: <code>[&#39;hello&#39;, &#39;world&#39;]</code>.)</p>\n</li>\n<li><p><code>ALPNProtocols</code>: An array of strings or <code>Buffer</code>s containing the\nsupported ALPN protocols. <code>Buffer</code>s should have following format:\n<code>0x05hello0x05world</code>, where the first byte is the next protocol\nname&#39;s length. (Passing an array is usually be much simpler:\n<code>[&#39;hello&#39;, &#39;world&#39;]</code>.)</p>\n</li>\n<li><p><code>servername</code>: Server name for the SNI (Server Name Indication) TLS\nextension.</p>\n</li>\n<li><p><code>checkServerIdentity(servername, cert)</code>: Provide an override for checking\nthe server&#39;s hostname against the certificate. Should return an error if\nverification fails. Returns <code>undefined</code> if passing.</p>\n</li>\n<li><p><code>secureProtocol</code>: The SSL method to use, e.g., <code>SSLv3_method</code> to force\nSSL version 3. The possible values depend on the version of OpenSSL\ninstalled in the environment and are defined in the constant\n[SSL_METHODS][].</p>\n</li>\n<li><p><code>secureContext</code>: An optional TLS context object from\n<code>tls.createSecureContext( ... )</code>. It can be used for caching client\ncertificates, keys, and CA certificates.</p>\n</li>\n<li><p><code>session</code>: A <code>Buffer</code> instance, containing TLS session.</p>\n</li>\n<li><p><code>minDHSize</code>: Minimum size of the DH parameter in bits to accept a TLS\nconnection. When a server offers a DH parameter with a size less\nthan this, the TLS connection is destroyed and an error is thrown. Default:\n1024.</p>\n</li>\n</ul>\n<p>The <code>callback</code> parameter will be added as a listener for the\n[<code>&#39;secureConnect&#39;</code>][] event.\n\n</p>\n<p><code>tls.connect()</code> returns a [<code>tls.TLSSocket</code>][] object.\n\n</p>\n<p>Here is an example of a client of echo server as described previously:\n\n</p>\n<pre><code class=\"js\">const tls = require(&#39;tls&#39;);\nconst fs = require(&#39;fs&#39;);\n\nconst options = {\n  // These are necessary only if using the client certificate authentication\n  key: fs.readFileSync(&#39;client-key.pem&#39;),\n  cert: fs.readFileSync(&#39;client-cert.pem&#39;),\n\n  // This is necessary only if the server uses the self-signed certificate\n  ca: [ fs.readFileSync(&#39;server-cert.pem&#39;) ]\n};\n\nvar socket = tls.connect(8000, options, () =&gt; {\n  console.log(&#39;client connected&#39;,\n              socket.authorized ? &#39;authorized&#39; : &#39;unauthorized&#39;);\n  process.stdin.pipe(socket);\n  process.stdin.resume();\n});\nsocket.setEncoding(&#39;utf8&#39;);\nsocket.on(&#39;data&#39;, (data) =&gt; {\n  console.log(data);\n});\nsocket.on(&#39;end&#39;, () =&gt; {\n  server.close();\n});</code></pre>\n<p>Or\n\n</p>\n<pre><code class=\"js\">const tls = require(&#39;tls&#39;);\nconst fs = require(&#39;fs&#39;);\n\nconst options = {\n  pfx: fs.readFileSync(&#39;client.pfx&#39;)\n};\n\nvar socket = tls.connect(8000, options, () =&gt; {\n  console.log(&#39;client connected&#39;,\n              socket.authorized ? &#39;authorized&#39; : &#39;unauthorized&#39;);\n  process.stdin.pipe(socket);\n  process.stdin.resume();\n});\nsocket.setEncoding(&#39;utf8&#39;);\nsocket.on(&#39;data&#39;, (data) =&gt; {\n  console.log(data);\n});\nsocket.on(&#39;end&#39;, () =&gt; {\n  server.close();\n});</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "port"
                },
                {
                  "name": "host",
                  "optional": true
                },
                {
                  "name": "options",
                  "optional": true
                },
                {
                  "name": "callback",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "tls.createSecureContext(options)",
          "type": "method",
          "name": "createSecureContext",
          "desc": "<p>Creates a credentials object; the <code>options</code> object may contain the following\nfields:\n\n</p>\n<ul>\n<li><code>pfx</code> : A string or <code>Buffer</code> holding the PFX or PKCS12 encoded private\nkey, certificate, and CA certificates.</li>\n<li><code>key</code>: A string or <code>Buffer</code> containing the private key of the server in\nPEM format. To support multiple keys using different algorithms, an array\ncan be provided. It can either be a plain array of keys or an array of\nobjects in the format <code>{pem: key, passphrase: passphrase}</code>. (Required)</li>\n<li><code>passphrase</code> : A string containing the passphrase for the private key or pfx.</li>\n<li><code>cert</code> : A string containing the PEM encoded certificate</li>\n<li><code>ca</code>: A string, <code>Buffer</code>, array of strings, or array of <code>Buffer</code>s of trusted\ncertificates in PEM format. If this is omitted several well known &quot;root&quot;\nCAs (like VeriSign) will be used. These are used to authorize connections.</li>\n<li><code>crl</code> : Either a string or list of strings of PEM encoded CRLs\n(Certificate Revocation List).</li>\n<li><code>ciphers</code>: A string describing the ciphers to use or exclude.\nConsult\n<a href=\"https://www.openssl.org/docs/apps/ciphers.html#CIPHER_LIST_FORMAT\">https://www.openssl.org/docs/apps/ciphers.html#CIPHER_LIST_FORMAT</a>\nfor details on the format.</li>\n<li><code>honorCipherOrder</code> : When choosing a cipher, use the server&#39;s preferences\ninstead of the client preferences. For further details see <code>tls</code> module\ndocumentation.</li>\n</ul>\n<p>If no &#39;CA&#39; details are given, then Node.js will use the default\npublicly trusted list of CAs as given in\n</p>\n<p><a href=\"http://mxr.mozilla.org/mozilla/source/security/nss/lib/ckfw/builtins/certdata.txt\">http://mxr.mozilla.org/mozilla/source/security/nss/lib/ckfw/builtins/certdata.txt</a>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "options"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "tls.createSecurePair([context][, isServer][, requestCert][, rejectUnauthorized][, options])",
          "type": "method",
          "name": "createSecurePair",
          "desc": "<p>Creates a new secure pair object with two streams, one of which reads and writes\nthe encrypted data and the other of which reads and writes the cleartext data.\nGenerally, the encrypted stream is piped to/from an incoming encrypted data\nstream and the cleartext one is used as a replacement for the initial encrypted\nstream.\n\n</p>\n<ul>\n<li><p><code>credentials</code>: A secure context object from <code>tls.createSecureContext( ... )</code>.</p>\n</li>\n<li><p><code>isServer</code>: A boolean indicating whether this TLS connection should be\nopened as a server or a client.</p>\n</li>\n<li><p><code>requestCert</code>: A boolean indicating whether a server should request a\ncertificate from a connecting client. Only applies to server connections.</p>\n</li>\n<li><p><code>rejectUnauthorized</code>: A boolean indicating whether a server should\nautomatically reject clients with invalid certificates. Only applies to\nservers with <code>requestCert</code> enabled.</p>\n</li>\n<li><p><code>options</code>: An object with common SSL options. See [<code>tls.TLSSocket</code>][].</p>\n</li>\n</ul>\n<p><code>tls.createSecurePair()</code> returns a SecurePair object with <code>cleartext</code> and\n<code>encrypted</code> stream properties.\n\n</p>\n<p>NOTE: <code>cleartext</code> has the same API as [<code>tls.TLSSocket</code>][]\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "context",
                  "optional": true
                },
                {
                  "name": "isServer",
                  "optional": true
                },
                {
                  "name": "requestCert",
                  "optional": true
                },
                {
                  "name": "rejectUnauthorized",
                  "optional": true
                },
                {
                  "name": "options",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "tls.createServer(options[, secureConnectionListener])",
          "type": "method",
          "name": "createServer",
          "desc": "<p>Creates a new [tls.Server][].  The <code>connectionListener</code> argument is\nautomatically set as a listener for the [<code>&#39;secureConnection&#39;</code>][] event.  The\n<code>options</code> object may contain the following fields:\n\n</p>\n<ul>\n<li><p><code>pfx</code>: A string or <code>Buffer</code> containing the private key, certificate and\nCA certs of the server in PFX or PKCS12 format. (Mutually exclusive with\nthe <code>key</code>, <code>cert</code>, and <code>ca</code> options.)</p>\n</li>\n<li><p><code>key</code>: A string or <code>Buffer</code> containing the private key of the server in\nPEM format. To support multiple keys using different algorithms an array\ncan be provided. It can either be a plain array of keys or an array of\nobjects in the format <code>{pem: key, passphrase: passphrase}</code>. (Required)</p>\n</li>\n<li><p><code>passphrase</code>: A string containing the passphrase for the private key or pfx.</p>\n</li>\n<li><p><code>cert</code>: A string, <code>Buffer</code>, array of strings, or array of <code>Buffer</code>s\ncontaining the certificate key of the server in PEM format. (Required)</p>\n</li>\n<li><p><code>ca</code>: A string, <code>Buffer</code>, array of strings, or array of <code>Buffer</code>s of trusted\ncertificates in PEM format. If this is omitted several well known &quot;root&quot;\nCAs (like VeriSign) will be used. These are used to authorize connections.</p>\n</li>\n<li><p><code>crl</code> : Either a string or array of strings of PEM encoded CRLs (Certificate\nRevocation List).</p>\n</li>\n<li><p><code>ciphers</code>: A string describing the ciphers to use or exclude, separated by\n<code>:</code>. The default cipher suite is:</p>\n<pre><code class=\"js\">ECDHE-RSA-AES128-GCM-SHA256:\nECDHE-ECDSA-AES128-GCM-SHA256:\nECDHE-RSA-AES256-GCM-SHA384:\nECDHE-ECDSA-AES256-GCM-SHA384:\nDHE-RSA-AES128-GCM-SHA256:\nECDHE-RSA-AES128-SHA256:\nDHE-RSA-AES128-SHA256:\nECDHE-RSA-AES256-SHA384:\nDHE-RSA-AES256-SHA384:\nECDHE-RSA-AES256-SHA256:\nDHE-RSA-AES256-SHA256:\nHIGH:\n!aNULL:\n!eNULL:\n!EXPORT:\n!DES:\n!RC4:\n!MD5:\n!PSK:\n!SRP:\n!CAMELLIA</code></pre>\n<p>The default cipher suite prefers GCM ciphers for [Chrome&#39;s &#39;modern\ncryptography&#39; setting] and also prefers ECDHE and DHE ciphers for Perfect\nForward Secrecy, while offering <em>some</em> backward compatibility.</p>\n<p>128 bit AES is preferred over 192 and 256 bit AES in light of [specific\nattacks affecting larger AES key sizes].</p>\n<p>Old clients that rely on insecure and deprecated RC4 or DES-based ciphers\n(like Internet Explorer 6) cannot complete the handshaking process with\nthe default configuration. If these clients <em>must</em> be supported, the\n[TLS recommendations] may offer a compatible cipher suite. For more details\non the format, see the [OpenSSL cipher list format documentation].</p>\n</li>\n<li><p><code>ecdhCurve</code>: A string describing a named curve to use for ECDH key agreement\nor false to disable ECDH.</p>\n<p>Defaults to <code>prime256v1</code> (NIST P-256). Use [<code>crypto.getCurves()</code>][] to\nobtain a list of available curve names. On recent releases,\n<code>openssl ecparam -list_curves</code> will also display the name and description of\neach available elliptic curve.</p>\n</li>\n<li><p><code>dhparam</code>: A string or <code>Buffer</code> containing Diffie Hellman parameters,\nrequired for Perfect Forward Secrecy. Use <code>openssl dhparam</code> to create it.\nIts key length should be greater than or equal to 1024 bits, otherwise\nit throws an error. It is strongly recommended to use 2048 bits or\nlarger for stronger security. If omitted or invalid, it is silently\ndiscarded and DHE ciphers won&#39;t be available.</p>\n</li>\n<li><p><code>handshakeTimeout</code>: Abort the connection if the SSL/TLS handshake does not\nfinish in the specified number of milliseconds. The default is 120 seconds.</p>\n<p>A <code>&#39;clientError&#39;</code> is emitted on the <code>tls.Server</code> object whenever a handshake\ntimes out.</p>\n</li>\n<li><p><code>honorCipherOrder</code> : When choosing a cipher, use the server&#39;s preferences\ninstead of the client preferences. Default: <code>true</code>.</p>\n</li>\n<li><p><code>requestCert</code>: If <code>true</code> the server will request a certificate from\nclients that connect and attempt to verify that certificate. Default:\n<code>false</code>.</p>\n</li>\n<li><p><code>rejectUnauthorized</code>: If <code>true</code> the server will reject any connection\nwhich is not authorized with the list of supplied CAs. This option only\nhas an effect if <code>requestCert</code> is <code>true</code>. Default: <code>false</code>.</p>\n</li>\n<li><p><code>NPNProtocols</code>: An array or <code>Buffer</code> of possible NPN protocols. (Protocols\nshould be ordered by their priority.)</p>\n</li>\n<li><p><code>ALPNProtocols</code>: An array or <code>Buffer</code> of possible ALPN\nprotocols. (Protocols should be ordered by their priority.) When\nthe server receives both NPN and ALPN extensions from the client,\nALPN takes precedence over NPN and the server does not send an NPN\nextension to the client.</p>\n</li>\n<li><p><code>SNICallback(servername, cb)</code>: A function that will be called if the client\nsupports SNI TLS extension. Two arguments will be passed to it:\n<code>servername</code> and <code>cb</code>. <code>SNICallback</code> should invoke <code>cb(null, ctx)</code>, where\n<code>ctx</code> is a SecureContext instance. (<code>tls.createSecureContext(...)</code> can be\nused to get a proper SecureContext.) If <code>SNICallback</code> wasn&#39;t provided the\ndefault callback with high-level API will be used (see below).</p>\n</li>\n<li><p><code>sessionTimeout</code>: An integer specifying the number of seconds after which\nthe TLS session identifiers and TLS session tickets created by the server\nwill time out. See [SSL_CTX_set_timeout] for more details.</p>\n</li>\n<li><p><code>ticketKeys</code>: A 48-byte <code>Buffer</code> instance consisting of a 16-byte prefix,\na 16-byte HMAC key, and a 16-byte AES key. This can be used to accept TLS\nsession tickets on multiple instances of the TLS server.</p>\n<p>NOTE: Automatically shared between <code>cluster</code> module workers.</p>\n</li>\n<li><p><code>sessionIdContext</code>: A string containing an opaque identifier for session\nresumption. If <code>requestCert</code> is <code>true</code>, the default is a MD5 hash value\ngenerated from the command-line. (In FIPS mode a truncated SHA1 hash is\nused instead.) Otherwise, a default is not provided.</p>\n</li>\n<li><p><code>secureProtocol</code>: The SSL method to use, e.g., <code>SSLv3_method</code> to force\nSSL version 3. The possible values depend on the version of OpenSSL\ninstalled in the environment and are defined in the constant [SSL_METHODS][].</p>\n</li>\n</ul>\n<p>Here is a simple example echo server:\n\n</p>\n<pre><code class=\"js\">const tls = require(&#39;tls&#39;);\nconst fs = require(&#39;fs&#39;);\n\nconst options = {\n  key: fs.readFileSync(&#39;server-key.pem&#39;),\n  cert: fs.readFileSync(&#39;server-cert.pem&#39;),\n\n  // This is necessary only if using the client certificate authentication.\n  requestCert: true,\n\n  // This is necessary only if the client uses the self-signed certificate.\n  ca: [ fs.readFileSync(&#39;client-cert.pem&#39;) ]\n};\n\nvar server = tls.createServer(options, (socket) =&gt; {\n  console.log(&#39;server connected&#39;,\n              socket.authorized ? &#39;authorized&#39; : &#39;unauthorized&#39;);\n  socket.write(&#39;welcome!\\n&#39;);\n  socket.setEncoding(&#39;utf8&#39;);\n  socket.pipe(socket);\n});\nserver.listen(8000, () =&gt; {\n  console.log(&#39;server bound&#39;);\n});</code></pre>\n<p>Or\n\n</p>\n<pre><code class=\"js\">const tls = require(&#39;tls&#39;);\nconst fs = require(&#39;fs&#39;);\n\nconst options = {\n  pfx: fs.readFileSync(&#39;server.pfx&#39;),\n\n  // This is necessary only if using the client certificate authentication.\n  requestCert: true,\n\n};\n\nvar server = tls.createServer(options, (socket) =&gt; {\n  console.log(&#39;server connected&#39;,\n              socket.authorized ? &#39;authorized&#39; : &#39;unauthorized&#39;);\n  socket.write(&#39;welcome!\\n&#39;);\n  socket.setEncoding(&#39;utf8&#39;);\n  socket.pipe(socket);\n});\nserver.listen(8000, () =&gt; {\n  console.log(&#39;server bound&#39;);\n});</code></pre>\n<p>You can test this server by connecting to it with <code>openssl s_client</code>:\n\n</p>\n<pre><code>openssl s_client -connect 127.0.0.1:8000</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "options"
                },
                {
                  "name": "secureConnectionListener",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "tls.getCiphers()",
          "type": "method",
          "name": "getCiphers",
          "desc": "<p>Returns an array with the names of the supported SSL ciphers.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">var ciphers = tls.getCiphers();\nconsole.log(ciphers); // [&#39;AES128-SHA&#39;, &#39;AES256-SHA&#39;, ...]</code></pre>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        }
      ],
      "type": "module",
      "displayName": "TLS (SSL)"
    }
  ]
}
