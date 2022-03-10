/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import { ENGINE } from '../engine';
import { Cumprod, CumprodAttrs, CumprodInputs } from '../kernel_names';
import { NamedAttrMap } from '../kernel_registry';
import { Tensor } from '../tensor';
import { NamedTensorMap } from '../tensor_types';
import { convertToTensor } from '../tensor_util_env';
import { TensorLike } from '../types';

import { op } from './operation';

/**
 * Computes the cumulative product of a `tf.Tensor` along `axis`.
 *
 * ```js
 * const x = tf.tensor([1, 2, 3, 4]);
 * x.cumprod().print();
 * ```
 * ```js
 * const x = tf.tensor([[1, 2], [3, 4]]);
 * x.cumprod().print();
 * ```
 *
 * @param x The input tensor to be summed.
 * @param axis The axis along which to multiply. Optional. Defaults to 0.
 * @param exclusive Whether to perform exclusive cumulative product. Optional.
 *     Defaults to false. If set to true then the product of each tensor entry
 *     does not include its own value, but only the values previous to it
 *     along the specified axis.
 * @param reverse Whether to multiply in the opposite direction. Optional.
 *     Defaults to false.
 *
 * @doc {heading: 'Operations', subheading: 'Scan'}
 */
function cumprod_<T extends Tensor>(
  x: Tensor | TensorLike,
  axis = 0,
  exclusive = false,
  reverse = false
): T {
  const $x = convertToTensor(x, 'x', 'cumprod');

  const inputs: CumprodInputs = { x: $x };
  const attrs: CumprodAttrs = { axis, exclusive, reverse };

  return ENGINE.runKernel(
    Cumprod,
    inputs as {} as NamedTensorMap,
    attrs as {} as NamedAttrMap
  );
}

export const cumprod = op({ cumprod_ });
