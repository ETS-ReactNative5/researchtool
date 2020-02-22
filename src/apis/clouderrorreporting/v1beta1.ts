/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {AxiosPromise} from 'axios';
import {Compute, JWT, OAuth2Client, UserRefreshClient} from 'google-auth-library';

import {BodyResponseCallback, createAPIRequest, GlobalOptions, GoogleConfigurable, MethodOptions} from '../../shared/src';

// tslint:disable: no-any
// tslint:disable: class-name
// tslint:disable: variable-name
// tslint:disable: jsdoc-format
// tslint:disable: no-namespace

export namespace clouderrorreporting_v1beta1 {
  export interface Options extends GlobalOptions {
    version: 'v1beta1';
  }

  /**
   * Stackdriver Error Reporting API
   *
   * Groups and counts similar errors from cloud services and applications,
   * reports new errors, and provides access to error groups and their
   * associated errors.
   *
   * @example
   * const {google} = require('googleapis');
   * const clouderrorreporting = google.clouderrorreporting('v1beta1');
   *
   * @namespace clouderrorreporting
   * @type {Function}
   * @version v1beta1
   * @variation v1beta1
   * @param {object=} options Options for Clouderrorreporting
   */
  export class Clouderrorreporting {
    _options: GlobalOptions;
    google: GoogleConfigurable;
    root = this;

    projects: Resource$Projects;

    constructor(options: GlobalOptions, google: GoogleConfigurable) {
      this._options = options || {};
      this.google = google;
      this.getRoot.bind(this);

      this.projects = new Resource$Projects(this);
    }

    getRoot() {
      return this.root;
    }
  }

