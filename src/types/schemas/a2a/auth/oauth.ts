/**
 * @description Configuration details for a supported Authorization Code OAuth Flow
 * @required authorizationUrl
 * @required tokenUrl
 * @optional refreshUrl
 * @required scopes
 */
export interface AuthorizationCodeOAuthFlow {
  /**
   * @required The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2
   * standard requires the use of TLS
   */
  authorizationUrl: string;

  /**
   * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
   * requires the use of TLS.
   */
  tokenUrl: string;

  /**
   * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
   * standard requires the use of TLS.
   */
  refreshUrl?: string;

  /**
   * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
   * description for it. The map MAY be empty.
   */
  scopes: Record<string, string>;
}

/**
 * @description Configuration details for a supported Client Credentials OAuth Flow
 * @required tokenUrl
 * @optional refreshUrl
 * @required scopes
 */
export interface ClientCredentialsOAuthFlow {
  /**
   * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
   * requires the use of TLS.
   */
  tokenUrl: string;

  /**
   * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
   * standard requires the use of TLS.
   */
  refreshUrl?: string;

  /**
   * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
   * description for it. The map MAY be empty.
   */
  scopes: Record<string, string>;
}

/**
 * @description Configuration details for a supported Implicit OAuth Flow
 * @required authorizationUrl
 * @optional refreshUrl
 * @required scopes
 */
export interface ImplicitOAuthFlow {
  /**
   * @required The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2
   * standard requires the use of TLS
   */
  authorizationUrl: string;

  /**
   * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
   * standard requires the use of TLS.
   */
  refreshUrl?: string;

  /**
   * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
   * description for it. The map MAY be empty.
   */
  scopes: Record<string, string>;
}

/**
 * @description Configuration details for a supported Password OAuth Flow
 * @required tokenUrl
 * @optional refreshUrl
 * @required scopes
 */
export interface PasswordOAuthFlow {
  /**
   * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
   * requires the use of TLS.
   */
  tokenUrl: string;

  /**
   * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
   * standard requires the use of TLS.
   */
  refreshUrl?: string;

  /**
   * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
   * description for it. The map MAY be empty.
   */
  scopes: Record<string, string>;
}

/**
 * @description The configuration of supported OAuth Flows
 * @optional authorizationCode
 * @optional clientCredentials
 * @optional implicit
 * @optional password
 */
export interface OAuthFlows {
  /**
   * @optional Configuration for the OAuth Authorization Code flow. Previously called accessCode in OpenAPI 2.0.
   */
  authorizationCode?: AuthorizationCodeOAuthFlow;

  /**
   * @optional Configuration for the OAuth Client Credentials flow. Previously called application in OpenAPI 2.0
   */
  clientCredentials?: ClientCredentialsOAuthFlow;

  /**
   * @optional Configuration for the OAuth Implicit flow
   */
  implicit?: ImplicitOAuthFlow;

  /**
   * @optional Configuration for the OAuth Resource Owner Password flow
   */
  password?: PasswordOAuthFlow;
}
