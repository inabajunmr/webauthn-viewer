<template>
  <div>
    <h1>WebAuthn Client for Learning</h1>

    <h2>navigator.credentials.create()</h2>
    <h3>Request</h3>
    <label>rp.name:</label><input type="text" v-model="reqRpName"><br>
    <label>user.id:</label><input type="text" v-model="reqUserId"><br>
    <label>user.name:</label><input type="text" v-model="reqUserName"><br>
    <label>user.displayName:</label><input type="text" v-model="reqUserDisplayName"><br>
    <label>pubKeyCredParams.type:</label><input type="text" v-model="reqPubKeyCredParamsType"><br>
    <label>pubKeyCredParams.alg:</label><input type="text" v-model="reqPubKeyCredParamsAlg"><br>
    <label>attestation:</label><input type="text" v-model="reqAttestation"><br>
    <label>timeout:</label><input type="text" v-model="reqTimeout"><br>
    <label>challenge:</label><input type="text" v-model="reqChallenge"><br>
    
    <input type="button" value="navigator.credentials.create()" @click="create()">

    <h3>Response</h3>
    <label>rawId:</label>
    <div>{{resRawId}}</div>
    <label>response.attestationObject:</label>
    <div>{{resResponseAttestationObject}}</div>
    <label>response.clientDataJSON:</label>
    <div>{{resResponseClientDataJSON}}</div>
    <label>id:</label>
    <div>{{resId}}</div>
    <label>type:</label>
    <div>{{resType}}</div>

    <h2>navigator.credentials.get() parameters</h2>
    <textarea rows="30" cols="60"></textarea>
    <input type="button" value="navigator.credentials.get()">
    <h2>navigator.credentials.get() result</h2>
    <textarea rows="30" cols="60"></textarea>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqRpName: "Acme",
      reqUserId: new Uint8Array(16),
      reqUserName: "john.p.smith@example.com",
      reqUserDisplayName: "John P. Smith",
      reqPubKeyCredParamsType: "public-key",
      reqPubKeyCredParamsAlg: -7,
      reqAttestation: "direct",
      reqTimeout: 60000,
      reqChallenge: new Uint8Array([ // サーバーから暗号学的にランダムな値が送られていなければならない
            0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
            0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
        ]).buffer,
      createResult: "",
      resRawId: "",
      resResponseAttestationObject: "",
      resResponseClientDataJSON: "",
      resId: "",
      resType: ""
    }
  },
  methods: {
    clear () {
      this.rpName = ''
    },
    create() {
      navigator.credentials.create({
        publicKey: {
            rp: {
                name: this.reqRpName
            },
            user: {
                id: this.reqUserId,
                name: this.reqUserName,
                displayName: this.reqUserDisplayName
            },
            pubKeyCredParams: [{
                type: this.reqPubKeyCredParamsType,
                alg: this.reqPubKeyCredParamsAlg
            }],
            attestation: this.reqAttestation,
            timeout: this.reqTimeout,
            // TODO
            challenge: new Uint8Array([ // サーバーから暗号学的にランダムな値が送られていなければならない
                0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
                0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
            ]).buffer
        }        
      })
      .then((res) => {
          console.log(res)
          // TODO all field
          // TODO decode
          this.createResult = JSON.stringify(res)
          this.resRawId = new Int8Array(res.rawId);
          this.resResponseAttestationObject = new Int8Array(res.response.attestationObject)
          this.resResponseClientDataJSON = new Int8Array(res.response.clientDataJSON)      
          this.resId = res.id     
          this.resType = res.type
      }).catch((err) => {
          this.createResult = JSON.stringify(err)
          this.createResult = "ERROR"
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
