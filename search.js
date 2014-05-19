var AmbientSearch = new (function() {
/* Sample
	// AmbientSearch.SetRoute('devdivcn'); // optional hints for routing
	WScript.Echo(AmbientSearch.GetEndpointUri());
	var arrIndices = JsonDeserialize(AmbientSearch.GetIndices());
	for(var i = 0; i < arrIndices.length; i++) {
		var strIndexName = arrIndices[i];
		var arrTypes = JsonDeserialize(AmbientSearch.GetTypes(strIndexName));
		for(var j = 0; j < arrTypes.length; j++) {
			WScript.Echo(strIndexName, arrTypes[j]);
		}
	}

	var objResult = AmbientSearch.Search('indexes', 'article');
	var objResult = AmbientSearch.Search('indexes', 'article', '{"IsAnd": true, "Conditions": [{"metadata": "revision", "operator": "ne", "value": 0}]}');
	var objResult = AmbientSearch.Search('indexes', 'article', null, 'test', 5, 10);
*/

	var _ = this;

	var Curl = function(method, url, options, callback){
		var xmlHttpReq = new ActiveXObject('Microsoft.XMLHTTP');
		options=options || {};
		if (callback) {
			xmlHttpReq.onreadystatechange = function() {
				callback.apply(this);
				if (this.readyState === 4) {
					this.onreadystatechange = null;
				}
			};
		}
		xmlHttpReq.open(method, url, Boolean(callback));
		if (options.headers) {
			for (var name in options.headers) {
				xmlHttpReq.setRequestHeader(name, options.headers[name]);
			}
		}
		xmlHttpReq.send(options.content);
		return xmlHttpReq;
	};

	var JsonDeserialize = function(strContent) {
		return (new Function('return (' + strContent + ')'))();
	};

	var m_nRefreshInteralMilliseconds = null;
	var m_objLastRefreshedTime = new Date();
	var m_strEndpointUri = null;
	var m_strRoute = '_default';

	_.SetRoute = function(strRoute) {
		m_strRoute = strRoute;
	};

	_.GetEndpointUri = function() {
		if (m_strEndpointUri) {
			if (!m_nRefreshInteralMilliseconds) {
				return m_strEndpointUri;
			}
			if (new Date() - m_objLastRefreshedTime < m_nRefreshInteralMilliseconds) {
				return m_strEndpointUri;
			}
		}
		var strThumbprint = 'AmbientConfiguration' + String(Math.random()).replace('.', '');
		var objResponse = Curl('GET', 'http://ambientconfiguration.blob.core.windows.net/client/AmbientSearch.json' + '?' + strThumbprint);
		if (objResponse.status !== 200) {
			if (m_strEndpointUri) {
				return m_strEndpointUri;
			}
			throw 'AmbientSearch failed to load configuration from ' + strUri;
		}
		var strConfiguration = objResponse.responseText;
		var objConfiguration = JsonDeserialize(strConfiguration);
		var bPreferHttps = objConfiguration.prefer_https;
		var strServiceEndpoint = objConfiguration.route_map[m_strRoute] || objConfiguration.route_map._default;
		m_nRefreshInteralMilliseconds = objConfiguration.refresh_interval_milliseconds;
		m_objLastRefreshedTime = new Date();
		m_strEndpointUri = (bPreferHttps ? 'https://' : 'http://') + strServiceEndpoint;
		return m_strEndpointUri;
	};

	_.GetIndices = function (callback) {
		var strUri = _.GetEndpointUri();
		var objResponse = Curl('GET', strUri, {headers: {Authorization: 'Basic YWRtaW5pc3RyYXRvcjojQnVnc2ZvciQ='}}, callback);
		if (callback) {
			return objResponse;
		}
		if (objResponse.status !== 200) {
			throw 'AmbientSearch failed, HTTP GET ' + strUri + ' returned ' + objResponse.status;
		}
		return objResponse.responseText;
	};

	_.GetTypes = function (strIndexName, callback) {
		var strUri = _.GetEndpointUri() + '/' + strIndexName;
		var objResponse = Curl('GET', strUri, {headers: {Authorization: 'Basic YWRtaW5pc3RyYXRvcjojQnVnc2ZvciQ='}}, callback);
		if (callback) {
			return objResponse;
		}
		if (objResponse.status !== 200) {
			throw 'AmbientSearch failed, HTTP GET ' + strUri + ' returned ' + objResponse.status;
		}
		return objResponse.responseText;
	};

	_.Search = function (strIndexName, strTypeName, strConditionGroup, strFullText, nTop, nSkip, callback) {
		var strUri = _.GetEndpointUri() + '/' + strIndexName + '/' + strTypeName + '/search';
		var objOptions = {headers: {Authorization: 'Basic YWRtaW5pc3RyYXRvcjojQnVnc2ZvciQ='}};
		if (strConditionGroup) {
			objOptions.content = strConditionGroup;
		}
		var arrQueryParam = [];
		if (strFullText) {
			arrQueryParam.push('text=' + encodeURIComponent(strFullText));
		}
		if (nTop) {
			arrQueryParam.push('$top=' + nTop);
		}
		if (nSkip) {
			arrQueryParam.push('$skip=' + nSkip);
		}
		if (arrQueryParam.length) {
			strUri += '?' + arrQueryParam.join('&');
		}
		var objResponse = Curl('GET', strUri, objOptions, callback);
		if (callback) {
			return objResponse;
		}
		if (objResponse.status !== 200) {
			throw 'AmbientSearch failed, HTTP GET ' + strUri + ' returned ' + objResponse.status;
		}
		return objResponse.responseText;
	};
});
