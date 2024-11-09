<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
.loader {
  position: fixed;
  top: 117px;
  left: 0;
  width: 100%;
  height: calc(100% - 117px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $background;
  z-index: 9999;
	@include adaptive(1024) {
		top: 76px;
		height: calc(100% - 76px);
	}
	@include adaptive(600) {
		top: 82px;
		height: calc(100% - 82px);
	}
}
.loader::before {
  content: "";
  display: block;
  width: 50px;
  height: 50px;
  border: 5px solid $primary;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
