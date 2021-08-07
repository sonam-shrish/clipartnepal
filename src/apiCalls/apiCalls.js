import { db } from '../firebase';

function getCategoriesArray() {
	const categoriesArr = [];

	(function () {
		db.collection('categories')
			.get()
			.then(({ docs }) => {
				docs.forEach((cat) => categoriesArr.push(cat.id));
			})
			.catch((error) => console.log(error));
	})();
	return categoriesArr;
}

function getSubCategoriesArray(categoryName) {
	const subCategoriesArray = [];

	(function () {
		db.collection('categories')
			.doc('animal')
			.get()
			.then((doc) => {
				doc
					.data()
					.subcategories.forEach((subCategory) =>
						subCategoriesArray.push(subCategory.name)
					);
			})
			.catch((error) => console.log(error));
	})();
	return subCategoriesArray;
}

export { getCategoriesArray, getSubCategoriesArray };
