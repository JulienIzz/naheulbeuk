import { appEnv } from "#shared/appEnv";

export const buildR2Url = (r2Path: string) => `${appEnv.r2BaseUrl}/${r2Path}`;
