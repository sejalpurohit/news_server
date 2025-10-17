const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
	if (!created_at) return { ...otherProperties };
	return { created_at: new Date(created_at), ...otherProperties };
};

exports.transformToDictionary = (arr, key, value) => {
	const lookUpObj = {};
	arr.forEach((obj) => {
		lookUpObjkey = obj[key];
		lookUpObjValue = obj[value];
		lookUpObj[lookUpObjkey] = lookUpObjValue;
	});


  return lookUpObj;
};
