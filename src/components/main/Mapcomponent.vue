<template>
  <div class="map-container">
    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" width="100%" height="100%">
        <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
    </KakaoMap>
  </div>
</template>

<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
const coordinate = {
  lat: 33.450701,
  lng: 126.570667
};

</script>

<style scoped>
.map-container {
    width: 100%;
    height: 100%;
}
</style>