export interface CompaniesCollectionModel {
	created: Date;
	description?: string;
	id: string;
	image?: string;
	title: string;
	updated: Date;
	url?: string;
}

export interface CurrenciesCollectionModel {
	created: Date;
	id: string;
	code: string;
	name: string;
	namePlural: string;
	symbol: string;
	symbolNative: string;
	updated: Date;
}

export interface LineItemsCollectionModel {
	amount: number;
	company?: string;
	created: Date;
	currency: string;
	date: Date;
	id: string;
	owner: string;
	tags?: string[];
	tax?: number;
	transaction: string;
	updated: Date;
}

export interface TagsCollectionModel {
	created: Date;
	description?: string;
	id: string;
	title: string;
	updated: Date;
}

export interface TransactionsCollectionModel {
	amount: number;
	company?: string;
	created: Date;
	currency: string;
	date: Date;
	note?: string;
	expense: boolean;
	id: string;
	owner: {};
	lineItems?: string[];
	tags: string[];
	tax?: number;
	update: Date;
}

export interface AllTimeExpenseView {
	amount: number;
	collectionId: string;
	collectionName: string;
	id: string;
}

export interface AllTimeIncomeView {
	amount: number;
	collectionId: string;
	collectionName: string;
	id: string;
}

export interface YearsExpenseView {
	[key: string]: number;
}

export interface YearsIncomeView {
	[key: string]: number;
}

export interface MonthsExpenseView {
	[key: string]: number;
}

export interface MonthsIncomeView {
	[key: string]: number;
}

export interface TransactionsLineItemsSumView {
	[key: string]: number;
}