  /**
   * Response message for deleting error events.
   */
  export interface Schema$DeleteEventsResponse {}
  /**
   * A description of the context in which an error occurred. This data should
   * be provided by the application when reporting an error, unless the error
   * report has been generated automatically from Google App Engine logs.
   */
  export interface Schema$ErrorContext {
    /**
     * The HTTP request which was processed when the error was triggered.
     */
    httpRequest?: Schema$HttpRequestContext;
    /**
     * The location in the source code where the decision was made to report the
     * error, usually the place where it was logged. For a logged exception this
     * would be the source line where the exception is logged, usually close to
     * the place where it was caught.
     */
    reportLocation?: Schema$SourceLocation;
    /**
     * Source code that was used to build the executable which has caused the
     * given error message.
     */
    sourceReferences?: Schema$SourceReference[];
    /**
     * The user who caused or was affected by the crash. This can be a user ID,
     * an email address, or an arbitrary token that uniquely identifies the
     * user. When sending an error report, leave this field empty if the user
     * was not logged in. In this case the Error Reporting system will use other
     * data, such as remote IP address, to distinguish affected users. See
     * `affected_users_count` in `ErrorGroupStats`.
     */
    user?: string;
  }
  /**
   * An error event which is returned by the Error Reporting system.
   */
  export interface Schema$ErrorEvent {
    /**
     * Data about the context in which the error occurred.
     */
    context?: Schema$ErrorContext;
    /**
     * Time when the event occurred as provided in the error report. If the
     * report did not contain a timestamp, the time the error was received by
     * the Error Reporting system is used.
     */
    eventTime?: string;
    /**
     * The stack trace that was reported or logged by the service.
     */
    message?: string;
    /**
     * The `ServiceContext` for which this error was reported.
     */
    serviceContext?: Schema$ServiceContext;
  }
  /**
   * Description of a group of similar error events.
   */
  export interface Schema$ErrorGroup {
    /**
     * Group IDs are unique for a given project. If the same kind of error
     * occurs in different service contexts, it will receive the same group ID.
     */
    groupId?: string;
    /**
     * The group resource name. Example:
     * &lt;code&gt;projects/my-project-123/groups/my-groupid&lt;/code&gt;
     */
    name?: string;
    /**
     * Associated tracking issues.
     */
    trackingIssues?: Schema$TrackingIssue[];
  }
  /**
   * Data extracted for a specific group based on certain filter criteria, such
   * as a given time period and/or service filter.
   */
  export interface Schema$ErrorGroupStats {
    /**
     * Service contexts with a non-zero error count for the given filter
     * criteria. This list can be truncated if multiple services are affected.
     * Refer to `num_affected_services` for the total count.
     */
    affectedServices?: Schema$ServiceContext[];
    /**
     * Approximate number of affected users in the given group that match the
     * filter criteria. Users are distinguished by data in the `ErrorContext` of
     * the individual error events, such as their login name or their remote IP
     * address in case of HTTP requests. The number of affected users can be
     * zero even if the number of errors is non-zero if no data was provided
     * from which the affected user could be deduced. Users are counted based on
     * data in the request context that was provided in the error report. If
     * more users are implicitly affected, such as due to a crash of the whole
     * service, this is not reflected here.
     */
    affectedUsersCount?: string;
    /**
     * Approximate total number of events in the given group that match the
     * filter criteria.
     */
    count?: string;
    /**
     * Approximate first occurrence that was ever seen for this group and which
     * matches the given filter criteria, ignoring the time_range that was
     * specified in the request.
     */
    firstSeenTime?: string;
    /**
     * Group data that is independent of the filter criteria.
     */
    group?: Schema$ErrorGroup;
    /**
     * Approximate last occurrence that was ever seen for this group and which
     * matches the given filter criteria, ignoring the time_range that was
     * specified in the request.
     */
    lastSeenTime?: string;
    /**
     * The total number of services with a non-zero error count for the given
     * filter criteria.
     */
    numAffectedServices?: number;
    /**
     * An arbitrary event that is chosen as representative for the whole group.
     * The representative event is intended to be used as a quick preview for
     * the whole group. Events in the group are usually sufficiently similar to
     * each other such that showing an arbitrary representative provides insight
     * into the characteristics of the group as a whole.
     */
    representative?: Schema$ErrorEvent;
    /**
     * Approximate number of occurrences over time. Timed counts returned by
     * ListGroups are guaranteed to be:  - Inside the requested time interval -
     * Non-overlapping, and - Ordered by ascending time.
     */
    timedCounts?: Schema$TimedCount[];
  }
  /**
   * HTTP request data that is related to a reported error. This data should be
   * provided by the application when reporting an error, unless the error
   * report has been generated automatically from Google App Engine logs.
   */
  export interface Schema$HttpRequestContext {
    /**
     * The type of HTTP request, such as `GET`, `POST`, etc.
     */
    method?: string;
    /**
     * The referrer information that is provided with the request.
     */
    referrer?: string;
    /**
     * The IP address from which the request originated. This can be IPv4, IPv6,
     * or a token which is derived from the IP address, depending on the data
     * that has been provided in the error report.
     */
    remoteIp?: string;
    /**
     * The HTTP response status code for the request.
     */
    responseStatusCode?: number;
    /**
     * The URL of the request.
     */
    url?: string;
    /**
     * The user agent information that is provided with the request.
     */
    userAgent?: string;
  }
  /**
   * Contains a set of requested error events.
   */
  export interface Schema$ListEventsResponse {
    /**
     * The error events which match the given request.
     */
    errorEvents?: Schema$ErrorEvent[];
    /**
     * If non-empty, more results are available. Pass this token, along with the
     * same query parameters as the first request, to view the next page of
     * results.
     */
    nextPageToken?: string;
    /**
     * The timestamp specifies the start time to which the request was
     * restricted.
     */
    timeRangeBegin?: string;
  }
  /**
   * Contains a set of requested error group stats.
   */
  export interface Schema$ListGroupStatsResponse {
    /**
     * The error group stats which match the given request.
     */
    errorGroupStats?: Schema$ErrorGroupStats[];
    /**
     * If non-empty, more results are available. Pass this token, along with the
     * same query parameters as the first request, to view the next page of
     * results.
     */
    nextPageToken?: string;
    /**
     * The timestamp specifies the start time to which the request was
     * restricted. The start time is set based on the requested time range. It
     * may be adjusted to a later time if a project has exceeded the storage
     * quota and older data has been deleted.
     */
    timeRangeBegin?: string;
  }
  /**
   * An error event which is reported to the Error Reporting system.
   */
  export interface Schema$ReportedErrorEvent {
    /**
     * [Optional] A description of the context in which the error occurred.
     */
    context?: Schema$ErrorContext;
    /**
     * [Optional] Time when the event occurred. If not provided, the time when
     * the event was received by the Error Reporting system will be used.
     */
    eventTime?: string;
    /**
     * [Required] The error message. If no `context.reportLocation` is provided,
     * the message must contain a header (typically consisting of the exception
     * type name and an error message) and an exception stack trace in one of
     * the supported programming languages and formats. Supported languages are
     * Java, Python, JavaScript, Ruby, C#, PHP, and Go. Supported stack trace
     * formats are:  * **Java**: Must be the return value of
     * [`Throwable.printStackTrace()`](https://docs.oracle.com/javase/7/docs/api/java/lang/Throwable.html#printStackTrace%28%29).
     * * **Python**: Must be the return value of
     * [`traceback.format_exc()`](https://docs.python.org/2/library/traceback.html#traceback.format_exc).
     * * **JavaScript**: Must be the value of
     * [`error.stack`](https://github.com/v8/v8/wiki/Stack-Trace-API) as
     * returned by V8. * **Ruby**: Must contain frames returned by
     * [`Exception.backtrace`](https://ruby-doc.org/core-2.2.0/Exception.html#method-i-backtrace).
     * * **C#**: Must be the return value of
     * [`Exception.ToString()`](https://msdn.microsoft.com/en-us/library/system.exception.tostring.aspx).
     * * **PHP**: Must start with `PHP (Notice|Parse error|Fatal error|Warning)`
     * and contain the result of
     * [`(string)$exception`](http://php.net/manual/en/exception.tostring.php).
     * * **Go**: Must be the return value of
     * [`runtime.Stack()`](https://golang.org/pkg/runtime/debug/#Stack).
     */
    message?: string;
    /**
     * [Required] The service context in which this error has occurred.
     */
    serviceContext?: Schema$ServiceContext;
  }
  /**
   * Response for reporting an individual error event. Data may be added to this
   * message in the future.
   */
  export interface Schema$ReportErrorEventResponse {}
  /**
   * Describes a running service that sends errors. Its version changes over
   * time and multiple versions can run in parallel.
   */
  export interface Schema$ServiceContext {
    /**
     * Type of the MonitoredResource. List of possible values:
     * https://cloud.google.com/monitoring/api/resources  Value is set
     * automatically for incoming errors and must not be set when reporting
     * errors.
     */
    resourceType?: string;
    /**
     * An identifier of the service, such as the name of the executable, job, or
     * Google App Engine service name. This field is expected to have a low
     * number of values that are relatively stable over time, as opposed to
     * `version`, which can be changed whenever new code is deployed.  Contains
     * the service name for error reports extracted from Google App Engine logs
     * or `default` if the App Engine default service is used.
     */
    service?: string;
    /**
     * Represents the source code version that the developer provided, which
     * could represent a version label or a Git SHA-1 hash, for example. For App
     * Engine standard environment, the version is set to the version of the
     * app.
     */
    version?: string;
  }
  /**
   * Indicates a location in the source code of the service for which errors are
   * reported. `functionName` must be provided by the application when reporting
   * an error, unless the error report contains a `message` with a supported
   * exception stack trace. All fields are optional for the later case.
   */
  export interface Schema$SourceLocation {
    /**
     * The source code filename, which can include a truncated relative path, or
     * a full path from a production machine.
     */
    filePath?: string;
    /**
     * Human-readable name of a function or method. The value can include
     * optional context like the class or package name. For example,
     * `my.package.MyClass.method` in case of Java.
     */
    functionName?: string;
    /**
     * 1-based. 0 indicates that the line number is unknown.
     */
    lineNumber?: number;
  }
  /**
   * A reference to a particular snapshot of the source tree used to build and
   * deploy an application.
   */
  export interface Schema$SourceReference {
    /**
     * Optional. A URI string identifying the repository. Example:
     * &quot;https://github.com/GoogleCloudPlatform/kubernetes.git&quot;
     */
    repository?: string;
    /**
     * The canonical and persistent identifier of the deployed revision. Example
     * (git): &quot;0035781c50ec7aa23385dc841529ce8a4b70db1b&quot;
     */
    revisionId?: string;
  }
  /**
   * The number of errors in a given time period. All numbers are approximate
   * since the error events are sampled before counting them.
   */
  export interface Schema$TimedCount {
    /**
     * Approximate number of occurrences in the given time period.
     */
    count?: string;
    /**
     * End of the time period to which `count` refers (excluded).
     */
    endTime?: string;
    /**
     * Start of the time period to which `count` refers (included).
     */
    startTime?: string;
  }
  /**
   * Information related to tracking the progress on resolving the error.
   */
  export interface Schema$TrackingIssue {
    /**
     * A URL pointing to a related entry in an issue tracking system. Example:
     * https://github.com/user/project/issues/4
     */
    url?: string;
  }


