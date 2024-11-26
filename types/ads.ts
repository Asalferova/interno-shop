import type { FilterDefault } from "./filter";
import type { Locale } from "./languages";

export interface Banner {
	imageUrl: string;
	url: string;
	locale: Locale;
	$id: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: string[];
	$databaseId: string;
	$collectionId: string;
}

export interface BannersFetchResponse {
	total: number;
	documents: Banner[];
}

export namespace AdsApi {
	export namespace BannersList {
		export type RequestDTO = FilterDefault[];
		export type ResponseDTO = BannersFetchResponse;
	}
}

export enum AdsStatus {
	Active = "ACTIVE",
	Draft = "DRAFT",
}

export enum MenuAction {
	Edit = "edit",
	Complete = "COMPLETED",
	Delete = "delete",
	Recover = "ACTIVE",
	HotOffer = "HOT_OFFER",
}

export interface MenuItemInterface {
	name: string;
	actionName: MenuAction;
}
