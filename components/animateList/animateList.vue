<template>
    <div id="animateList">
        <div id="box" class="cny-rate-list">
            <div id="con1" ref="con1" :class="{anim:animate==true}" @mouseenter="mEnter" @mouseleave="mLeave">
                <view class="cny-rate-row flex" v-for="(item,index) in List" :key="'cny-rate-item-' + index">
                    <view class="cny-rate-item">100</view>
                    <view class="cny-rate-item">{{ item.from || '' }}</view>
                    <view class="cny-rate-item">{{ item.p || "" }}</view>
                    <view class="cny-rate-item">{{ item.to || "" }}</view>
                </view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "animateList",
        props:{
            List: {
                type: Array,
                default: []
            },
        },
        data() {
            return {
                animate: false,
            }
        },
        mounted() {
            this.timer= setInterval(this.scroll,1000)
        },
        methods: {
            scroll() {
                let that = this;
                that.$refs.con1.style.marginTop = '-35px';
                that.animate = !that.animate;
                setTimeout(function () {
                    that.List.push(that.List[0]);
                    that.List.shift();
                    that.$refs.con1.style.marginTop = '0px';
                    that.animate = !that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                }, 500)
            },
            mEnter() {
                clearInterval(this.timer)
            },
            mLeave() {
                this.timer = setInterval(this.scroll, 3000)
            },
        },
        beforeDestroy() {
            if (this.timer) {clearInterval(this.timer);}
        },
    }
</script>

<style lang="scss" scoped>
    #box{
        overflow: hidden;
        transition: all 0.5s;
    }

    .cny-rate-list{
        padding: 0 25rpx 25rpx;
        height: 400rpx;
        box-sizing: border-box;
        .cny-rate-row{
            .cny-rate-item{
                width: 25%;
                height: 35px;
                text-align: center;
                color: rgba(0,0,0,.8);
            }
        }
    }

    .anim{
        transition: all 0.5s;
    }

</style>