  export class Resource$Projects {
    root: Clouderrorreporting;
    events: Resource$Projects$Events;
    groups: Resource$Projects$Groups;
    groupStats: Resource$Projects$Groupstats;
    constructor(root: Clouderrorreporting) {
      this.root = root;
      this.getRoot.bind(this);
      this.events = new Resource$Projects$Events(root);
      this.groups = new Resource$Projects$Groups(root);
      this.groupStats = new Resource$Projects$Groupstats(root);
    }

    getRoot() {
      return this.root;
    }


    /**
     * clouderrorreporting.projects.deleteEvents
     * @desc Deletes all error events of a given project.
     * @alias clouderrorreporting.projects.deleteEvents
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.projectName [Required] The resource name of the Google Cloud Platform project. Written as `projects/` plus the [Google Cloud Platform project ID](https://support.google.com/cloud/answer/6158840). Example: `projects/my-project-123`.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    deleteEvents(
        params?: Params$Resource$Projects$Deleteevents,
        options?: MethodOptions): AxiosPromise<Schema$DeleteEventsResponse>;
    deleteEvents(
        params: Params$Resource$Projects$Deleteevents,
        options: MethodOptions|
        BodyResponseCallback<Schema$DeleteEventsResponse>,
        callback: BodyResponseCallback<Schema$DeleteEventsResponse>): void;
    deleteEvents(
        params: Params$Resource$Projects$Deleteevents,
        callback: BodyResponseCallback<Schema$DeleteEventsResponse>): void;
    deleteEvents(callback: BodyResponseCallback<Schema$DeleteEventsResponse>):
        void;
    deleteEvents(
        paramsOrCallback?: Params$Resource$Projects$Deleteevents|
        BodyResponseCallback<Schema$DeleteEventsResponse>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$DeleteEventsResponse>,
        callback?: BodyResponseCallback<Schema$DeleteEventsResponse>):
        void|AxiosPromise<Schema$DeleteEventsResponse> {
      let params =
          (paramsOrCallback || {}) as Params$Resource$Projects$Deleteevents;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Deleteevents;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://clouderrorreporting.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta1/{+projectName}/events')
                       .replace(/([^:]\/)\/+/g, '$1'),
              method: 'DELETE'
            },
            options),
        params,
        requiredParams: ['projectName'],
        pathParams: ['projectName'],
        context: this.getRoot()
      };
      if (callback) {
        createAPIRequest<Schema$DeleteEventsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$DeleteEventsResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Projects$Deleteevents {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * [Required] The resource name of the Google Cloud Platform project.
     * Written as `projects/` plus the [Google Cloud Platform project
     * ID](https://support.google.com/cloud/answer/6158840). Example:
     * `projects/my-project-123`.
     */
    projectName?: string;
  }

