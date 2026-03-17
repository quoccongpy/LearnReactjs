export function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const roleClaim =
      payload.role ||
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return {
      id: payload.sub || payload.nameid,
      userName:
        payload.unique_name ||
        payload.name ||
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      email: payload.email,
      fullName: payload.given_name,
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
