# Easy end-to-end encryption

 :warning: __Disclaimer__ :warning:

 I am __NOT__ a cryptography expert.
 This library provides only basic encryption.

this library uses AES-GCM 256bit

 ## Usage

 link the file to your HTML
 ```html
 <script src="./ee2ee.min.js"></script>
 ``` 
---
initialization:

```javascript
let alice = new ee2e();
```

After initialization, your public key will generate automatically and will be stored in 

```javascript
 alice.dh.publicExported
```

After you send the public key to the recipient,
they'll need to generate the shared key

 ```javascript
 //from the recipient's (bob) side:
 bob.dh.generateSharedKey(alicePublicKey);
 ```
 __Keep in mind__

both sides need to send and receive each other's public key

```javascript
//getting bob's public key
alice.dh.generateSharedKey(bobPublicKey);
```
---
after the secret key is generated, you can encrypt by using the `encrypt` function

```javascript
let encryptedMsgToAlice = bob.encrypt('Hi Alice, How are you?');
```

and dycrypt by using the `decrypt` function

```javascript

//decrypting bob's message
let msgFromBob = alice.decrypt(bobsEncryptedMsg);
// msgFromBob == "Hi Alice, How are you?"
```
 

### build from source

```bash
git clone https://github.com/yakirKahana/ee2ee.js.git
cd ee2ee.js
npm install
npm run build
```