  export class Resource$Projects$Events {
    root: Clouderrorreporting;
    constructor(root: Clouderrorreporting) {
      this.root = root;
      this.getRoot.bind(this);
    }

    getRoot() {
      return this.root;
    }


    /**
     * clouderrorreporting.projects.events.list
     * @desc Lists the specified events.
     * @alias clouderrorreporting.projects.events.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.groupId [Required] The group for which events shall be returned.
     * @param {integer=} params.pageSize [Optional] The maximum number of results to return per response.
     * @param {string=} params.pageToken [Optional] A `next_page_token` provided by a previous response.
     * @param {string} params.projectName [Required] The resource name of the Google Cloud Platform project. Written as `projects/` plus the [Google Cloud Platform project ID](https://support.google.com/cloud/answer/6158840). Example: `projects/my-project-123`.
     * @param {string=} params.serviceFilter.resourceType [Optional] The exact value to match against [`ServiceContext.resource_type`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type).
     * @param {string=} params.serviceFilter.service [Optional] The exact value to match against [`ServiceContext.service`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service).
     * @param {string=} params.serviceFilter.version [Optional] The exact value to match against [`ServiceContext.version`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version).
     * @param {string=} params.timeRange.period Restricts the query to the specified time range.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
        params?: Params$Resource$Projects$Events$List,
        options?: MethodOptions): AxiosPromise<Schema$ListEventsResponse>;
    list(
        params: Params$Resource$Projects$Events$List,
        options: MethodOptions|BodyResponseCallback<Schema$ListEventsResponse>,
        callback: BodyResponseCallback<Schema$ListEventsResponse>): void;
    list(
        params: Params$Resource$Projects$Events$List,
        callback: BodyResponseCallback<Schema$ListEventsResponse>): void;
    list(callback: BodyResponseCallback<Schema$ListEventsResponse>): void;
    list(
        paramsOrCallback?: Params$Resource$Projects$Events$List|
        BodyResponseCallback<Schema$ListEventsResponse>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$ListEventsResponse>,
        callback?: BodyResponseCallback<Schema$ListEventsResponse>):
        void|AxiosPromise<Schema$ListEventsResponse> {
      let params =
          (paramsOrCallback || {}) as Params$Resource$Projects$Events$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Events$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://clouderrorreporting.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta1/{+projectName}/events')
                       .replace(/([^:]\/)\/+/g, '$1'),
              method: 'GET'
            },
            options),
        params,
        requiredParams: ['projectName'],
        pathParams: ['projectName'],
        context: this.getRoot()
      };
      if (callback) {
        createAPIRequest<Schema$ListEventsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListEventsResponse>(parameters);
      }
    }


    /**
     * clouderrorreporting.projects.events.report
     * @desc Report an individual error event.  This endpoint accepts
     * <strong>either</strong> an OAuth token, <strong>or</strong> an <a
     * href="https://support.google.com/cloud/answer/6158862">API key</a> for
     * authentication. To use an API key, append it to the URL as the value of a
     * `key` parameter. For example: <pre>POST
     * https://clouderrorreporting.googleapis.com/v1beta1/projects/example-project/events:report?key=123ABC456</pre>
     * @alias clouderrorreporting.projects.events.report
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.projectName [Required] The resource name of the Google Cloud Platform project. Written as `projects/` plus the [Google Cloud Platform project ID](https://support.google.com/cloud/answer/6158840). Example: `projects/my-project-123`.
     * @param {().ReportedErrorEvent} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    report(
        params?: Params$Resource$Projects$Events$Report,
        options?: MethodOptions): AxiosPromise<Schema$ReportErrorEventResponse>;
    report(
        params: Params$Resource$Projects$Events$Report,
        options: MethodOptions|
        BodyResponseCallback<Schema$ReportErrorEventResponse>,
        callback: BodyResponseCallback<Schema$ReportErrorEventResponse>): void;
    report(
        params: Params$Resource$Projects$Events$Report,
        callback: BodyResponseCallback<Schema$ReportErrorEventResponse>): void;
    report(callback: BodyResponseCallback<Schema$ReportErrorEventResponse>):
        void;
    report(
        paramsOrCallback?: Params$Resource$Projects$Events$Report|
        BodyResponseCallback<Schema$ReportErrorEventResponse>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$ReportErrorEventResponse>,
        callback?: BodyResponseCallback<Schema$ReportErrorEventResponse>):
        void|AxiosPromise<Schema$ReportErrorEventResponse> {
      let params =
          (paramsOrCallback || {}) as Params$Resource$Projects$Events$Report;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Events$Report;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://clouderrorreporting.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta1/{+projectName}/events:report')
                       .replace(/([^:]\/)\/+/g, '$1'),
              method: 'POST'
            },
            options),
        params,
        requiredParams: ['projectName'],
        pathParams: ['projectName'],
        context: this.getRoot()
      };
      if (callback) {
        createAPIRequest<Schema$ReportErrorEventResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ReportErrorEventResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Projects$Events$List {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * [Required] The group for which events shall be returned.
     */
    groupId?: string;
    /**
     * [Optional] The maximum number of results to return per response.
     */
    pageSize?: number;
    /**
     * [Optional] A `next_page_token` provided by a previous response.
     */
    pageToken?: string;
    /**
     * [Required] The resource name of the Google Cloud Platform project.
     * Written as `projects/` plus the [Google Cloud Platform project
     * ID](https://support.google.com/cloud/answer/6158840). Example:
     * `projects/my-project-123`.
     */
    projectName?: string;
    /**
     * [Optional] The exact value to match against
     * [`ServiceContext.resource_type`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type).
     */
    'serviceFilter.resourceType'?: string;
    /**
     * [Optional] The exact value to match against
     * [`ServiceContext.service`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service).
     */
    'serviceFilter.service'?: string;
    /**
     * [Optional] The exact value to match against
     * [`ServiceContext.version`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version).
     */
    'serviceFilter.version'?: string;
    /**
     * Restricts the query to the specified time range.
     */
    'timeRange.period'?: string;
  }
  export interface Params$Resource$Projects$Events$Report {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * [Required] The resource name of the Google Cloud Platform project.
     * Written as `projects/` plus the [Google Cloud Platform project
     * ID](https://support.google.com/cloud/answer/6158840). Example:
     * `projects/my-project-123`.
     */
    projectName?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$ReportedErrorEvent;
  }


