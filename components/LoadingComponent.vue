<template>
  <div class="cssload-loader-wrapper">
    <div class="cssload-loader">
      <div class="cssload-inner cssload-one"></div>
      <div class="cssload-inner cssload-two"></div>
      <div class="cssload-inner cssload-three"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
}
</script>

<style scoped lang="scss">
.cssload-loader-wrapper {
  text-align: center;
}
.cssload-loader {
  position: relative;
  left: calc(50% - 31px);
  width: 100px;
  height: 100px;
  margin: 130px 0;
  perspective: 780px;
}

.cssload-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border-radius: 50%;
  -o-border-radius: 50%;
  -ms-border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  &.cssload-one {
    left: 0%;
    top: 0%;
    animation: cssload-rotate-one 1.15s linear infinite;
    -o-animation: cssload-rotate-one 1.15s linear infinite;
    -ms-animation: cssload-rotate-one 1.15s linear infinite;
    -webkit-animation: cssload-rotate-one 1.15s linear infinite;
    -moz-animation: cssload-rotate-one 1.15s linear infinite;
    border-bottom: 3px solid #5c5edc;
  }
  &.cssload-two {
    right: 0%;
    top: 0%;
    animation: cssload-rotate-two 1.15s linear infinite;
    -o-animation: cssload-rotate-two 1.15s linear infinite;
    -ms-animation: cssload-rotate-two 1.15s linear infinite;
    -webkit-animation: cssload-rotate-two 1.15s linear infinite;
    -moz-animation: cssload-rotate-two 1.15s linear infinite;
    border-right: 3px solid #bee3f8;
  }
  &.cssload-three {
    right: 0%;
    bottom: 0%;
    animation: cssload-rotate-three 1.15s linear infinite;
    border-top: 3px solid #4299e1;
  }
}
@keyframes cssload-rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@-o-keyframes cssload-rotate-one {
  0% {
    -o-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    -o-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@-ms-keyframes cssload-rotate-one {
  0% {
    -ms-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    -ms-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@-webkit-keyframes cssload-rotate-one {
  0% {
    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@-moz-keyframes cssload-rotate-one {
  0% {
    -moz-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    -moz-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes cssload-rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes cssload-rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
