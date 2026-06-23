export function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const roleClaim =
      payload.role ||
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return {
      id:
        payload.sub ||
        payload.nameid ||
        payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
      userName:
        payload.unique_name ||
        payload.name ||
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      email:
        payload.email ||
        payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
      fullName:
        payload.given_name ||
        payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
        ],
      phoneNumber:
        payload.phoneNumber ||
        payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"
        ],
      roles: roleClaim
        ? Array.isArray(roleClaim)
          ? roleClaim
          : [roleClaim]
        : [],
    };
  } catch {
    return null;
  }
}
