const {OAuth2Client} = require("google-auth-library");


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleCredential(credential){
const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID
})
const payload = ticket.getPayload();
console.log("step 4",  payload)


if(!payload.email_verified){
    throw new Error("Google email not verified");
}
return{
    googleId:payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture
}

}

module.exports = {verifyGoogleCredential};