  export class Resource$Projects$Groups {
    root: Clouderrorreporting;
    constructor(root: Clouderrorreporting) {
      this.root = root;
      this.getRoot.bind(this);
    }

    getRoot() {
      return this.root;
    }


    /**
     * clouderrorreporting.projects.groups.get
     * @desc Get the specified group.
     * @alias clouderrorreporting.projects.groups.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.groupName [Required] The group resource name. Written as <code>projects/<var>projectID</var>/groups/<var>group_name</var></code>. Call <a href="/error-reporting/reference/rest/v1beta1/projects.groupStats/list"> <code>groupStats.list</code></a> to return a list of groups belonging to this project.  Example: <code>projects/my-project-123/groups/my-group</code>
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(params?: Params$Resource$Projects$Groups$Get,
        options?: MethodOptions): AxiosPromise<Schema$ErrorGroup>;
    get(params: Params$Resource$Projects$Groups$Get,
        options: MethodOptions|BodyResponseCallback<Schema$ErrorGroup>,
        callback: BodyResponseCallback<Schema$ErrorGroup>): void;
    get(params: Params$Resource$Projects$Groups$Get,
        callback: BodyResponseCallback<Schema$ErrorGroup>): void;
    get(callback: BodyResponseCallback<Schema$ErrorGroup>): void;
    get(paramsOrCallback?: Params$Resource$Projects$Groups$Get|
        BodyResponseCallback<Schema$ErrorGroup>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$ErrorGroup>,
        callback?: BodyResponseCallback<Schema$ErrorGroup>):
        void|AxiosPromise<Schema$ErrorGroup> {
      let params =
          (paramsOrCallback || {}) as Params$Resource$Projects$Groups$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Groups$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://clouderrorreporting.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta1/{+groupName}')
                       .replace(/([^:]\/)\/+/g, '$1'),
              method: 'GET'
            },
            options),
        params,
        requiredParams: ['groupName'],
        pathParams: ['groupName'],
        context: this.getRoot()
      };
      if (callback) {
        createAPIRequest<Schema$ErrorGroup>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ErrorGroup>(parameters);
      }
    }


    /**
     * clouderrorreporting.projects.groups.update
     * @desc Replace the data for the specified group. Fails if the group does
     * not exist.
     * @alias clouderrorreporting.projects.groups.update
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The group resource name. Example: <code>projects/my-project-123/groups/my-groupid</code>
     * @param {().ErrorGroup} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    update(
        params?: Params$Resource$Projects$Groups$Update,
        options?: MethodOptions): AxiosPromise<Schema$ErrorGroup>;
    update(
        params: Params$Resource$Projects$Groups$Update,
        options: MethodOptions|BodyResponseCallback<Schema$ErrorGroup>,
        callback: BodyResponseCallback<Schema$ErrorGroup>): void;
    update(
        params: Params$Resource$Projects$Groups$Update,
        callback: BodyResponseCallback<Schema$ErrorGroup>): void;
    update(callback: BodyResponseCallback<Schema$ErrorGroup>): void;
    update(
        paramsOrCallback?: Params$Resource$Projects$Groups$Update|
        BodyResponseCallback<Schema$ErrorGroup>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$ErrorGroup>,
        callback?: BodyResponseCallback<Schema$ErrorGroup>):
        void|AxiosPromise<Schema$ErrorGroup> {
      let params =
          (paramsOrCallback || {}) as Params$Resource$Projects$Groups$Update;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Groups$Update;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://clouderrorreporting.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
              method: 'PUT'
            },
            options),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.getRoot()
      };
      if (callback) {
        createAPIRequest<Schema$ErrorGroup>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ErrorGroup>(parameters);
      }
    }
  }

  export interface Params$Resource$Projects$Groups$Get {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * [Required] The group resource name. Written as
     * <code>projects/<var>projectID</var>/groups/<var>group_name</var></code>.
     * Call <a
     * href="/error-reporting/reference/rest/v1beta1/projects.groupStats/list">
     * <code>groupStats.list</code></a> to return a list of groups belonging to
     * this project.  Example:
     * <code>projects/my-project-123/groups/my-group</code>
     */
    groupName?: string;
  }
  export interface Params$Resource$Projects$Groups$Update {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * The group resource name. Example:
     * <code>projects/my-project-123/groups/my-groupid</code>
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$ErrorGroup;
  }


