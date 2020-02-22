// Copyright 2018, Google, LLC.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/*! THIS FILE IS AUTO-GENERATED */

import {getAPI} from '../../shared/src';
import {videointelligence_v1} from './v1';
import {videointelligence_v1beta1} from './v1beta1';
import {videointelligence_v1beta2} from './v1beta2';

export const VERSIONS = {
  'v1': videointelligence_v1.Videointelligence,
  'v1beta1': videointelligence_v1beta1.Videointelligence,
  'v1beta2': videointelligence_v1beta2.Videointelligence,
};

export function videointelligence(version: 'v1'):
    videointelligence_v1.Videointelligence;
export function videointelligence(options: videointelligence_v1.Options):
    videointelligence_v1.Videointelligence;
export function videointelligence(version: 'v1beta1'):
    videointelligence_v1beta1.Videointelligence;
export function videointelligence(options: videointelligence_v1beta1.Options):
    videointelligence_v1beta1.Videointelligence;
export function videointelligence(version: 'v1beta2'):
    videointelligence_v1beta2.Videointelligence;
export function videointelligence(options: videointelligence_v1beta2.Options):
    videointelligence_v1beta2.Videointelligence;
export function videointelligence<
    T = videointelligence_v1.Videointelligence |
        videointelligence_v1beta1.Videointelligence |
        videointelligence_v1beta2.Videointelligence>(
    versionOrOptions: 'v1'|
    videointelligence_v1.Options|'v1beta1'|
    videointelligence_v1beta1.Options|'v1beta2'|
    videointelligence_v1beta2.Options) {
  return getAPI<T>('videointelligence', versionOrOptions, VERSIONS);
}
