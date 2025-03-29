import { Community_Mods } from "./community_mods"
import { Community_Rules } from "./community_rules"

export type Communities = {
    id: number,
	user_id: number,
    name: string,
	description: string,
	created_at: Date,
    public_visible: boolean,
    rules?: Community_Rules[],
    mods?: Community_Mods[]
}