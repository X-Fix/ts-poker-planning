import { forEach, filter, findIndex, isEmpty } from 'lodash';
import { API_ENDPOINTS } from './constants';

/**
 * Route Parser
 * Detects which page component the router.js component should be serving based on the hash value. Hash value is used rather
 * than actual routes as single page applications technically only have one route. Using hash routes at all allows us to retain
 * use of the browser history object.
 */
export const getCurrentRoute = () => {
	const hash = window.location.hash;
	if (hash === "") return "JoinRoom";
	if (hash.indexOf("/", 2) === -1) return hash.substring(2, hash.substring(2).includes("?") ? hash.indexOf("?") : hash.length) || "JoinRoom";
	else return hash.substring(2, hash.indexOf("/", 2)) || "JoinRoom";
}

/**
 * Query Param Getter
 * Looks in the URL string for a query param matching the given string
 */
export const getQueryParam = (search) => {
	let str = window.location.hash || window.location.search;
	if (!search || !str.includes(search)) return null;

	let searchStart = str.includes("?"+search) ? str.indexOf("?"+search+"=")+search.length+2 : str.indexOf("&"+search+"=")+search.length+2,
		searchEnd = str.indexOf("&", searchStart);

	return decodeURI(str.substring(searchStart, searchEnd > 0 ? searchEnd : str.length));
}

/**
 * Endpoint Name Getter
 * Request names and endpoints are linked in the constants/API_ENDPOINTS object so it's easy to get the endpoints from the name
 * but this method allows us to discern the request name from the endpoint value
 */
export const getRequestName = (url) => {
	let props = Object.getOwnPropertyNames(API_ENDPOINTS);
	for (let i=0; i<props.length; i++) {
		if (url.includes(API_ENDPOINTS[props[i]])) return props[i];
	}
}

/**
 * sessionStorage Manager
 * sessionStorage isn't always accessible (private browsing, no space, etc) so these methods test if sessionStorage is available and
 * if not, fall back an a pojo stored here
 */
let backUpStorage = {}
export const setStorageItem = (key, value) => {
	if (isEmpty(value)) {
		sessionStorage.removeItem(key);
		backUpStorage[key] = undefined;
	} else {
		try {
			sessionStorage.setItem(key, value);
		} catch (e) {
			backUpStorage[key] = value;
		}
	}
}

export const getStorageItem = (key) => {
	try {
		return sessionStorage.getItem(key);
	} catch (e) {
		return backUpStorage[key];
	}
}


/**
 * Mixed Text Sorter
 * When sorting strings, numbers are sorted lexicographically (by position, ie. by digit, from left-to-right eg. 1, 11, 12, 2, 21 Instead of 1, 2, 11, 12, 21)
 * This method looks out for numbers in a string and, if the substring before the numbers is identical, sorts by the integer values of the number.
 * This function assumes that all objects in the array are of the same type as the first.
 */

let regex = /\d+/g;
export const sortMixedStrings = (arr, property) => {
	if (!arr || arr.length < 2) return arr;
	if (!property && typeof arr[0] === 'object') throw "No object property specified";
	if (property && typeof arr[0] === 'string') throw "Property provided for String array, string.property === undefined";
	return arr.sort(function (a, b) {
		let strA = property ? a[property] : a,
			strB = property ? b[property] : b,
			foundA = strA ? strA.match(regex) : null,
			foundB = strB ? strB.match(regex) : null;

		if (!foundA || !foundB) return compare(strA, strB);

		let total = 0;
		for (let i=0;i<foundA.length;i++) {
			if (!foundA[i] || !foundB[i]) return compare(strA, strB);
			let preA = strA.substring(0, strA.indexOf(foundA[i])),
				preB = strB.substring(0, strB.indexOf(foundB[i])),
				intA = parseInt(foundA[i]),
				intB = parseInt(foundB[i]);

			if (preA !== preB) return compare(preA, preB);
			else if (intA !== intB) return compare(intA,intB);
		}
	});
}

const compare = (a, b) => {
	return a < b ? -1 : a == b ? 0 : 1;
}