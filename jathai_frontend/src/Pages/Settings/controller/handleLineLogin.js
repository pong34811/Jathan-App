const handleLineLogin = () => {
    const clientId = "2006885737";
    const redirectUri = encodeURIComponent("https://janhai.space/settings");
    const state = Math.random().toString(36).substring(7);
    const nonce = Math.random().toString(36).substring(7);
    const scope = "profile%20openid";
  
    // Store state and nonce in sessionStorage for validation
    sessionStorage.setItem("lineLoginState", state);
    sessionStorage.setItem("lineLoginNonce", nonce);
  
    const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}&nonce=${nonce}`;
    window.location.href = lineLoginUrl;
  };
  
  export default handleLineLogin;
  