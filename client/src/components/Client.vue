<template>
  <div>

    <div class="container is-size-6">
      <div class="columns">
        <div class="column is-half">
          <h3 class="title">Request</h3>
          <div class="field">
            <label class="label is-small">rp.name</label>
            <div class="control">
              <input class="input is-small" type="text" placeholder="Text input" v-model="reqRpName">
            </div>
          </div>
          <div class="field">
            <label class="label is-small">user.id</label>
            <div class="control">
              <input class="input is-small" type="text" placeholder="Text input" v-model="reqUserId">
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label is-small">user.name</label>
                <div class="control">
                  <input class="input is-small" type="text" placeholder="Text input" v-model="reqUserName">
                </div>
              </div>
            </div>
            <div class="field">
              <div class="column">
                <label class="label is-small">user.displayName</label>
                <div class="control">
                  <input class="input is-small" type="text" placeholder="Text input" v-model="reqUserDisplayName">
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label is-small">pubKeyCredParams.type</label>
                <div class="control">
                  <input class="input is-small" type="text" placeholder="Text input" v-model="reqPubKeyCredParamsType">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label is-small">pubKeyCredParams.alg</label>
                <div class="control">
                  <input class="input is-small" type="text" placeholder="Text input" v-model="reqPubKeyCredParamsAlg">
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label is-small">attestation</label>
                <div class="control">
                  <input class="input is-small" type="text" placeholder="Text input" v-model="reqAttestation">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label is-small">timeout</label>
                <div class="control">
                  <input class="input is-small" type="text" placeholder="Text input" v-model="reqTimeout">
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label is-small">challenge</label>
            <div class="control">
              <input class="input is-small" type="text" placeholder="Text input" v-model="reqChallenge">
            </div>
          </div>
          <input type="button" value="navigator.credentials.create()" class="button is-primary" @click="create()">
        </div>
        <div class="column is-half">
          <h3 class="title">Response</h3>
            <table class="table is-responsive">
                <tbody>
                    <tr>
                      <th>response.attestationObject.fmt</th>
                      <td>{{createResponseResponseAttestationObjectFmt}}</td>
                    </tr>
                    <tr>
                      <th>response.attestationObject.attStmt</th>
                      <td>{{createResponseResponseAttestationObjectAttStmt}}</td>
                    </tr>
                    <tr>
                      <th>response.attestationObject.authData</th>
                      <td>{{createResponseResponseAttestationObjectAuthData}}</td>
                    </tr>
                    <tr>
                      <th>response.clientDataJSON</th>
                      <td>{{createResponseResponseClientDataJSON}}</td>
                    </tr>
                    <tr>
                      <th>id</th>
                      <td>{{createResponseId}}</td>
                    </tr>
                    <tr>
                      <th>type</th>
                      <td>{{createResponseType}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
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
      resType: "",
      createResponse : {}
    }
  },
  computed :{
    buildCreateRequest: function() {
      return {
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
      }
    },
    createResponseRawId: function() {
      return new Int8Array(this.createResponse.rawId)
    },
    createResponseResponseAttestationObjectFmt: function() {
      if (this.createResponse.response == undefined) {
        return ""
      }
      var cbor = require('cbor');
      return cbor.decodeAllSync(new Buffer(this.createResponse.response.attestationObject))[0].fmt
    },
    createResponseResponseAttestationObjectAttStmt: function() {
      if (this.createResponse.response == undefined) {
        return ""
      }
      var cbor = require('cbor');
      return cbor.decodeAllSync(new Buffer(this.createResponse.response.attestationObject))[0].attStmt
    },
    createResponseResponseAttestationObjectAuthData: function() {
      if (this.createResponse.response == undefined) {
        return ""
      }
      var cbor = require('cbor');
      
      var localAtt = cbor.decodeAllSync(new Buffer(this.createResponse.response.attestationObject))[0]
      var authDataArray = localAtt.authData
      console.log(authDataArray)

      // TODO parse authDataArray https://www.w3.org/TR/webauthn/#authenticator-data
      const rpidHash = authDataArray.slice( 0, 32);
      const flag     = authDataArray.slice(32, 33); //.readUInt8(0)
      const counter  = authDataArray.slice(33, 37); //.readUInt32BE(0)
      // TODO この後はatによっては存在しない
      const aaguid   = authDataArray.slice(37, 53);
      const credentialIdLengthTmp = authDataArray.slice(53, 55);
      const credentialIdLength = (credentialIdLengthTmp[0] << 8) + credentialIdLengthTmp[1];
      const credentialId        = authDataArray.slice(55, 55 + credentialIdLength);

      console.log("rpidHash", Buffer.from(rpidHash).toString('hex'))
      console.log("flag", flag)
      var length = flag.length;
      let buffer = Buffer.from(flag);
      var result = buffer.readUIntBE(0, length);
      var up = 1 == result.toString(2)[0]
      var uv = 1 == result.toString(2)[2]
      var at = 1 == result.toString(2)[6]
      var ed = 1 == result.toString(2)[7]
      console.log("up", up)
      console.log("uv", uv)
      console.log("at", at)
      console.log("ed", ed)

      console.log("counter", counter)
      // TODO https://mds2.fidoalliance.org/tokens/
      console.log("aaguid", Buffer.from(aaguid).toString('hex'))
      console.log("credentialIdLength",credentialIdLength)
      console.log("credentialId",credentialId)

      return cbor.decodeAllSync(new Buffer(this.createResponse.response.attestationObject))[0].authData
    },
    createResponseResponseClientDataJSON: function() {
      if (this.createResponse.response == undefined) {
        return ""
      }
      return new Int8Array(this.createResponse.response.clientDataJSON)
    },
    createResponseId: function() {
      return this.createResponse.id
    },
    createResponseType: function() {
      return this.createResponse.type
    },
  },
  methods: {
    clear () {
      this.rpName = ''
    },
    create() {
      navigator.credentials.create(this.buildCreateRequest)
      .then((res) => {
          console.log(res)
          this.createResponse = res
      }).catch((err) => {
          console.log(err)
          // TODO
          // this.createResponse = JSON.stringify(err)
          // this.createResponse = "ERROR"
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
