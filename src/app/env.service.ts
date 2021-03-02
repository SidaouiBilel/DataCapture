import {environment} from "../environments/environment";

export let env :any = {};

export function updateConfig(config: any) {
    env = config ? config : environment;
}