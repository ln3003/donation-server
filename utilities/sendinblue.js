var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
const sendInBlueKey = require("../keyApi");

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = sendInBlueKey;

// Uncomment below two lines to configure authorization using: partner-key
// var partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR API KEY';

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = (name, email, newPassword) => {
  apiInstance
    .sendTransacEmail({
      subject: "Your new password",
      sender: { email: "nghia@ngh.one", name: "Donation Project" },
      replyTo: { email: "nghia@ngh.one", name: "Donation Project" },
      to: [{ name: name, email: email }],
      htmlContent: `<h1>Your new password</h1><p>{{params.newPassword}}</p>`,
      params: {
        newPassword,
      },
    })
    .then(
      function (data) {
        console.log("API called successfully. Returned data: " + data);
      },
      function (error) {
        console.error(error);
      }
    );
};

module.exports = sendEmail;
