/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var isObject = require( '@stdlib/assert-is-plain-object' );
var isPositiveInteger = require( '@stdlib/assert-is-positive-integer' ).isPrimitive;
var isBoolean = require( '@stdlib/assert-is-boolean' ).isPrimitive;
var incrminmax = require( '@stdlib/stats-incr-minmax' );
var incrmeanstdev = require( '@stdlib/stats-incr-meanstdev' );
var setReadOnly = require( '@stdlib/utils-define-read-only-property' );
var setReadOnlyAccessor = require( '@stdlib/utils-define-read-only-accessor' );
var max = require( '@stdlib/math-base-special-max' );
var sqrt = require( '@stdlib/math-base-special-sqrt' );
var roundn = require( '@stdlib/math-base-special-roundn' );
var tQuantile = require( '@stdlib/stats-base-dists-t-quantile' );
var format = require( '@stdlib/string-format' );
var validate = require( './validate.js' );
var defaults = require( './defaults.js' );


// MAIN //

/**
* Returns an accumulator function which incrementally performs Grubbs' test for detecting outliers.
*
* @param {Options} [options] - function options
* @param {number} [options.alpha=0.05] - significance level
* @param {string} [options.alternative='two-sided'] - alternative hypothesis ('two-sided', 'min', 'max')
* @param {NonNegativeInteger} [options.init=100] - number of data points used to compute initial statistics
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {RangeError} `alpha` option must be on the interval `[0,1]`
* @returns {Function} accumulator function
*
* @example
* var rnorm = require( '@stdlib/random-base-normal' );
*
* var accumulator;
* var opts;
* var res;
* var i;
*
* opts = {
*     'init': 100
* };
*
* accumulator = incrgrubbs( opts );
*
* for ( i = 0; i < 200; i++ ) {
*     res = accumulator( rnorm( 10.0, 5.0 ) );
* }
*/
function incrgrubbs() {
	var meanstdev;
	var results;
	var minmax;
	var opts;
	var err;
	var mm;
	var ms;
	var gc;
	var df;
	var N;
	var G;

	opts = defaults();
	if ( arguments.length ) {
		err = validate( opts, arguments[ 0 ] );
		if ( err ) {
			throw err;
		}
	}
	// Initialize the results object:
	results = {};
	setReadOnlyAccessor( results, 'rejected', getRejected );
	setReadOnly( results, 'alpha', opts.alpha );
	setReadOnlyAccessor( results, 'criticalValue', getCriticalValue );
	setReadOnlyAccessor( results, 'statistic', getStatistic );
	setReadOnlyAccessor( results, 'df', getDOF );
	setReadOnlyAccessor( results, 'mean', getMean );
	setReadOnlyAccessor( results, 'sd', getStDev );
	setReadOnlyAccessor( results, 'min', getMin );
	setReadOnlyAccessor( results, 'max', getMax );
	setReadOnly( results, 'alt', opts.alternative );
	setReadOnly( results, 'method', 'Grubbs\' Test' );
	setReadOnly( results, 'print', print );

	N = 0;
	df = 0;
	G = 0.0;
	gc = 0.0;

	// Initialize statistics accumulators:
	mm = [ 0.0, 0.0 ];
	minmax = incrminmax( mm );

	ms = [ 0.0, 0.0 ];
	meanstdev = incrmeanstdev( ms );

	return accumulator;

	/**
	* If provided a value, the accumulator function returns updated Grubbs' test results. If not provided a value, the accumulator function returns the current Grubbs' test results.
	*
	* @private
	* @param {number} [x] - new value
	* @returns {(Object|null)} test results or null
	*/
	function accumulator( x ) {
		var sig;
		var md;
		var tc;
		if ( arguments.length === 0 ) {
			if ( N < opts.init || df <= 0 ) {
				return null;
			}
			return results;
		}
		N += 1;

		// Update model statistics:
		meanstdev( x );
		minmax( x );

		// Compute the degrees of freedom:
		df = N - 2;

		if ( N < opts.init || df <= 0 ) {
			return null;
		}
		// Compute the test statistic and significance level...
		if ( opts.alternative === 'min' ) {
			G = ( ms[0]-mm[0] ) / ms[ 1 ];
			sig = opts.alpha / N;
		} else if ( opts.alternative === 'max' ) {
			G = ( mm[1]-ms[0] ) / ms[ 1 ];
			sig = opts.alpha / N;
		} else { // two-sided
			md = max( ms[0]-mm[0], mm[1]-ms[0] ); // maximum absolute deviation
			G = md / ms[ 1 ];
			sig = opts.alpha / (2*N);
		}
		// Compute the critical values:
		tc = tQuantile( 1.0-sig, df );
		gc = (N-1)*tc / sqrt( N*(df+(tc*tc)) );

		return results;
	}

	/**
	* Returns a `boolean` indicating whether the null hypothesis should be rejected.
	*
	* @private
	* @returns {boolean} boolean indicating whether the null hypothesis should be rejected
	*/
	function getRejected() {
		return ( G > gc );
	}

	/**
	* Returns the critical value.
	*
	* @private
	* @returns {number} critical value
	*/
	function getCriticalValue() {
		return gc;
	}

	/**
	* Returns the test statistic.
	*
	* @private
	* @returns {number} test statistic
	*/
	function getStatistic() {
		return G;
	}

	/**
	* Returns the degrees of freedom (DOF).
	*
	* @private
	* @returns {PositiveInteger} degrees of freedom
	*/
	function getDOF() {
		return df;
	}

	/**
	* Returns the sample mean.
	*
	* @private
	* @returns {number} sample mean
	*/
	function getMean() {
		return ms[ 0 ];
	}

	/**
	* Returns the corrected sample standard deviation.
	*
	* @private
	* @returns {number} corrected sample standard deviation
	*/
	function getStDev() {
		return ms[ 1 ];
	}

	/**
	* Returns the sample minimum.
	*
	* @private
	* @returns {number} sample minimum
	*/
	function getMin() {
		return mm[ 0 ];
	}

	/**
	* Returns the sample maximum.
	*
	* @private
	* @returns {number} sample maximum
	*/
	function getMax() {
		return mm[ 1 ];
	}

	/**
	* Pretty-print test results.
	*
	* @private
	* @param {Object} [options] - options object
	* @param {PositiveInteger} [options.digits=4] - number of digits after the decimal point
	* @param {boolean} [options.decision=true] - boolean indicating whether to print the test decision
	* @throws {TypeError} options argument must be an object
	* @throws {TypeError} must provide valid options
	* @returns {string} formatted output
	*/
	function print( options ) {
		var decision;
		var digits;
		var str;

		digits = opts.digits;
		decision = opts.decision;
		if ( arguments.length > 0 ) {
			if ( !isObject( options ) ) {
				throw new TypeError( format( 'invalid argument. Must provide an object. Value: `%s`.', options ) );
			}
			if ( hasOwnProp( options, 'digits' ) ) {
				if ( !isPositiveInteger( options.digits ) ) {
					throw new TypeError( format( 'invalid option. `%s` option must be a positive integer. Option: `%s`.', 'digits', options.digits ) );
				}
				digits = options.digits;
			}
			if ( hasOwnProp( options, 'decision' ) ) {
				if ( !isBoolean( options.decision ) ) {
					throw new TypeError( format( 'invalid option. `%s` option must be a boolean. Option: `%s`.', 'decision', options.decision ) );
				}
				decision = options.decision;
			}
		}
		str = '';
		str += results.method;
		str += '\n\n';
		str += 'Alternative hypothesis: ';
		if ( opts.alternative === 'max' ) {
			str += 'The maximum value (' + mm[ 1 ] + ') is an outlier';
		} else if ( opts.alternative === 'min' ) {
			str += 'The minimum value (' + mm[ 0 ] + ') is an outlier';
		} else { // two-sided
			str += 'The ';
			if ( ms[0]-mm[0] > mm[1]-ms[0] ) {
				str += 'minimum value (' + mm[ 0 ] + ')';
			} else {
				str += 'maximum value (' + mm[ 1 ] + ')';
			}
			str += ' is an outlier';
		}
		str += '\n\n';
		str += '    criticalValue: ' + roundn( gc, -digits ) + '\n';
		str += '    statistic: ' + roundn( G, -digits ) + '\n';
		str += '    df: ' + df + '\n';
		str += '\n';
		if ( decision ) {
			str += 'Test Decision: ';
			if ( G > gc ) {
				str += 'Reject null in favor of alternative at ' + (opts.alpha*100.0) + '% significance level';
			} else {
				str += 'Fail to reject null in favor of alternative at ' + (opts.alpha*100.0) + '% significance level';
			}
			str += '\n';
		}
		return str;
	}
}


// EXPORTS //

module.exports = incrgrubbs;
