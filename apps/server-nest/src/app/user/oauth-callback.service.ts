import { Injectable } from "@nestjs/common";
import type { Response } from "express";

export interface OAuthCallbackParams {
  code?: string;
  state?: string;
  error?: string;
  errorDescription?: string;
}

@Injectable()
export class OAuthCallbackService {
  relayToApp(appRedirectUri: string, params: OAuthCallbackParams, res: Response) {
    const redirectUrl = new URL(appRedirectUri);

    if (params.error) {
      redirectUrl.searchParams.set("error", params.error);
      if (params.errorDescription) {
        redirectUrl.searchParams.set("error_description", params.errorDescription);
      }
      return res.redirect(307, redirectUrl.toString());
    }

    if (!params.code) {
      redirectUrl.searchParams.set("error", "AUTH_CODE_NOT_FOUND");
      return res.redirect(307, redirectUrl.toString());
    }

    redirectUrl.searchParams.set("code", params.code);
    if (params.state) {
      redirectUrl.searchParams.set("state", params.state);
    }

    return res.redirect(307, redirectUrl.toString());
  }
}
