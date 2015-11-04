/**
 * @author reesington / codepen.io/reesington
 */

/**
 * Use the inputs to calculate the desired output of logical AND, OR, and XOR by specifying type.
 * @param {array} inputs
 * @param {string} type
 * @returns {array}
 */
function calcDesiredOutput(inputs, type) {
	var output = 0;

	for (var i = 0; i < inputs.length - 1; ++i) {
		if (!output) output = inputs[i];

		if (type === 'or') output = output || inputs[i + 1];
		else if (type === 'and') output = output && inputs[i + 1];
		else if (type === 'xor') output = xor(output, inputs[i + 1]);
	}

	return output;
}

/**
 * Performs a logical XOR operation.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function xor(a, b) {
	if ((a && !b) || (!a && b)) return 1;
	else return 0;
}

/**
 * Combines inputs and weights at a dimension i to later perform a given activation function.
 * @param {array} inputs
 * @param {array} weights
 * @param {number} threshold
 * @param {string} type
 * @returns {number}
 */
function activate(inputs, weights, threshold, type) {
	var output = 0;

	for (var i = 0; i < inputs.length; ++i)
		output += inputs[i] * weights[i];

	output -= threshold;

	// Groom output according to type of applied function:
	if (type === 'step') return step(output, threshold);
	else if (type === 'sign') return sign(output, threshold);
	else if (type === 'sigmoid') return sigmoid(output);
	else if (type === 'linear') return output.toFixed(3);
}

/**
 * Performs a step function.
 * @param {number} output
 * @param {number} threshold
 * @returns {number}
 */
function step(output, threshold) {
	if (output >= threshold) return 1;
	else return 0;
}

/**
 * Performs a sign function.
 * @param {number} output
 * @param {number} threshold
 * @returns {number}
 */
function sign(output, threshold) {
	if (output >= threshold) return 1;
	else return -1;
}

/**
 * Performs a sigmoid function.
 * @param {number} output
 * @returns {number}
 */
function sigmoid(output) {
	return (1 / (1 + Math.pow(Math.E, -output))).toFixed(3);
}

/**
 * Calculates error by considering desired output vs actual output.
 * @param {number} desiredOutput
 * @param {number} actualOutput
 * @returns {number}
 */
function calcError(desiredOutput, actualOutput) {
	var error = desiredOutput - actualOutput;

	if (error != Math.floor(error)) error = error.toFixed(3);

	return error;
}

/**
 * Trains each weight at dimension i.
 * @param {array} inputs
 * @param {array} weights
 * @param {number} threshold
 * @param {number} learningRate
 * @param {number} error
 * @returns {array}
 */
function trainWeight(inputs, weights, threshold, learningRate, error) {
	var newWeights = [];

	for (var i = 0; i < inputs.length; ++i)
		newWeights.push(parseFloat((weights[i] + learningRate * inputs[i] * error).toFixed(3)));

	return newWeights;
}
