/**
 * @author reesington / codepen.io/reesington
 */

var numEpochs = 1,
		valid = false, // Validity of general execution.

// Set matrices A and B.
		matrixA = [
								[[1],
								 [1],
								 [1],
								 [1],
								 [1],
								 [1]],

								[[-1],
 								 [-1],
 								 [-1],
 								 [-1],
 								 [-1],
 								 [-1]],

								[[1],
 								 [1],
 								 [-1],
 								 [-1],
 								 [1],
 								 [1]],

								[[-1],
  							 [-1],
  							 [1],
  							 [1],
  							 [-1],
  							 [-1]]
							 ],

		matrixB = [
								[[1],
								 [1],
								 [1]],

								[[-1],
 								 [-1],
 								 [-1]],

								[[1],
 								 [-1],
 								 [1]],

								[[-1],
 								 [1],
 								 [-1]]
							];

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

	for (i = 0; i < numEpochs; ++i) { // For each epoch...
		for (var j = 0; j < patternPairs; ++j) { // For each pattern pair...
			console.log("Given matrix A =")
			console.table(matrixA[j]);
			console.log("Given matrix B =")
			console.table(matrixB[j]);

			weights = add(weights, multiply(matrixA[j], transpose(matrixB[j])));

			console.log("Update to weight matrix W = ");
			console.table(weights);
		}
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
