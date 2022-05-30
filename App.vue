<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss" >
	@font-face {
		font-family: 'ORANG3R-Light';
		src: url('./static/font/ORANG3R-Light.otf');
	}
	@font-face {
		font-family: 'ORANG3R-Middle';
		src: url('./static/font/ORANG3R-Middle.otf');
	}
	@font-face {
		font-family: 'ORANG3R-Regular';
		src: url('./static/font/ORANG3R-Regular.otf');
	}
	.fontLight,.fontMiddle,.fontRegular{
		margin-top: 0.2em;
	}
	.fontLight{
		font-family: 'ORANG3R-Light';
	}
	.fontMiddle{
		font-family: 'ORANG3R-Middle';
	}
	.fontRegular{
		font-family: 'ORANG3R-Regular';
	}
	view,text{
		box-sizing: border-box;
	}
	.page{
		min-height: 100vh;
		background: #f4f5f6;
		line-height: 1;
	}
	.textUp{
		color: #FE5269;
	}
	.textDown{
		color: #02BD85;
	}
	.textFlat{
		color: #8694AA;
	}
	.u-popup{
		position: absolute;
	}
	.page{
		overflow: hidden;
		padding-bottom: env(safe-area-inset-bottom); 
	}
	.tabPage{
		padding-bottom: calc(98rpx + env(safe-area-inset-bottom)); 
	}
</style>
