import { db } from '../firebase';

function getClipartDetails(clipartName) {
	const clipartDetails = db
		.collection('data')
		.doc('Flag-of-Bhutan.-Bhutan-flag')
		.get()
		.then((doc) => {
			return doc.data();
		});

	return clipartDetails;
}

function getCategoriesArray() {
	const categoriesArr = [];

	(function () {
		db.collection('categories')
			.get()
			.then(({ docs }) => {
				docs.forEach((cat) => categoriesArr.push(cat.id));
				console.log(categoriesArr);
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

async function getTags(clipartName) {
	const tags = await db
		.collection('data')
		.doc('Flag-of-Bhutan.-Bhutan-flag')
		.get()
		.then((doc) => {
			return doc.data().tags;
		});
	return tags;
}

export {
	getClipartDetails,
	getCategoriesArray,
	getSubCategoriesArray,
	getTags,
};
