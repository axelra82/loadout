import { Setter, Resource, Accessor } from "solid-js";
import { Collections, DateRangePreset } from "./enum";
import {
	CompaniesCollectionModel,
	CurrenciesCollectionModel,
	TagsCollectionModel,
	TransactionsCollectionModel,
} from "./pocketbase";
import { ListResult } from "pocketbase";
import { CalendarDate } from "@internationalized/date";

export interface StoreFactoryProps {
	storeItem: Setter<any>;
	collection: Collections;
	getOne?: {
		id: string;
		field: string;
	};
	fullList?: boolean;
	listPage?: number;
	listPerPage?: number;
	options?: Record<string, string>;
};

export type ResourceHelper<T> = T & { disabled: false };

export interface StoreContextType {
	allTimeExpense: Accessor<number>;
	allTimeExpenseSet: Setter<number>;
	allTimeIncome: Accessor<number>;
	allTimeIncomeSet: Setter<number>;
	transactions: Resource<ListResult<ResourceHelper<TransactionsCollectionModel>>>;
	transactionsSet: Setter<ListResult<ResourceHelper<TransactionsCollectionModel>> | undefined>;
	transactionsRead: (filter?: string) => Promise<void>;
	currencies: Resource<ResourceHelper<CurrenciesCollectionModel>[]>;
	currenciesSet: Setter<ResourceHelper<CurrenciesCollectionModel>[] | undefined>;
	currenciesRead: () => Promise<void>;
	companies: Resource<ResourceHelper<CompaniesCollectionModel>[]>;
	companiesSet: Setter<ResourceHelper<CompaniesCollectionModel>[] | undefined>;
	companiesRead: () => Promise<void>;
	tags: Resource<ResourceHelper<TagsCollectionModel>[]>;
	tagsSet: Setter<ResourceHelper<TagsCollectionModel>[] | undefined>;
	tagsRead: () => Promise<void>;
};
