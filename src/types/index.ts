export * from "./pocketbase";
export * from "./enum";
export * from "./extend";
export * from "./store";

export interface User {
	collectionId: string;
	collectionName: string;
	created: Date;
	currency: string;
	email: string;
	emailVisibility: boolean;
	id: string;
	updated: Date;
	verified: boolean;
}
