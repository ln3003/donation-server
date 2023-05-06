const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "Afcy4j0Eu1lI3F4dUlva5m16aobLdN0yl4ktt5hRvPUAGJnVTSFRzucZjz70L6wccBXhZ2cmtw0llpXU",
  client_secret:
    "EA-EAus19ROCgIygXAdACjtSo81ioyY3E6Dt2Z7jBycUxnITeG7UPWNjmAZCJWmaW79TbKrl9sDRsVwh",
});

module.exports = paypal;
