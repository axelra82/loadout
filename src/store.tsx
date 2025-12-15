
import { pb } from "./pocketbase";
import {
	AllTimeExpenseView,
	AllTimeIncomeView,
	Collections,
	CompaniesCollectionModel,
	CurrenciesCollectionModel,
	ResourceHelper,
	StoreContextType,
	StoreFactoryProps,
	TagsCollectionModel,
	TransactionsCollectionModel,
} from "./types";
import {
	createContext,
	createResource,
	createSignal,
	JSX,
	useContext,
} from "solid-js";
import { ListResult } from "pocketbase";

const [
	transactions,
	{
		mutate: transactionsSet,
	}
] = createResource<ListResult<ResourceHelper<TransactionsCollectionModel>>>(() => ({
	items: [],
	totalItems: 0,
	page: 0,
	perPage: 0,
	totalPages: 0,
}));

const [
	currencies,
	{
		mutate: currenciesSet,
	}
] = createResource<ResourceHelper<CurrenciesCollectionModel>[]>(() => []);

const [
	companies,
	{
		mutate: companiesSet,
	}
] = createResource<ResourceHelper<CompaniesCollectionModel>[]>(() => []);

const [
	tags,
	{
		mutate: tagsSet,
	}
] = createResource<ResourceHelper<TagsCollectionModel>[]>(() => []);

async function storeFactory<T>(props: StoreFactoryProps) {
	if (props.getOne) {
		const {
			id,
			field,
		} = props.getOne;

		const response = await pb
			.collection<T>(props.collection)
			.getOne(id, props.options);

		props.storeItem(() => field ? (response as Record<string, string>)[field] : response);
		return;
	}

	if (props.fullList) {
		const response = await pb
			.collection<T>(props.collection)
			.getFullList(props.options);

		props.storeItem(response.map((item) => ({
			...item,
			disabled: false,
		})));
	} else {
		const response = await pb
			.collection<T>(props.collection)
			.getList(
				props.listPage,
				props.listPerPage,
				props.options,
			);

		props.storeItem({
			...response,
			items: response.items.map((item) => (
				{
					...item,
					disabled: false,
				}
			)),
		});
	}
};

const [allTimeExpense, allTimeExpenseSet] = createSignal(0);

const [allTimeIncome, allTimeIncomeSet] = createSignal(0);

const allTimeExpenseRead = () => storeFactory<AllTimeExpenseView>({
	storeItem: allTimeExpenseSet,
	collection: Collections.ALL_TIME_EXPENSE,
	getOne: {
		id: "total",
		field: "amount",
	},
});

const allTimeIncomeRead = () => storeFactory<AllTimeIncomeView>({
	storeItem: allTimeIncomeSet,
	collection: Collections.ALL_TIME_INCOME,
	getOne: {
		id: "total",
		field: "amount",
	},
});

const transactionsRead = (filter?: string) => storeFactory<ResourceHelper<TransactionsCollectionModel>>({
	storeItem: transactionsSet,
	collection: Collections.TRANSACTIONS,
	listPerPage: 99,
	options: {
		// Default to filter entries by current month.
		...filter && { filter },
		sort: "-date",
	},
});

const currenciesRead = () => storeFactory<ResourceHelper<CurrenciesCollectionModel>>({
	storeItem: currenciesSet,
	collection: Collections.CURRENCIES,
	fullList: true,
	options: {
		sort: "created",
	},
});

const companiesRead = () => storeFactory<ResourceHelper<CompaniesCollectionModel>>({
	storeItem: companiesSet,
	collection: Collections.COMPANIES,
	fullList: true,
	options: {
		fields: "id, title, image, url",
		sort: "title",
	},
});

const tagsRead = () => storeFactory<ResourceHelper<TagsCollectionModel>>({
	storeItem: tagsSet,
	collection: Collections.TAGS,
	fullList: true,
	options: {
		fields: "id, title",
		sort: "title",
	},
});

const storeContextValue = {
	allTimeExpense,
	allTimeExpenseSet,
	allTimeIncome,
	allTimeIncomeSet,
	transactions,
	transactionsSet,
	transactionsRead,
	currencies,
	currenciesSet,
	currenciesRead,
	companies,
	companiesSet,
	companiesRead,
	tags,
	tagsSet,
	tagsRead,
}

const StoreContext = createContext<StoreContextType>(storeContextValue);

export const StoreContextProvider = (props: { children: JSX.Element }) => (
	<StoreContext.Provider value={storeContextValue}>
		{props.children}
	</StoreContext.Provider>
);

export const useStore = () => {
	const store = useContext(StoreContext);

	if (!store && !pb.authStore.isValid) {
		throw new Error("Can't continue without store data.");
	}

	return store;
};

/**
	* Run all queries and set store data.
	*/
export const populateStore = () => {
	allTimeExpenseRead();
	allTimeIncomeRead();
	transactionsRead();
	currenciesRead();
	companiesRead();
	tagsRead();
};

export const deleteRecord = (collection: Collections, id: string) => {
	try {
		pb.collection(collection).delete(id);

		const store = useStore();
		let current;
		let setter: any;

		switch (collection) {
			case Collections.TRANSACTIONS:
				current = store.transactions();
				setter = store.transactionsSet;
				break;

			case Collections.CURRENCIES:
				current = store.currencies();
				setter = store.currenciesSet;
				break;

			case Collections.COMPANIES:
				current = store.companies();
				setter = store.companiesSet;
				break;

			case Collections.TAGS:
				current = store.tags();
				setter = store.tagsSet;
				break;

			default:
				break;
		}

		if (current && setter) {
			if ("items" in current) {
				setter({
					...current,
					items: (current.items as []).filter(({ id: itemId }) => itemId !== id),
				});
			} else {
				setter(current.filter(({ id: itemId }) => itemId !== id));
			}
		}
	} catch (error) {
		console.error("Error: ", error);
	}
}
