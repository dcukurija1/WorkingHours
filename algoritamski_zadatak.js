const createUniqueStructure = (arr) => {
	// Kreiraj novi objekt kako bismo pratili broj pojavljivanja vrijednosti
	const count = {};

	// Prebroji pojavljivanja vrijednosti i popuni count objekt
	// n intaracija
	arr.forEach((obj) => {
		const value = obj.value;
		if (count[value]) {
			count[value]++;
		} else {
			count[value] = 1;
		}
	});
	// Pronađi prvi sljedeći cijeli broj koji se ne javlja u nizu
	// k iteracija, k max n
	let nextNumber = 1;
	while (count[nextNumber]) {
		nextNumber++;
	}

	// Pronađi prvi broj koji ima barem 2 pojavljivanja i nije veći od nextNumber
	// m intaracija, m max n
	let candidate = nextNumber + 1;
	while (count[candidate] >= 2 || count[candidate]) {
		candidate++;
	}
	// kompleksnost O(n+k+m)
	//u najgorem slucaju O(3n) = O(n)
	return { id: arr.length + 1, value: candidate };
}

// Testiranje rješenja
const arr = [
	{ id: 1, value: 3 },
	{ id: 2, value: 7 },
	{ id: 3, value: 3 },
	{ id: 4, value: 1 },
	{ id: 5, value: 4 },
];

const uniqueStructure = createUniqueStructure(arr);
console.log(uniqueStructure);
