/**
 * @author reesington / codepen.io/reesington
 */

var valid = false, // Validity of general execution.
		numEpochs = 10,

// Set matrices A (input) and B (output).
		matrixA = [
			[[-1, 1, 1, 1, -1], // A
			 [-1, 1, -1, 1, -1],
			 [-1, 1, 1, 1, -1],
			 [-1, 1, -1, 1, -1],
			 [1, 1, -1, 1, 1]],

			[[-1, 1, 1, 1, 1], // B
			 [-1, 1, -1, -1, 1],
			 [-1, 1, -1, 1, -1],
			 [-1, 1, -1, -1, 1],
			 [-1, 1, 1, 1, -1]],

			[[-1, 1, 1, 1, -1], // C
			 [-1, 1, 1, 1, -1],
			 [1, 1, -1, -1, -1],
			 [-1, 1, 1, 1, -1],
			 [-1, 1, 1, 1, -1]],

			[[-1, 1, 1, 1, -1], // D
			 [-1, 1, 1, 1, 1],
			 [-1, 1, -1, -1, 1],
			 [-1, 1, 1, 1, 1],
			 [-1, 1, 1, 1, -1]],

			[[-1, 1, 1, 1, 1], // E
			 [-1, 1, -1, -1, -1],
			 [-1, 1, 1, 1, -1],
			 [-1, 1, -1, -1, -1],
			 [-1, 1, 1, 1, 1]] ],

		matrixB = [
			[[-1, 1, -1, 1, -1]], // A

			[[-1, 1, -1, -1, 1]], // B

			[[-1, 1, 1, 1, -1]], // C

			[[-1, 1, 1, 1, 1]], // D

			[[-1, 1, -1, -1, -1]] ]; // E

// Check that the matrices have vectors:
if (matrixA.length > 0 && matrixB.length > 0)
	valid = true;

// Check that all matrices have the same number of vectors (because they must be paired):
valid = checkMatrixLength(matrixA, matrixB);

// Check that all vectors belonging to the same set have the same length:
if (valid && checkVectorLength(matrixA) && checkVectorLength(matrixB))
	valid = true;

if (valid === true) {
	var patternPairs = matrixA.length,
			weights = createMatrix(matrixA[0].length, matrixB[0].length);

	// Calculate weight matrix:
	for (var i = 0; i < patternPairs; ++i) // For each pattern pair...
		weights = add(weights, multiply(matrixA[i], transpose(matrixB[i])));

	console.log("Weight matrix W = ");
	console.table(weights);

	// Test probes:
	for (i = 0; i < patternPairs; ++i) {
		console.log("Inputting A =")
		console.table(matrixA[i]);

		console.log("Results in B =")
		console.table(new Array (multiply(transpose(weights), matrixA[i])[0].map(sign)));

		console.log("Which should =")
		console.table(matrixB[i]);
	}
} else {
	console.log("ERROR: Matrices were not properly inputted.");
}

function checkMatrixLength(matrixA, matrixB) {
	if (matrixA.length !== matrixB.length) return false;

	return true;
}

// Returns false if not valid; true if valid
function checkVectorLength(matrix) {
	var length = matrix[0].length;

	for (var i = 1; i < matrix.length; ++i)
		if (length !== matrix[i].length) return false;

	return true;
}
