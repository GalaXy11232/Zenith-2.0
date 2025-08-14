// netlify/functions/contact.js
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const API_KEY = process.env.STATICFORMS_API_KEY;
  const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

  if (!API_KEY || !RECAPTCHA_SECRET) {
    return { statusCode: 500, body: "Server misconfigured" };
  }

  // Parse form data
  const formData = new URLSearchParams(event.body || "");
  const recaptchaToken = formData.get("g-recaptcha-response");

  if (!recaptchaToken) {
    return { statusCode: 400, body: "Missing reCAPTCHA token" };
  }

  // Verify reCAPTCHA
  const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: RECAPTCHA_SECRET,
      response: recaptchaToken
    })
  });
  const recaptchaJson = await recaptchaRes.json();
  if (!recaptchaJson.success) {
    return { statusCode: 400, body: "reCAPTCHA verification failed" };
  }

  // Inject API key server-side
  formData.set("apiKey", API_KEY);

  // Forward to Static Forms
  const sfRes = await fetch("https://api.staticforms.xyz/submit", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString()
  });

  // const text = await sfRes.text();
  return {
    statusCode: 302,
    headers: {
      Location: "/thank-you.html"  // path to your custom thank-you page
    }
  };
  // return {
  //   statusCode: sfRes.status,
  //   body: text
  // };
}