  export class Resource$Projects$Groupstats {
    root: Clouderrorreporting;
    constructor(root: Clouderrorreporting) {
      this.root = root;
      this.getRoot.bind(this);
    }

    getRoot() {
      return this.root;
    }


    /**
     * clouderrorreporting.projects.groupStats.list
     * @desc Lists the specified groups.
     * @alias clouderrorreporting.projects.groupStats.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.alignment [Optional] The alignment of the timed counts to be returned. Default is `ALIGNMENT_EQUAL_AT_END`.
     * @param {string=} params.alignmentTime [Optional] Time where the timed counts shall be aligned if rounded alignment is chosen. Default is 00:00 UTC.
     * @param {string=} params.groupId [Optional] List all <code>ErrorGroupStats</code> with these IDs.
     * @param {string=} params.order [Optional] The sort order in which the results are returned. Default is `COUNT_DESC`.
     * @param {integer=} params.pageSize [Optional] The maximum number of results to return per response. Default is 20.
     * @param {string=} params.pageToken [Optional] A `next_page_token` provided by a previous response. To view additional results, pass this token along with the identical query parameters as the first request.
     * @param {string} params.projectName [Required] The resource name of the Google Cloud Platform project. Written as <code>projects/</code> plus the <a href="https://support.google.com/cloud/answer/6158840">Google Cloud Platform project ID</a>.  Example: <code>projects/my-project-123</code>.
     * @param {string=} params.serviceFilter.resourceType [Optional] The exact value to match against [`ServiceContext.resource_type`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type).
     * @param {string=} params.serviceFilter.service [Optional] The exact value to match against [`ServiceContext.service`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service).
     * @param {string=} params.serviceFilter.version [Optional] The exact value to match against [`ServiceContext.version`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version).
     * @param {string=} params.timedCountDuration [Optional] The preferred duration for a single returned `TimedCount`. If not set, no timed counts are returned.
     * @param {string=} params.timeRange.period Restricts the query to the specified time range.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
        params?: Params$Resource$Projects$Groupstats$List,
        options?: MethodOptions): AxiosPromise<Schema$ListGroupStatsResponse>;
    list(
        params: Params$Resource$Projects$Groupstats$List,
        options: MethodOptions|
        BodyResponseCallback<Schema$ListGroupStatsResponse>,
        callback: BodyResponseCallback<Schema$ListGroupStatsResponse>): void;
    list(
        params: Params$Resource$Projects$Groupstats$List,
        callback: BodyResponseCallback<Schema$ListGroupStatsResponse>): void;
    list(callback: BodyResponseCallback<Schema$ListGroupStatsResponse>): void;
    list(
        paramsOrCallback?: Params$Resource$Projects$Groupstats$List|
        BodyResponseCallback<Schema$ListGroupStatsResponse>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$ListGroupStatsResponse>,
        callback?: BodyResponseCallback<Schema$ListGroupStatsResponse>):
        void|AxiosPromise<Schema$ListGroupStatsResponse> {
      let params =
          (paramsOrCallback || {}) as Params$Resource$Projects$Groupstats$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Groupstats$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://clouderrorreporting.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta1/{+projectName}/groupStats')
                       .replace(/([^:]\/)\/+/g, '$1'),
              method: 'GET'
            },
            options),
        params,
        requiredParams: ['projectName'],
        pathParams: ['projectName'],
        context: this.getRoot()
      };
      if (callback) {
        createAPIRequest<Schema$ListGroupStatsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListGroupStatsResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Projects$Groupstats$List {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * [Optional] The alignment of the timed counts to be returned. Default is
     * `ALIGNMENT_EQUAL_AT_END`.
     */
    alignment?: string;
    /**
     * [Optional] Time where the timed counts shall be aligned if rounded
     * alignment is chosen. Default is 00:00 UTC.
     */
    alignmentTime?: string;
    /**
     * [Optional] List all <code>ErrorGroupStats</code> with these IDs.
     */
    groupId?: string;
    /**
     * [Optional] The sort order in which the results are returned. Default is
     * `COUNT_DESC`.
     */
    order?: string;
    /**
     * [Optional] The maximum number of results to return per response. Default
     * is 20.
     */
    pageSize?: number;
    /**
     * [Optional] A `next_page_token` provided by a previous response. To view
     * additional results, pass this token along with the identical query
     * parameters as the first request.
     */
    pageToken?: string;
    /**
     * [Required] The resource name of the Google Cloud Platform project.
     * Written as <code>projects/</code> plus the <a
     * href="https://support.google.com/cloud/answer/6158840">Google Cloud
     * Platform project ID</a>.  Example: <code>projects/my-project-123</code>.
     */
    projectName?: string;
    /**
     * [Optional] The exact value to match against
     * [`ServiceContext.resource_type`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type).
     */
    'serviceFilter.resourceType'?: string;
    /**
     * [Optional] The exact value to match against
     * [`ServiceContext.service`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service).
     */
    'serviceFilter.service'?: string;
    /**
     * [Optional] The exact value to match against
     * [`ServiceContext.version`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version).
     */
    'serviceFilter.version'?: string;
    /**
     * [Optional] The preferred duration for a single returned `TimedCount`. If
     * not set, no timed counts are returned.
     */
    timedCountDuration?: string;
    /**
     * Restricts the query to the specified time range.
     */
    'timeRange.period'?: string;
  }
}
