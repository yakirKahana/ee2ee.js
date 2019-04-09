

class dh {
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

    generateSharedKey(othersPublicKey) {
        let jwkOthersKey = JSON.parse(atob(othersPublicKey));
        //import key
        crypto.subtle.importKey('jwk', jwkOthersKey, { name: 'ECDH', namedCurve: 'P-521' }, true, []).then((imported) => {
            //generate secrete from other's key
            let params = { name: 'ECDH', public: imported };
            let aes = { name: 'AES-GCM', length: 256 };
            crypto.subtle.deriveKey(params, this.keys.privateKey, aes, false, ['encrypt', 'decrypt']).then(key => {
                this.sharedKey = key;
            });
        });
    }
}



window.e2ee = class {
    constructor() {
        this.dh = new dh();
        this.iv;
    }

    async encrypt(data) {
        let enc = new TextEncoder();
        let encodedData = enc.encode(data);
        let key = this.dh.sharedKey;
        this.iv = crypto.getRandomValues(new Uint8Array(17));
        let aesParams = { name: "AES-GCM", iv: this.iv };
        let encrypted = await crypto.subtle.encrypt(aesParams, key, encodedData);
        let messageAndIV = { m: encrypted, iv: this.iv };
        return messageAndIV;
    }



    async decrypt(data) {
        let key = this.dh.sharedKey;
        let aesParams = { name: "AES-GCM", iv: data.iv };
        let decoder = new TextDecoder();
        let decrypted = await crypto.subtle.decrypt(aesParams, key, data.m);
        return (decoder.decode(decrypted));
    }

}

