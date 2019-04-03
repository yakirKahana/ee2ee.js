(function () {
    window.ecdh = class {
        constructor() {
            crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-521' },
                true,
                ['deriveKey', 'deriveBits']).then(keyPair => {
                    this.keys = keyPair;
                    crypto.subtle.exportKey('jwk', this.keys.publicKey).then(exp => {
                        this.PublicExported = btoa(JSON.stringify(exp));
                    });
                });
        }
    }

}());