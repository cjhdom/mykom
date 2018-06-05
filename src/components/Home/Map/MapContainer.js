import React, {Component} from 'react';
import {isEqual} from 'lodash';
import {fetchHeader, defaultPosition} from "../../../data/consts";
import {customCityList, customDoList, getDiameter, getDistanceFromLatLonInKm} from "../../../data/custom"
import $ from 'jquery'
import AddressContainer from "../Address/AddressContainer";
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";

const parseOptions = options => {
    return Object.keys(options).map(_ => ({
        key: _,
        value: options[_]
    })).filter(_ => _.value)
}


class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.map = null
        this.clusterer = null

        this.initMapDoLevel = 10;
        this.initMapCityLevel = 9;
        this.initMapSearchLevel = 6;

        this.handleSelect = this.handleSelect.bind(this)
        this.getCurrentLocation = this.getCurrentLocation.bind(this)
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.isShowClusterList !== this.props.isShowClusterList) {
            this.setHeight()
        }
        if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng ||
            !isEqual(prevProps.options, this.props.options) || !isEqual(prevProps.priceRange, this.props.priceRange)) {
            await this.doSearch(this.props.lat, this.props.lng)
        }
    }

    componentDidMount() {
        const {longitude, latitude} = defaultPosition

        const latLng = new daum.maps.LatLng(latitude, longitude)

        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: latLng, //지도의 중심좌표.
            level: this.initMapDoLevel //지도의 레벨(확대, 축소 정도)
        };
        if (latLng && latLng.ib !== 0) {
            options.center = latLng;
        }

        this.map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
        this.map.panTo(options.center);

        daum.maps.event.addListener(this.map, 'dragend', () => {
            var position = this.map.getCenter();
            if (this.map.getLevel() < this.initMapCityLevel - 1) {
                this.doSearch(position.getLat(), position.getLng(), null);
            }
            this.doToggleClusterList(false)
        });

        daum.maps.event.addListener(this.map, 'zoom_changed', () => {
            // if($scope.vars.isPendingSearch) return;
            // if(Consts.MODE === 'APP') cordova.plugins.Keyboard.close();

            const currentLevel = this.map.getLevel();
            setTimeout(() => {
                this.clearCluster(true);
                if (currentLevel < this.initMapCityLevel - 1) {
                    this.clearCityGroup();
                    this.doSearch();
                } else if (currentLevel > this.initMapCityLevel - 1) {
                    this.clearCityGroup();
                    this.showDoGroup();
                } else if (currentLevel === this.initMapCityLevel - 1
                    || currentLevel === this.initMapCityLevel) {
                    this.clearDoGroup();
                    this.showCityGroup();
                }
            });
        });

        daum.maps.event.addListener(this.map, 'click', (mouseEvent) => {
            this.props.setParentState({
                isShowClusterList: false
            })
        });

        window.doClickCityOverlay = (index) => {
            this.map.setLevel(this.initMapCityLevel - 3);
            this.map.setCenter(customCityList[index].position);
            this.map.panTo(customCityList[index].position);
            this.props.setParentState({
                isShowClusterList: false
            });
        }

        window.doClickDoOverlay = (index) => {
            this.map.setLevel(this.initMapCityLevel);
            this.map.setCenter(customDoList[index].position);
            this.map.panTo(customDoList[index].position);
        }

        this.showDoGroup()
        this.setHeight()
    }

    clearCityGroup() {
        customCityList.forEach(function (customOverlay) {
            customOverlay.setMap(null);
        });
    }

    showCityGroup() {
        customCityList.forEach((customOverlay) => {
            customOverlay.setMap(this.map);
        });
    }

    clearDoGroup() {
        customDoList.forEach(function (customOverlay) {
            customOverlay.setMap(null);
        });
    }

    showDoGroup() {
        customDoList.forEach((customOverlay) => {
            customOverlay.setMap(this.map);
        });
    }

    createOrUpdateCluster() {
        if (!this.clusterer) {
            this.clusterer = new daum.maps.MarkerClusterer({
                map: this.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
                averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
//         minLevel: $rootScope.static.currentLevel, // 클러스터 할 최소 지도 레벨
                minLevel: 3, // 클러스터 할 최소 지도 레벨
                disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다 ,

                calculator: [2], // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
                //texts: getTexts, // texts는 ['삐약', '꼬꼬', '꼬끼오', '치멘'] 이렇게 배열로도 설정할 수 있다
                styles: [
                    { // calculator 각 사이 값 마다 적용될 스타일을 지정한다
                        width: '40px', height: '40px',
                        background: 'rgba(253,161,113,0.8)',
                        borderRadius: '25px',
                        borderStyle: 'solid',
                        borderColor: 'rgba(253,161,113,1.0)',
                        borderWidth: '2px',
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        lineHeight: '36px',
                    }
                ]

            });
        } else {
            this.clusterer.removeMarkers(this.markers);
        }
        var imageSrc = '/img/marker.png'; // 마커이미지의 주소입니다
        var imageSize = new daum.maps.Size(40, 40), // 마커이미지의 크기입니다
            imageOption = {offset: new daum.maps.Point(0, 0)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);

        var points = [];

        this.markers = [];
        this.props.itemList.forEach((data) => {
            var position = new daum.maps.LatLng(data.location[1], data.location[0]);
            var marker = new daum.maps.Marker({
                map: this.map,
                position: position,
                clickable: true,
                image: markerImage
            });
            points.push(position);
            marker.kosiwon = data;

            daum.maps.event.addListener(marker, 'click', () => {
                this.doClickMarker(marker);
            });

            this.markers.push(marker);
        });

        this.clusterer.addMarkers(this.markers);
        daum.maps.event.addListener(this.clusterer, 'clusterclick', (cluster) => {
            setTimeout(async () => {
                await this.doClickCluster(cluster, true);
            }, 200);
        });
    }

    doToggleClusterList(isShowClusterList) {
        this.props.setParentState({
            isShowClusterList
        })

        this.setHeight()
    }

    doToggleClusterListAsync(isShowClusterList) {
        return new Promise(resolve => {
            return resolve(this.doToggleClusterList(isShowClusterList))
        })
    }

    async doClickCluster(cluster, isRefresh) {
        await this.doToggleClusterListAsync(true)
        if (cluster) {
            this.currentCluster = cluster;
        }

        // $scope.vars.isClickCluster = true;

        var markers = this.currentCluster.getMarkers();
        if (!markers) return;

        this.idArrayList = [];
        markers.forEach((marker) => {
            this.idArrayList.push(marker.kosiwon._id);
        });

        try {
            const fetchResult = await fetch('http://www.kosirock.co.kr/api/kosiwons/listByIdList', {
                method: 'POST',
                headers: fetchHeader,
                body: JSON.stringify({
                    projectOption: {
                        kosiwonName: 1,
                        priceMin: 1,
                        priceMax: 1,
                        intro: 1,
                        isParking: 1,
                        isMeal: 1,
                        isSeparate: 1,
                        isRestRoom: 1,
                        thumbnailUri: 1,
                        location: 1
                    },
                    idArrayList: this.idArrayList,
                    sortOption: {priority: -1, thumbnailUri: -1}
                })
            })

            this.clusterList = []

            if (fetchResult.ok) {
                const result = await fetchResult.json()
                this.clusterList = result.items
                this.updateResultList()
            }
        } catch (e) {
        }

        var level = this.map.getLevel();
        this.map.setLevel(level, {anchor: this.currentCluster.getCenter()});
        this.map.panTo(new daum.maps.LatLng(this.currentCluster.getCenter().jb, this.currentCluster.getCenter().ib));
        //showClusterList(true);
    }

    updateResultList() {
        return this.props.setParentStateAsync({
            clusterList: this.clusterList
        })
    }

    setHeight() {
        if (!this.props.isShowClusterList) {
            $('#map').attr('style', 'width: 100%; height: ' + (window.innerHeight - 53 - 52) + 'px;');
        } else {
            $('#map').attr('style', 'width: 100%; height: ' + (window.innerHeight - 53 - 52 - 240) + 'px;');
        }
        this.map && this.map.relayout()
    }

    async doClickMarker(marker) {
        await this.doToggleClusterListAsync(true)

        this.idArrayList = [];
        this.idArrayList.push(marker.kosiwon._id);

        try {
            const fetchResult = await fetch('http://www.kosirock.co.kr/api/kosiwons/listByIdList', {
                method: 'POST',
                headers: fetchHeader,
                body: JSON.stringify({
                    projectOption: {
                        kosiwonName: 1,
                        priceMin: 1,
                        priceMax: 1,
                        intro: 1,
                        isParking: 1,
                        isMeal: 1,
                        isSeparate: 1,
                        isRestRoom: 1,
                        thumbnailUri: 1,
                        location: 1
                    },
                    idArrayList: this.idArrayList,
                    sortOption: {priority: -1, thumbnailUri: -1},
                })
            })

            this.clusterList = null;

            if (fetchResult.ok) {
                const result = await fetchResult.json()
                this.clusterList = [];
                this.clusterList.push(result.items[0]);

                this.updateResultList()
            }
        } catch (e) {

        }
    }

    clearCluster() {
        if (!this.clusterer) return;

        daum.maps.event.removeListener(this.clusterer, 'clusterclick', (cluster) => {
            setTimeout(() => {
                this.doClickCluster(cluster, true);
            }, 200);
        });
        this.clusterer.removeMarkers(this.markers);
        this.map.relayout();
    }

    doSetCurrentPosition() {
        /*this.map.setLevel(this.initMapSearchLevel);
        var moveLatLon;
        if($rootScope.vars.isPositionInitialized) {
            moveLatLon = new daum.maps.LatLng($rootScope.position.coords.latitude, $rootScope.position.coords.longitude);
            $scope.map.panTo(moveLatLon);
            $scope.doSearch();
        } else {
            navigator.geolocation.getCurrentPosition(function onSuccess(position){
                $rootScope.vars.isPositionInitialized = true;
                $rootScope.position.coords.latitude   = position.coords.latitude;
                $rootScope.position.coords.longitude  = position.coords.longitude;
                moveLatLon = new daum.maps.LatLng($rootScope.position.coords.latitude, $rootScope.position.coords.longitude);
                $scope.map.panTo(moveLatLon);
                $scope.doSearch();
            }, function onError(error){
                $rootScope.error('code: ' + error.code + ', message: ' + error.message);
            }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
        }*/
    }

    async doSearch(lat, lng) {
        const {priceRange, options, isShowClusterList} = this.props
        // const {match} = this.props
        // const {longitude, latitude} = match.params
        let latlng;
        let latitude = lat
        let longitude = lng

        if (lat && lng && lat !== 0 && lng !== 0) {
            latlng = new daum.maps.LatLng(lat, lng);
            this.map.panTo(latlng);
        } else {
            if (!latlng || latlng.ib === 0) {
                latlng = this.map.getCenter()
            }
        }

        if (!lat && lat !== 0) latitude = latlng.getLat();
        if (!lng && lng !== 0) longitude = latlng.getLng();

        if (lat > 40 || lat < 30) latitude = 0;
        if (lng > 200 || lng < 100) longitude = 0;

        const bounds = this.map.getBounds();
        const swLatLng = bounds.getSouthWest();
        const neLatLng = bounds.getNorthEast();

        const diagonal = getDistanceFromLatLonInKm(swLatLng.jb, swLatLng.ib, neLatLng.jb, neLatLng.ib);
        let maxDistance = Math.floor(getDiameter(diagonal, isShowClusterList, window.innerHeight, window.innerWidth) / 2.5); // 범위 조절

        const optionsParsed = parseOptions(options)

        let priceRangeParsed = []

        if (priceRange.priceMin !== '') {
            priceRangeParsed.push({
                operator: '$lte',
                type: 'number',
                key: 'priceMin',
                value: priceRange.priceMin
            })
        }

        if (priceRange.priceMax !== '') {
            priceRangeParsed.push({
                operator: '$gte',
                type: 'number',
                key: 'priceMax',
                value: priceRange.priceMax
            })
        }

        const body = {
            andOption: [
                {key: 'isPublic', value: true},
                ...optionsParsed,
                ...priceRangeParsed
            ],
            populateOption: false,
            projectOption: {
                kosiwonAddress: 1,
                kosiwonName: 1,
                location: 1
            },
            orOption: [],
            longitude,
            latitude,
            maxDistance: maxDistance,
            minDistance: 0,
            sortOption: {
                priority: -1
            },
            pageNo: 1,
            pageSize: 10000
        }

        try {
            const searchFetch = await fetch(`http://www.kosirock.co.kr/api/kosiwons/listBySearchOptionNear`, {
                method: 'POST',
                headers: fetchHeader,
                body: JSON.stringify(body)
            })

            const result = await searchFetch.json()
            await this.props.setParentStateAsync({
                itemList: result.items
            })

            this.map.setLevel(this.initMapSearchLevel)

            if (result.totalItems < 1) {
                this.clearCluster()
            } else {
                this.createOrUpdateCluster()
            }
        } catch (e) {
            this.map.relayout()
        }
    }

    async setStateAsync(newState) {
        return new Promise(resolve => (
            resolve(this.setState({
                ...this.state,
                ...newState
            }))
        ))
    }

    handleSelect() {
        const {setParentState, address} = this.props
        if (!address) {
            setParentState({
                lat: 37.55375859999999,
                lng: 126.98096959999998
            })
        } else {
            geocodeByAddress(address)
                .then(results => getLatLng(results[0]))
                .then(latLng => setParentState({
                    lat: latLng.lat,
                    lng: latLng.lng
                }))
        }
    }

    getCurrentLocation () {
        const geolocation = window.navigator && window.navigator.geolocation
        if (geolocation) {
            geolocation.getCurrentPosition(async position => {
                const {latitude, longitude} = position.coords
                await this.doSearch(latitude, longitude)
            }, error => {
                console.log(error)
            })
        }
    }

    render() {
        const {setParentState, address} = this.props
        return (
            <div className="map_canvas"
                 style={{top: '53px', overflow: 'hidden', height: window.innerHeight - 53 - 52}}>

                <div id="map" align="absmiddle"
                     style={{width: '100%', height: window.innerHeight - 53 - 52, overflow: 'hidden'}}/>

                <div className="place_btn" onClick={this.getCurrentLocation}>
                    <img src="img/place.png" align="absmiddle" width="18px" height="18px" style={{marginTop: '-5px'}}/>
                </div>

                <div className="place_search">
                    <img src="img/magnify.png" onClick={this.handleSelect} align="absmiddle" width="16px" height="15px"
                         style={{position: 'absolute', top: '8px', left: '10px'}}/>
                    <AddressContainer setParentState={setParentState}
                                      address={address}
                                      handleSelect={this.handleSelect}/>
                </div>
            </div>
        )
    }
}

MapContainer.propTypes = {};

export default MapContainer;
