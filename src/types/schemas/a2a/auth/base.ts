/**
 * @description Base properties shared by all security schemes.
 * @required type
 * @optional description
 */
export interface SecuritySchemeBase {
  /**
   * @required Type of the security scheme.
   */
  type: "apiKey" | "http" | "oauth2" | "openIdConnect" | "mutualTLS";

  /**
   * @optional Description of this security scheme.
   */
  description?: string;
}
