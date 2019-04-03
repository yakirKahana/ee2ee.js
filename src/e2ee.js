(function () {
    window.e2ee = class {
        constructor() {
            this.dh = {
                generateSharedKey(othersPublicKey) {
                    let jwkOthersKey = JSON.parse(atob(othersPublicKey));
                    //import key
                    crypto.subtle.importKey('jwk', jwkOthersKey, { name: 'ECDH', namedCurve: 'P-521' }, true, []).then((imported) => {
                        //generate secrete from other's key
                        let params = { name: 'ECDH', public: imported };
                        let aes = { name: 'AES-GCM', length: 256 };
                        crypto.subtle.deriveKey(params, this.dh.keys.privateKey, aes, false, ['encrypt', 'decrypt']).then(key => {
                            this.sharedKey = key;
                        });
                    });
                }
            };
            crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-521' },
                true,
                ['deriveKey', 'deriveBits']).then(keyPair => {
                    this.dh.keys = keyPair;
                    crypto.subtle.exportKey('jwk', this.dh.keys.publicKey).then(exp => {
                        this.dh.PublicExported = btoa(JSON.stringify(exp));
                    });
                });
        }



    }

}());