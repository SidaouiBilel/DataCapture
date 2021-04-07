import {environment} from "../environments/environment";

export let env :any = {};

export function updateConfig(config: any) {
    console.log(config);
    env = config ? config : environment;
}