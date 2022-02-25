/**
 * Used for checkout
 * Format the aggregation result, and check if any product
 *    doesn't satisfy required condition, return is Correct = false
 */
module.exports = function (array) {
	const newArray = []

	for (let i = 0; i < array.length; i++) {
		if (array[i].length > 0) {
			newArray.push(...array[i])
		} else {
			return { newArray, isCorrect: false }
		}
	}
	return { newArray, isCorrect: true }
}
